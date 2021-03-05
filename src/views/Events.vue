<template>
  <div>
    <v-dialog v-model="dialog" width="480px">
      <template #activator="{ on, attrs }">
        <v-btn depressed color="primary" dark v-bind="attrs" v-on="on">
          <v-icon class="pr-1"> mdi-plus </v-icon> Add Event
        </v-btn>
      </template>

      <base-modal :title="formTitle" :loading="loading">
        <template v-slot:content>
          <v-text-field v-model="editedEvent.name" outlined label="Event Name" />
        </template>
        <template v-slot:actions>
          <v-spacer />
          <v-btn depressed color="primary" text @click="close"> Cancel </v-btn>
          <v-btn depressed color="primary" @click="save"> Save </v-btn>
        </template>
      </base-modal>
    </v-dialog>
    <v-row class="mt-2">
      <v-col v-for="item in events" :key="item.id" cols="12" sm="6" lg="4">
        <KPICard
          :name="item.name"
          :eventId="item.id"
          :membersInEvent="item.members"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue'
import KPICard from '@/components/KPICard.vue'
import { mapState } from 'vuex'

export default {
  components: { KPICard, BaseModal },
  data: () => ({
    loading: false,
    dialog: false,
    editedIndex: -1,
    defaultEvent: {
      id: '',
      name: '',
      members: [],
    },
    editedEvent: {
      id: '',
      name: '',
      members: [],
    },
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
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedEvent = Object.assign({}, this.defaultEvent)
        this.editedIndex = -1
      })
    },
    async save() {
        this.loading = true
        await this.$axios.post('/events/', this.editedEvent)
        this.loading = false
        this.close()
    },
  },
}
</script>
