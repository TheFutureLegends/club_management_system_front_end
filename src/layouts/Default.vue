<template>
  <v-app>
    <the-sidebar />
    <v-main class="blue-grey lighten-5">
      <v-container class="px-4">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'

export default {
  components: { TheSidebar }
}
</script>