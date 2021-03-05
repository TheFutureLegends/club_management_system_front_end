export const namespaced = true

export const state = {
    events: []
}

export const mutations = {
    SET_EVENTS(state, payload) {
        state.events = payload
    }
}

export const actions = {
    async getEvents({ state, commit }) {
        if (state.events.length === 0) {
            const { data } = await this.$axios.get('/events/')
            let dataEvents = []
            data.map(item => {
                if (item.members.length !== 0) {
                    let memberNames = []
                    item.members.map(item => {
                        this.$axios.get(`/members/${item}/`).then(res => {
                            memberNames.push({
                                id: res.data.id,
                                name: res.data.full_name
                            })
                        })
                    })
                    dataEvents.push({
                        id: item.id,
                        name: item.name,
                        members: memberNames
                    })
                } else {
                    dataEvents.push({
                        id: item.id,
                        name: item.name,
                        members: []
                    })
                }
            })
            await commit('SET_EVENTS', dataEvents)
        }
    },
}