import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export const namespaced = true

export const state = {
  members: [],
}

export const mutations = {
  SET_MEMBERS(state, payload) {
    state.members = payload
  },
}

export const actions = {
  async getMembers({ state, dispatch, commit }) {
    try {
      if (state.members.length === 0) {
        const response = await axios.get('/members/')
        commit('SET_MEMBERS', response.data)
      }
    } catch (err) {
      dispatch('notification/addNotification', {
        color: 'danger',
        text: 'There is an error while fetching data: ' + err.message,
      })
    }
  },

  async addMember({ state, dispatch }, member) {
    const { data } = await axios.post('/members/', member)
    state.members.push(data)
    dispatch('notification/addNotification', {
      color: 'success',
      text: 'Add Member Successfully',
    })
  },

  editMember({ dispatch }, { id, member }) {
    axios.put(`/members/${id}`, member)
    dispatch('notification/addNotification', {
      color: 'success',
      text: 'Edit Member Successfully',
    })
  },

  deleteMember({ dispatch }, id) {
    axios.delete(`/members/${id}/`)
    dispatch('notification/addNotification', {
      color: 'success',
      text: 'Delete Member Successfully',
    })
  },
}
