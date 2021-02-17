import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchValue: ""
  },
  mutations: {
    doSearch(state, payload) {
      state.searchValue = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
