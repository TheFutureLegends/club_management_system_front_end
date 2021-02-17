import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import Default from "./layouts/Default";
import Member from "./layouts/Member";
import store from './store'

Vue.config.productionTip = false;

Vue.component("default-layout", Default);
Vue.component("member-layout", Member);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App)
}).$mount("#app");
