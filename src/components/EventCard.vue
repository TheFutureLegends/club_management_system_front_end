<template>
  <v-card elevation="2">
    <v-card-text>
      <div class="d-flex">
        <p class="display-2">
          {{ date }}
        </p>
        <div class="ml-3 font-weight-bold">
          <div>{{ month }}</div>
          <div>{{ timeRange }}</div>
        </div>
      </div>
      <div class="font-weight-bold title">{{ title }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    date: Number,
    title: String,
    month: String,
    timeRange: String
  }
}
</script>
