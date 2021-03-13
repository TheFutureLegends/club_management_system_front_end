<template>
  <div>
    <v-list-group v-for="(member, index) in members" :key="index">
      <template v-slot:activator>
        <v-list-item-title>{{ member.name }}</v-list-item-title>
      </template>

      <v-list-item class="py-2">
        <div class="caption pb-2">Communication</div>
        <v-slider max="2" min="-2" v-model="kpis.communication" hide-details>
          <template v-slot:append>
            <v-text-field
              v-model="kpis.communication"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 30px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-list-item>

      <v-list-item class="py-2">
        <div class="caption pb-2">Timeliness</div>
        <v-slider max="2" min="-2" v-model="kpis.timeliness" hide-details>
          <template v-slot:append>
            <v-text-field
              v-model="kpis.timeliness"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 30px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-list-item>

      <v-list-item class="py-2">
        <div class="caption pb-2">Quality Of Work</div>
        <v-slider max="2" min="-2" v-model="kpis.quality_of_work" hide-details>
          <template v-slot:append>
            <v-text-field
              v-model="kpis.quality_of_work"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 30px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-list-item>

      <v-list-item class="py-2">
        <div class="caption pb-2">Daily Communication</div>
        <v-slider
          max="2"
          min="-2"
          v-model="kpis.daily_communication"
          ticks="always"
          tick-size="6"
          track-color="primary"
          hide-details
        >
          <template v-slot:append>
            <v-text-field
              v-model="kpis.daily_communication"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 30px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-list-item>

      <v-list-item class="py-2">
        <div class="caption pb-2">Helpful Teammate</div>
        <v-slider max="2" min="-2" v-model="kpis.helpful_teammate" hide-details>
          <template v-slot:append>
            <v-text-field
              v-model="kpis.helpful_teammate"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 30px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-list-item>

      <v-list-item>
        <v-btn
          :loading="btnLoading"
          @click="submitKPI(member.id)"
          depressed
          block
          color="primary"
          >Submit</v-btn
        >
      </v-list-item>
    </v-list-group>
  </div>
</template>

<script>
export default {
  props: {
    members: Array,
    eventId: Number,
  },
  data: () => ({
    btnLoading: false,
    defaultKpis: {
      communication: 0,
      timeliness: 0,
      quality_of_work: 0,
      daily_communication: 0,
      helpful_teammate: 0,
      member: 0,
      event: 0,
    },
    kpis: {
      communication: 0,
      timeliness: 0,
      quality_of_work: 0,
      daily_communication: 0,
      helpful_teammate: 0,
      member: 0,
      event: 0,
    },
  }),
  mounted() {
    this.kpis.event = this.eventId
  },
  methods: {
    async submitKPI(id) {
      this.btnLoading = true
      const { data } = await this.$axios.get('http://127.0.0.1:8000/api/kpis/')
      const filteredData = data.filter(
        (item) => item.member === id && item.event === this.eventId
      )
      if (filteredData.length !== 0) {
        this.kpis.member = id
        await this.$axios.put(`/kpis/${filteredData[0].id}/`, this.kpis)
      } else {
        this.kpis.member = id
        await this.$axios.post('/kpis/', this.kpis)
      }
      this.btnLoading = false
      this.kpis = this.defaultKpis
    },
  },
}
</script>