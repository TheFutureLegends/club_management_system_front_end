export const namespaced = true

export const state = {
  members: [],
  member: {}
}

export const mutations = {
  SET_MEMBERS(state, payload) {
    state.members = payload
  },
  SET_MEMBER(state, payload) {
    state.member = payload
  }
}

export const actions = {
  async getMembers({ state, dispatch, commit }) {
    try {
      if (state.members.length === 0) {
        const { data } = await this.$axios.get('/members/')
        commit('SET_MEMBERS', data)
      }
    } catch (err) {
      dispatch(
        'notification/addNotification',
        {
          color: 'danger',
          text: 'There is an error while fetching data: ' + err.message
        },
        { root: true }
      )
    }
  },

  async getMember({ state, commit, getters }, id) {
    if(state.members.length !== 0) {
      const member = getters.getMemberById(id)
      commit('SET_MEMBER', member)
    } else {
      const { data } = await this.$axios.get(`/members/${id}/`)
      commit('SET_MEMBER', data)
    }
  },

  async addMember({ state, dispatch }, member) {
    const { data } = await this.$axios.post('/members/', member)
    state.members.push(data)
    dispatch(
      'notification/addNotification',
      {
        color: 'success',
        text: 'Add Member Successfully'
      },
      { root: true }
    )
  },

  editMember({ dispatch }, { id, member }) {
    this.$axios.put(`/members/${id}/`, member)
    dispatch(
      'notification/addNotification',
      {
        color: 'success',
        text: 'Edit Member Successfully'
      },
      { root: true }
    )
  },

  deleteMember({ dispatch }, id) {
    this.$axios.delete(`/members/${id}/`)
    dispatch(
      'notification/addNotification',
      {
        color: 'success',
        text: 'Delete Member Successfully'
      },
      { root: true }
    )
  }
}

export const getters = {
  getMemberById: state => id => {
    return state.members.find(member => member.id === id)
  }
}