<template>
  <v-card class="py-2 rounded-lg" :loading="loading">
    <v-card-title class="mb-4">{{ title }}</v-card-title>
    <v-card-text>
      <slot name="content" />
    </v-card-text>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
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