<template lang="pug">
    el-main.main(:class="containerClass")
        div(v-if="isInitialized")
            //탭
            el-tabs(v-model="activeName")
                el-tab-pane(label='초성' name='add')
                    app-keyword-form
                el-tab-pane(label='사용법' name='tip')
                    app-tip
                el-tab-pane(label='설정' name='config')
                    app-config(@cleared="onCleared()")

            //버튼
            div.app-btn(v-if="activeName==='add'")
                el-button(type='text' @click="onToggleShowList()" :icon="showList?'el-icon-arrow-down':'el-icon-arrow-up'" size="mini" ) 목록

            //리스트
            app-contraction-list(v-if="showList")

            //로고
            app-logo(v-if="showList")

        div(v-else)
            app-initial(@loaded="onLoaded()")
</template>

<script>
  import AppKeywordForm from './AppKeywordForm'
  import AppContractionList from './AppContractionList'
  import AppConfig from './AppConfig'
  import AppLogo from './AppLogo'
  import AppTip from './AppTip'
  import AppInitial from './AppInitial'

  export default {
    label: 'App',
    components: {
      AppKeywordForm,
      AppContractionList,
      AppConfig,
      AppLogo,
      AppTip,
      AppInitial
    },
    computed: {
      containerClass () {
        return this.showList ? 'wide-container' : 'container'
      }
    },
    watch: {
      activeName () {
        this.showList = false
      }
    },
    data () {
      return {
        activeName: 'add',
        showList: false,
        isInitialized: false
      }
    },
    methods: {
      onToggleShowList () {
        this.showConfig = false
        this.showList = !this.showList
      },
      onToggleShowConfig () {
        this.showList = false
        this.showConfig = !this.showConfig
      },
      onLoaded () {
        this.isInitialized = true
        this.activeName = 'add'
      },
      onCleared () {
        this.isInitialized = false
        this.activeName = 'add'
      }
    },
    created () {
      this.isInitialized = this.contractionService.isInitialized()
    }
  }
</script>

<style lang="scss" scoped>
    .app-btn {
        text-align: right;
        bottom: 0;
    }

    .container {
        width: 380px;
        height: 400px;
        padding: 0px;
    }

    .wide-container {
        width: 650px;
    }

    .main {
        padding: 2px 8px;
    }
</style>
