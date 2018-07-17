import Vue from 'vue'
import App from './componenets/App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './mixin'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({ // eslint-disable-line no-new
  el: '#root',
  render: h => h(App)
})
