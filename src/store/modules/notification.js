export const namespaced = true

export const state = {
  snackbarColor: '',
  snackbar: false,
  notificationText: ''
}

export const mutations = {
  TOGGLE_SNACKBAR(state, payload) {
    state.snackbar = payload
  },
  SET_NOTIFICATION(state, payload) {
    state.snackbar = true
    state.notificationText = payload.text
    state.snackbarColor = payload.color
  }
}

export const actions = {
  addNotification({ commit }, notification) {
    return commit('SET_NOTIFICATION', notification)
  }
}
