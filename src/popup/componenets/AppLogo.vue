<template lang="pug">
    div.logo
        i Designed by coding8282 &nbsp;
        i.el-icon-info &nbsp;
        el-button(@click="onGithub()" type="text")
            i github
</template>

<script>
  export default {
    label: 'AppLogo',
    methods: {
      onGithub () {
        chrome.tabs.create({url: 'https://github.com/coding8282'})
      }
    }
  }
</script>

<style lang="scss" scoped>
    .logo {
        text-align: right;
        color: #ccc;
        .github {
            color: blue;
        }
    }
</style>
