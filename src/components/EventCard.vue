<template>
  <div>
    <v-dialog v-model="dialogDelete" width="480px">
      <base-modal-card title="Delete event" :loading="loading">
        Are you sure you want to delete this event?
        <div class="d-flex justify-end mt-2">
          <v-btn color="primary" text @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="deleteEventConfirm">
            OK
          </v-btn>
        </div>
      </base-modal-card>
    </v-dialog>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <div class="subtitle-2 primary--text">{{ month }}</div>
            <div class="title">{{ day }}</div>
          </v-col>
          <v-col cols="8">
            <div class="headline">{{ name }}</div>
            <div class="caption">{{ date }} {{ timeRange }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn :to="`/events/${name}/participants`" depressed text color="primary"
        >View Participants</v-btn
        >
        <div class="d-flex">
          <v-icon small class="mr-2" @click="editEvent(event)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteEvent(event)"> mdi-delete </v-icon>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import BaseModalCard from './BaseModalCard.vue'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  components: { BaseModalCard },
  props: ['name', 'dateTime', 'event'],
  data: () => ({
    loading: false,
    dialogDelete: false,
    editedIndex: -1,
    date: '',
    timeRange: '',
    day: '',
    month: '',
    year: '',
    defaultEvent: {
      _id: '',
      name: '',
      dateTime: '',
    },
    editedEvent: {
      _id: '',
      name: '',
      dateTime: '',
    },
  }),
  computed: {
    ...mapState('event', ['events']),
  },
  created() {
    this.formatDateTime()
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    formatDateTime() {
      let splitDateTime = this.dateTime.split(' ')
      this.timeRange = splitDateTime[1] + ' - ' + splitDateTime[2]
      let date = moment(splitDateTime[0]).format('ddd, MMM D YYYY')
      let splitDate = date.split(' ')
      this.date = date
      this.month = splitDate[1]
      this.day = splitDate[2]
    },
    editEvent(event){
      this.$emit('update-event', event)
    },
    deleteEvent(event) {
      this.editedIndex = this.events.indexOf(event)
      this.editedEvent = Object.assign({}, event)
      this.dialogDelete = true
    },
    deleteEventConfirm() {
      this.$store.dispatch('event/deleteEvent', this.editedEvent._id)
      this.events.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedEvent = Object.assign({}, this.defaultEvent)
        this.editedIndex = -1
      })
    },
  },
}
</script>
