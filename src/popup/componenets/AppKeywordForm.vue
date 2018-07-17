<template lang="pug">
    el-form(:model='ruleForm', :rules='rules', ref='ruleForm', label-width='50px' size="small" label-position='left')
        //입력
        el-form-item(label='URI', prop='uri')
            el-input(@keyup.native.enter="onSubmit()" v-model='ruleForm.uri' placeholder="ex) https://youtube.com" :disabled="conflicted" ref="uri" clearable)
        el-form-item(label='라벨', prop='label')
            el-input(v-model='ruleForm.label' placeholder="ex) 유투부" ref="label" :disabled="conflicted" clearable)
        el-form-item(label='한글', prop='keywordKor')
            el-input(@keyup.native.enter="onSubmit()" v-model='ruleForm.keywordKor' :placeholder="ruleForm.keywordKorPlaceholder" ref="keywordKor" :disabled="conflicted" clearable)
        el-form-item(label='영어', prop='keywordEng')
            el-input(@keyup.native.enter="onSubmit()" v-model='ruleForm.keywordEng' :placeholder="ruleForm.keywordEngPlaceholder" ref="keywordEng" :disabled="conflicted" clearable)

        //버튼
        el-form-item
            template(v-if="!conflicted")
                el-button(@click="onSubmit()" type='primary' ) 추가
                el-button(@click="onReset()" ) 지우기
            template(v-else)
                el-button(@click="onReplaceCancel()" ) 취소
                el-tooltip(content='새로운 키워드로 대체합니다.', placement='bottom', effect='light')
                    el-button(@click="onReplace()" type='warning' ) 대체

        //체크
        el-form-item
            el-tooltip(content="영어와 함께 저장하면 한/영키 전환 귀차니즘을 덜 수 있습니다!" effect="light" placement="bottom")
                el-checkbox(@change.native="onToggleCheck()" v-model='withKeywordEng' :disabled="conflicted") 영어도 함께
</template>

<script>
  import ContractionUtil from '../util/ContractionUtil'

  export default {
    label: 'AppKeywordForm',
    watch: {
      'ruleForm.label' (label) {
        let keyword = ContractionUtil.toHangul(label)
        this.ruleForm.keywordKor = keyword
        this.ruleForm.keywordKorPlaceholder = keyword
      },
      'ruleForm.keywordKor' (keywordKor) {
        let keyword = ContractionUtil.toEnglish(keywordKor)
        this.ruleForm.keywordEng = this.withKeywordEng ? keyword : ''
        this.ruleForm.keywordEngPlaceholder = keyword
      }
    },
    data () {
      return {
        conflicted: false,
        withKeywordEng: false,
        ruleForm: {
          keywordKor: '',
          keywordKorPlaceholder: '',
          keywordEng: '',
          keywordEngPlaceholder: '',
          label: '',
          uri: ''
        },
        rules: ContractionUtil.rules
      }
    },
    methods: {
      onSubmit () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            try {
              this.contractionService.make({
                keyword: this.ruleForm.keywordKor,
                label: this.ruleForm.label,
                uri: this.ruleForm.uri
              })
              if (this.withKeywordEng) {
                this.contractionService.make({
                  keyword: this.ruleForm.keywordEng,
                  label: this.ruleForm.label,
                  uri: this.ruleForm.uri
                })
              }
              this.success('등록 완료')
              this.onReset()
            } catch (e) {
              if (e.code && e.code === 'e-CapacityExceeded') {
                this.errorm(e.message)
              } else if (e.code && e.code === 'e-KeywordAlreadyExists') {
                this.warn(e.message)
                this.$_toggleConflicted()
              } else {
                this.errorm(e.message)
              }
            }
          } else {
            return false
          }
        })
      },
      onReplace () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            try {
              this.contractionService.modify({
                keyword: this.ruleForm.keywordKor,
                label: this.ruleForm.label,
                uri: this.ruleForm.uri
              })
              if (this.withKeywordEng) {
                this.contractionService.modify({
                  keyword: this.ruleForm.keywordEng,
                  label: this.ruleForm.label,
                  uri: this.ruleForm.uri
                })
              }
              this.success('수정 완료')
              this.onReset()
            } catch (e) {
              if (e.code && e.code === 'e-CapacityExceeded') {
                this.errorm(e.message)
              } else if (e.code && e.code === 'e-KeywordAlreadyExists') {
                this.warn(e.message)
                this.$_toggleConflicted()
              } else {
                this.errorm(e.message)
              }
            } finally {
              this.$_toggleConflicted()
            }
          } else {
            return false
          }
        })
      },
      onReset () {
        this.$refs.ruleForm.resetFields()
        this.$_focusLabel()
        this.$_loadUri()
      },
      onReplaceCancel () {
        this.$_toggleConflicted()
        this.$_focusLabel()
      },
      onToggleCheck () {
        if (this.withKeywordEng) {
          let keyword = ContractionUtil.toEnglish(this.ruleForm.keywordKor)
          this.ruleForm.keywordEng = keyword
        } else {
          let keyword = ContractionUtil.toEnglish(this.ruleForm.keywordKor)
          this.ruleForm.keywordEng = ''
          this.ruleForm.keywordEngPlaceholder = keyword
        }
        this.configStore.save(this.withKeywordEng)
      },
      $_toggleConflicted () {
        this.conflicted = !this.conflicted
      },
      $_focusLabel () {
        this.$refs.label.focus()
      },
      $_loadUri () {
        chrome.tabs.getSelected(null, ({url}) => {
          this.ruleForm.uri = url
        })
      }
    },
    mounted () {
      this.$_focusLabel()
      this.$_loadUri()
    },
    created () {
      let {withKeywordEng} = this.configStore.get()
      this.withKeywordEng = withKeywordEng
    }
  }
</script>
