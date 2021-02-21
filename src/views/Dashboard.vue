<template>
  <div>
    <base-header />
    <h3 class="my-3">Upcoming Event</h3>
    <v-row>
      <v-col v-for="n in 4" :key="n" cols="12" md="6" lg="3">
        <event-card
          :date=17
          title="Introduction Day"
          month="Feb"
          time-range="15:00 - 17:00"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard'
import BaseHeader from '@/components/BaseHeader.vue'

export default {
  name: 'Dashboard',
  components: { BaseHeader, EventCard },
}
</script>

    