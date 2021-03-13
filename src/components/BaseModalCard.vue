<template>
  <v-card :loading="loading">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    loading: Boolean,
  },
}
</script>
