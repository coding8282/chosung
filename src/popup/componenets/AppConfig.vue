<template lang="pug">
    div
        el-row
            el-tooltip(content="다른 기기와 저장된 초성 목록을 동기화합니다." placement="right" effect="light")
                el-button.btn(@click="onSync()" icon="el-icon-refresh" size="small" plain) 동기화

        el-row.spacer
            el-button.btn(@click="onInit()" type="danger" icon="el-icon-delete" size="small" :disabled="!checked") 초기화
            el-tooltip(content="현재 저장된 초성을 모두 삭제하고 샘플을 로딩합니다." placement="bottom" effect="light")
                el-checkbox(v-model="checked" label='확인', name='type')
</template>

<script>
  export default {
    label: 'AppConfig',
    data () {
      return {
        contractions: [],
        checked: false
      }
    },
    methods: {
      onInit () {
        this.checked = false
        this.contractionService.init()
        this.$emit('cleared')
        this.success('초기화를 완료하였습니다.')
      },
      onSync () {
        let contractions = this.contractionStore.queryAll()
        chrome.storage.local.set({contractions}, () => {
          this.success('기기간 동기화가 완료되었습니다. 단, 반영되는 데 시간이 걸릴 수 있습니다.')
        })
      }
    }
  }
</script>

<style scoped>
    .btn {
        margin-right: 10px;
    }

    .spacer {
        margin-top: 10px;
    }
</style>
