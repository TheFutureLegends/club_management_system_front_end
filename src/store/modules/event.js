export const namespaced = true

export const state = {
    events: [],
    event: {}
}

export const mutations = {
    SET_EVENTS(state, payload) {
        state.events = payload
    },
    ADD_EVENT(state, payload) {
        state.events.push(payload)
    },
    SET_EVENT(state, payload) {
        state.event = payload
    }
}

export const actions = {
    async getEvents({ state, commit }) {
        if (state.events.length === 0) {
            const { data } = await this.$axios.get('/events')
            await commit('SET_EVENTS', data)
        }
    },

    async addEvent({ dispatch, commit }, event) {
        const { data } = await this.$axios.post('/events', event)
        commit('ADD_EVENT', data)
        dispatch(
            'notification/addNotification',
            {
                color: 'success',
                text: 'Add Event Successfully'
            },
            { root: true }
        )
    },

    editEvent({ dispatch }, { id, event }) {
        this.$axios.put(`/events/${id}`, event)
        dispatch(
            'notification/addNotification',
            {
                color: 'success',
                text: 'Edit Event Successfully'
            },
            { root: true }
        )
    },

    deleteEvent({ dispatch }, id) {
        this.$axios.delete(`/events/${id}`)
        dispatch(
            'notification/addNotification',
            {
                color: 'success',
                text: 'Delete Event Successfully'
            },
            { root: true }
        )
    }
}