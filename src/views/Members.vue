<template>
  <div>
    <v-dialog v-model="dialogDelete" width="480px">
      <base-modal title="Delete member" :loading="loading">
        <template v-slot:content>
          Are you sure you want to delete this member?
        </template>
        <template v-slot:actions>
          <v-spacer />
          <v-btn depressed color="primary" text @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn depressed color="primary" @click="deleteMemberConfirm">
            OK
          </v-btn>
        </template>
      </base-modal>
    </v-dialog>
    <v-data-table
      :search="search"
      :loading="tableLoading"
      :headers="headers"
      :items="members"
      class="pa-6 rounded-lg"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-row class="pb-10" align="center" justify="space-between">
          <v-col cols="12" md="4">
            <v-dialog v-model="dialog" width="480px">
              <template #activator="{ on, attrs }">
                <v-btn depressed color="primary" dark v-bind="attrs" v-on="on">
                  <v-icon class="pr-1"> mdi-plus </v-icon> Add Member
                </v-btn>
              </template>

              <base-modal :title="formTitle" :loading="loading">
                <template v-slot:content>
                  <v-text-field
                    v-model="editedMember.full_name"
                    outlined
                    label="Full Name"
                  />
                  <v-text-field
                    v-model="editedMember.student_id"
                    outlined
                    label="ID Number"
                  />
                  <v-text-field
                    v-model="editedMember.role"
                    outlined
                    label="Role"
                  />
                </template>
                <template v-slot:actions>
                  <v-spacer />
                  <v-btn depressed color="primary" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn depressed color="primary" @click="save"> Save </v-btn>
                </template>
              </base-modal>
            </v-dialog>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search name"
              hide-details
              single-line
            />
          </v-col>
        </v-row>
      </template>
      <template #[`item.full_name`]="{ item }">
        <div class="subtitle-2">
          {{ item.full_name }}
        </div>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editMember(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteMember(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue'
import { mapState } from 'vuex'

export default {
  components: { BaseModal },
  name: 'Members',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    loading: false,
    tableLoading: false,
    editedIndex: -1,
    totalKPI: 0,
    defaultMember: {
      id: '',
      full_name: '',
      student_id: '',
      role: '',
    },
    editedMember: {
      id: '',
      full_name: '',
      student_id: '',
      role: '',
    },
    headers: [
      { text: 'Full Name', value: 'full_name' },
      { text: 'Student ID', value: 'student_id' },
      { text: 'Role', value: 'role' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add New Member' : 'Edit Member'
    },
    ...mapState('member', ['members']),
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.getMembers()
  },
  methods: {
    async getMembers() {
      this.tableLoading = true
      await this.$store.dispatch('member/getMembers')
      this.tableLoading = false
    },
    editMember(member) {
      this.editedIndex = this.members.indexOf(member)
      this.editedMember = Object.assign({}, member)
      this.dialog = true
    },
    deleteMember(member) {
      this.editedIndex = this.members.indexOf(member)
      this.editedMember = Object.assign({}, member)
      this.dialogDelete = true
    },
    deleteMemberConfirm() {
      this.$store.dispatch('member/deleteMember', this.editedMember.id)
      this.members.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedMember = Object.assign({}, this.defaultMember)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedMember = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async save() {
      if (this.editedIndex > -1) {
        this.loading = true
        this.$store.dispatch('member/editMember', {
          id: this.editedMember.id,
          member: this.editedMember,
        })
        Object.assign(this.members[this.editedIndex], this.editedMember)
        this.loading = false
        this.close()
      } else {
        this.loading = true
        await this.$store.dispatch('member/addMember', this.editedMember)
        this.loading = false
        this.close()
      }
    },
  },
}
</script>
