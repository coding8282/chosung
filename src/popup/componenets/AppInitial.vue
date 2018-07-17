<template lang="pug">
    div
        el-row
            h1.title
                i.el-icon-search
                span   샘플을 선택해주세요 :)

        el-row.sample
            el-tooltip(content="Naver 등 자주사용하는 사이트를 로드합니다." effect="light")
                el-button(@click="onLoadSample()" icon="el-icon-check") 샘플 로딩
            el-tooltip(content="Github 등 개발자가 자주 사용하는 사이트를 로드합니다." effect="light")
                el-button(@click="onLoadDeveloperSample()" icon="el-icon-check") 샘플 로딩(SW개발자)

        el-row.skip
            el-tooltip(content="샘플을 로드하지 않고 스스로 구성합니다." effect="light")
                el-button(@click="onSkip()" type="text" size="mini") 건너뛰기 :)
</template>

<script>
  export default {
    label: 'AppInitial',
    methods: {
      onSkip () {
        this.contractionService.make({keyword: 'ㄴㅇㅂ', label: '네이버', uri: 'https://naver.com'})
        this.$emit('loaded')
      },
      onLoadSample () {
        this.contractionService.loadSample()
        this.$emit('loaded')
      },
      onLoadDeveloperSample () {
        this.contractionService.loadDeveloperSample()
        this.$emit('loaded')
      }
    }
  }
</script>

<style lang="scss" scoped>
    .title {
        text-align: center;
        color: #888;
    }

    .sample {
        text-align: center;
        margin-top: 60px;
    }

    .skip {
        text-align: right;
        margin-top: 60px;
    }
</style>
