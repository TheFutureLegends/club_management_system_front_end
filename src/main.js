import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import Default from './layouts/Default'
import Login from './layouts/Login.vue'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:5000/api/v1'

Vue.component('default-layout', Default)
Vue.component('login-layout', Login)

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App)
}).$mount('#app')
