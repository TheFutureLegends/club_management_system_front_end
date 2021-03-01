<template>
  <v-app>
    <the-sidebar />
    <v-main class="blue-grey lighten-5">
      <v-container class="px-4">
        <slot />
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" :color="$store.state.snackbarColor"
      >{{ $store.state.notificationText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'

export default {
  computed: {
    snackbar: { 
      get() {
        return this.$store.state.snackbar
      },
      set(value) {
        this.$store.commit('TOGGLE_SNACKBAR', value)
      }
    }
  },
  components: { TheSidebar },
}
</script>
