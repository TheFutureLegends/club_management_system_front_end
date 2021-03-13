<template>
  <div>
    <h3>Events</h3>
    <v-breadcrumbs class="mb-4 px-0 py-2" :items="items"></v-breadcrumbs>
    <v-dialog v-model="dialog" width="480px">
      <template #activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <v-icon class="pr-1"> mdi-plus </v-icon> Add Event
        </v-btn>
      </template>
      <base-modal-card :title="formTitle" :loading="loading">
        <v-text-field
            v-model="editedEvent.name"
            label="Event Name"
        />
        <v-row>
          <v-col cols="12">
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="picker"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="picker"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="picker"
                  no-title
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(picker)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="start"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="start"
                    label="Start time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                  v-model="start"
                  full-width
                  :max="end"
                  @click:minute="$refs.menu2.save(start)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-menu
                ref="menu3"
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="end"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="end"
                    label="End time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                  v-model="end"
                  full-width
                  :min="start"
                  @click:minute="$refs.menu3.save(end)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <div class="d-flex justify-end mt-2">
          <v-btn color="primary" text @click="close"> Cancel </v-btn>
          <v-btn color="primary" @click="save"> Save </v-btn>
        </div>
      </base-modal-card>
    </v-dialog>
    <v-row class="mt-2">
      <v-col v-for="item in events" :key="item._id" cols="12" sm="6" lg="4">
        <EventCard
            @update-event="updateEvent"
            :event="item"
            :name="item.name"
            :dateTime="item.dateTime"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseModalCard from '@/components/BaseModalCard.vue'
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: { EventCard, BaseModalCard },
  data: () => ({
    loading: false,
    dialog: false,
    editedIndex: -1,
    start: null,
    end: null,
    picker: null,
    menu: false,
    menu2: false,
    menu3: false,
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
    items: [
      {
        text: 'Club Management System',
        disabled: false,
        to: '/',
      },
      {
        text: 'Events',
        disabled: true,
        href: '/',
      },
    ],
  }),
  created() {
    this.$store.dispatch('event/getEvents')
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add New Event' : 'Edit Event'
    },
    ...mapState('event', ['events']),
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  methods: {
    setDateTime() {
      this.editedEvent.dateTime =
          this.picker + ' ' + this.start + ' ' + this.end
    },
    updateEvent(e) {
      this.editedIndex = this.events.indexOf(e)
      this.editedEvent = Object.assign({}, e)
      const splitedDate = e.dateTime.split(' ')
      this.picker = splitedDate[0]
      this.start = splitedDate[1]
      this.end = splitedDate[2]
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedEvent = Object.assign({}, this.defaultEvent)
        this.start = null,
            this.end = null,
            this.picker = null,
            this.editedIndex = -1
      })
    },
    async save() {
      if (this.editedIndex > -1) {
        this.loading = true
        this.setDateTime()
        await this.$store.dispatch('event/editEvent', {
          id: this.editedEvent._id,
          event: this.editedEvent,
        })
        Object.assign(this.events[this.editedIndex], this.editedEvent)
        this.loading = false
        this.close()
      } else {
        this.loading = true
        this.setDateTime()
        await this.$store.dispatch('event/addEvent', this.editedEvent)
        this.loading = false
        this.close()
      }
    },
  },
}
</script>
