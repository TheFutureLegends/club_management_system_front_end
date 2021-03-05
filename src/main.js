import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import Default from './layouts/Default'
import Login from './layouts/Login.vue'
import store from './store'
import VueAxios from './plugins/axios'

Vue.config.productionTip = false

Vue.use(VueAxios)
Vue.component('DefaultLayout', Default)
Vue.component('LoginLayout', Login)

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App)
}).$mount('#app')
