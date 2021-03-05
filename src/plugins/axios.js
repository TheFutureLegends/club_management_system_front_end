import ax from 'axios'
ax.defaults.baseURL = process.env.VUE_APP_API
export const axios = ax

export default {
    install(Vue) {
        Vue.prototype.$axios = ax
    }
}