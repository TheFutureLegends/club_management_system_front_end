<template>
  <v-app-bar app flat class="white">
    <v-app-bar-nav-icon
      @click.stop="sidebarMenu = !sidebarMenu"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="title">{{ this.$route.name }}</v-toolbar-title>
    <slot />
  </v-app-bar>
</template>

<script>
export default {
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
}
</script>