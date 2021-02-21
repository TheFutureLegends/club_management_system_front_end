import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarMenu: true
  },
  mutations: {
    toggleSidebarMenu(state, payload) {
      state.sidebarMenu = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
