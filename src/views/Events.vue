<template>
  <div>
    <base-header />
    <v-data-iterator :items="events">
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>
              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader'

export default {
  components: { BaseHeader },
  data: () => ({
    dropdownItems: [
      { title: '-2' },
      { title: '-1' },
      { title: '0' },
      { title: '1' },
      { title: '2' },
    ],
    events: [],
  }),
  created() {
    this.getEvent()
  },
  methods: { 
    async getEvent() {
     const { data } = await this.$axios.get('/events/')
     this.events = data
     console.log(data)
    }
  }
}
</script>
