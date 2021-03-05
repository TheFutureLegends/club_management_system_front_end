<template>
  <v-app>
    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      clipped
      floating
      width="240px"
    >
      <v-list dense nav>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn depressed color="primary" block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app flat clipped-left dark color="primary">
      <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu" />
      <v-toolbar-title>Club Management System</v-toolbar-title>
    </v-app-bar>
    <v-main class="indigo lighten-5">
      <v-container class="pa-6">
        <slot />
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbar"
      top
      :color="$store.state.notification.snackbarColor"
    >
      {{ $store.state.notification.notificationText }}
      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    sidebarMenu: true,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/' },
      { title: 'Members', icon: 'mdi-account-group-outline', link: '/members' },
      { title: 'Events', icon: 'mdi-calendar-month-outline', link: '/events' },
    ],
  }),
  computed: {
    snackbar: {
      get() {
        return this.$store.state.notification.snackbar
      },
      set(value) {
        this.$store.commit('notification/TOGGLE_SNACKBAR', value)
      },
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt')
      this.$router.push('/login')
    },
  },
}
</script>
