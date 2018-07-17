import Vue from 'vue'
import Registry from '../model/Registry'

Vue.mixin({
  computed: {
    contractionService () {
      return Registry.contractionService()
    },
    contractionStore () {
      return Registry.contractionStore()
    },
    configStore () {
      return Registry.configStore()
    }
  },
  methods: {
    info (message) {
      this.$message({showClose: true, message})
    },
    warn (message) {
      this.$message({showClose: true, message, type: 'warning'})
    },
    success (message) {
      this.$message({showClose: true, message, type: 'success'})
    },
    errorm (message) {
      this.$message({showClose: true, message, type: 'error'})
    }
  }
})
