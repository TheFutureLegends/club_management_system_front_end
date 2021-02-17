<template>
  <v-app>
    <SideBar />
    <v-main class="blue-grey lighten-5">
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar";

export default {
  components: {
    SideBar,
  },
};
</script>