import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: require('@/views/Dashboard').default,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import(/* webpackChunkName: "events" */ '@/views/Events'),
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/events/:eventname/participants', 
    component: () => import(/* webpackChunkName: "participants" */ '@/views/Participants'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/members',
    name: 'Members',
    component: () =>
      import(/* webpackChunkName: "members" */ '@/views/Members'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
    meta: {
      layout: 'login',
      guest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') === null) {
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'Dashboard' })
    }
  } else {
    next()
  }
})

export default router
