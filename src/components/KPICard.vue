<template>
  <v-card flat class="rounded-lg">
    <v-card-title class="subtitle-1">
      {{ name }}
    </v-card-title>
    <v-divider />
    <v-list>
      <v-list-item>
        <v-list-item-title class="subtitle-2">Participants</v-list-item-title>
      </v-list-item>
      <KPIRating :eventId="eventId" :members="membersInEvent" />
    </v-list>
    <v-card-actions>
      <v-btn @click="show = !show" depressed text color="primary"
        >Add Participant</v-btn
      >
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group v-model="selectedMembers" multiple>
            <template v-for="(member, index) in members">
              <v-list-item
                active-class="indigo--text text--accent-4"
                :key="index"
                :value="member.id"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="member.full_name"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action :key="index">
                    <v-checkbox
                      :input-value="active"
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
          <v-list-item class="mt-2">
            <v-btn :loading="btnLoading" block @click="addMemberToEvent" depressed color="primary"
              >Submit</v-btn
            >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import KPIRating from '@/components/KPIRating.vue'
import { mapState } from 'vuex'
export default {
  components: { KPIRating },
  props: ['name', 'eventId', 'membersInEvent'],
  data: () => ({
    show: false,
    btnLoading: false,
    selectedMembers: []
  }),
  created() {
    this.$store.dispatch('member/getMembers')
  },
  computed: {
      ...mapState('member', ['members'])
  },
  methods: {
    async addMemberToEvent() {
        this.btnLoading = true
        let arrayMembersIdInEvent = []
        
        this.membersInEvent.map(mem => {
            arrayMembersIdInEvent.push(mem.id)
        })

        Array.prototype.push.apply(arrayMembersIdInEvent, this.selectedMembers)
        await this.$axios.put(`/events/${this.eventId}/`, {
            name: this.name,
            members: arrayMembersIdInEvent
        })
        this.btnLoading = false
    },
  },
}
</script>