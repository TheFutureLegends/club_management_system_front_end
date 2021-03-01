import Vue from 'vue'
import Vuex from 'vuex'

import * as member from './modules/member'
import * as notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarMenu: true,
  },
  mutations: {
    TOGGLE_SIDEBAR_MENU(state, payload) {
      state.sidebarMenu = payload
    },
  },
  actions: {},
  modules: {
    member,
    notification
  },
})
