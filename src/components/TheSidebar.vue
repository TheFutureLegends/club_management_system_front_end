<template>
  <v-navigation-drawer
    v-model="sidebarMenu"
    dark
    app
    floating
    class="primary"
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Sandra Adams </v-list-item-title>
          <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-spacer></v-spacer>
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
     <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/' },
      { title: 'Members', icon: 'mdi-account-group-outline', link: '/members' },
      { title: 'Events', icon: 'mdi-calendar-month-outline', link: '/events' },
    ],
  }),
  computed: {
    sidebarMenu: {
      get() {
        return this.$store.state.sidebarMenu
      },
      set(value) {
        this.$store.commit('TOGGLE_SIDEBAR_MENU', value)
      },
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt')
      this.$router.push('/login')
    }
  }
}
</script>