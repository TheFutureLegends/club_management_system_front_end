import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from '@/plugins/axios'

import * as member from './modules/member'
import * as event from './modules/event'
import * as notification from './modules/notification'

const axiosPlugin = store => {
  store.$axios = axios
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    member,
    notification,
    event
  },
  plugins: [axiosPlugin]
})
