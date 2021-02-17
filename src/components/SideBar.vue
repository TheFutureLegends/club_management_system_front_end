<template>
  <div>
    <v-app-bar app flat class="white">
      <v-app-bar-nav-icon
        @click.stop="sidebarMenu = !sidebarMenu"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="title">{{ this.$route.name }}</v-toolbar-title>
      <slot />
    </v-app-bar>
    <v-navigation-drawer
      v-model="sidebarMenu"
      dark
      app
      floating
      class="deep-purple darken-1"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> Sandra Adams </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>
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
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    sidebarMenu: true,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", link: "/" },
      { title: "Members", icon: "mdi-account-group-outline", link: "/members" },
      { title: "Events", icon: "mdi-calendar-month-outline", link: "/events" },
    ],
  })
};
</script>