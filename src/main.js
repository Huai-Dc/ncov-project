import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './style/index.scss'
import 'normalize.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import http from './net/http'
import apis from './net/apis'
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$apis = apis
Vue.prototype.$md5 = md5

Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
