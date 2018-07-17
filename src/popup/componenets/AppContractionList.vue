<template lang="pug">
    div
        //타이틀
        h2
            i.el-icon-menu
            span.title  단축키 목록 ({{contractions.length}} / 100)
            el-button(@click="onRefresh()" size="mini" type="text") 새로고침

        //목록
        el-table.wide-table(:data='contractions', max-height="300", :default-sort="{prop:'hit',order:'descending    '}", border)
            el-table-column(prop='keyword' label='키워드', width='90' :sortable="true" height="20" resizable fixed :show-overflow-tooltip="true")
            el-table-column(prop='label' label='라벨', width='90' :sortable="true" height="20" resizable fixed :show-overflow-tooltip="true")
            el-table-column(prop='hit', label='횟수' width='70' resizable :show-overflow-tooltip="true" :sortable="true")
            el-table-column(prop='uri', label='URI' resizable :show-overflow-tooltip="true" :sortable="true")
                template(slot-scope='scope')
                    el-button(@click="onGoUri(scope.row.uri)" type="text") {{scope.row.uri}}
            el-table-column(fixed='right', width='120' align="right")
                template(slot-scope='scope')
                    el-button(@click='onEdit()', type="text", icon='el-icon-edit', round size="mini")
                    el-button(@click="onErase(scope.row.keyword)" type='text', icon='el-icon-delete', round size="mini")
</template>

<script>
  export default {
    label: 'AppContractionList',
    data () {
      return {
        contractions: []
      }
    },
    methods: {
      onEdit () {
        this.errorm('죄송합니다. 수정은 아직 지원하지 않습니다 ㅜㅜ 링크를 클릭 후 다시 셋팅해주십시오!')
      },
      onRefresh () {
        this.$_loadContractions()
      },
      onErase (keyword) {
        this.contractionService.eraseByKeyword(keyword)
        this.$_loadContractions()
      },
      onGoUri (url) {
        chrome.tabs.create({url})
      },
      $_loadContractions () {
        this.contractions = this.contractionStore.queryAll()
      }
    },
    created () {
      this.$_loadContractions()
    }
  }
</script>

<style scoped>
    .title {
        margin-right: .5rem;
    }

    .wide-table {
        width: 100%;
    }
</style>
