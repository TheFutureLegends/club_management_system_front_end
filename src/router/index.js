import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: require("@/views/Dashboard.vue").default
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import(/* webpackChunkName: "members" */ '@/views/Events.vue')
  },
  {
    path: '/members',
    name: 'Members',
    meta: {
      layout: 'member'
    },
    component: () => import(/* webpackChunkName: "members" */ '@/views/Members.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
