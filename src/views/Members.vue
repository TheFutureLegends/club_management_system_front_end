<template>
  <div>
    <h3>Members</h3>
    <v-breadcrumbs class="px-0 py-2" :items="items"></v-breadcrumbs>
    <v-dialog v-model="dialogDelete" width="480px">
      <base-modal-card title="Delete member" :loading="loading">
        Are you sure you want to delete this member?
        <div class="d-flex justify-end mt-2">
          <v-btn color="primary" text @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="deleteMemberConfirm">
            OK
          </v-btn>
        </div>
      </base-modal-card>
    </v-dialog>
    <div class="d-flex align-center">
      <v-dialog v-model="dialog" width="480px">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            <v-icon class="pr-1"> mdi-plus </v-icon> Add Member
          </v-btn>
        </template>
        <base-modal-card :title="formTitle" :loading="loading">
          <v-text-field
              v-model="editedMember.fullName"
              label="Full Name"
          />
          <v-text-field
              v-model="editedMember.studentId"
              label="ID Number"
          />
          <v-text-field
              v-model="editedMember.role"
              label="Role"
          />
          <div class="d-flex justify-end mt-2">
            <v-btn color="primary" text @click="close">
              Cancel
            </v-btn>
            <v-btn color="primary" @click="save"> Save </v-btn>
          </div>
        </base-modal-card>
      </v-dialog>
      <div style="width: 280px">
        <v-text-field
            class="ml-4"
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search name"
        />
      </div>
    </div>
    <v-card>
      <v-card-text>
        <v-data-table
            :search="search"
            :loading="tableLoading"
            :headers="headers"
            :items="members"
            loading-text="Loading... Please wait"
        >
          <template #[`item.fullName`]="{ item }">
            <div class="subtitle-2">
              {{ item.fullName }}
            </div>
          </template>
          <template #[`item.totalKPIs`]="{ item }">
            <v-chip :color="getColor(item.totalKPIs)" dark>
              {{ item.totalKPIs }}
            </v-chip>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editMember(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteMember(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import BaseModalCard from '@/components/BaseModalCard.vue'
import {mapState} from 'vuex'

export default {
  components: { BaseModalCard },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    loading: false,
    tableLoading: false,
    editedIndex: -1,
    totalKPI: 0,
    defaultMember: {
      _id: '',
      fullName: '',
      studentId: '',
      role: '',
    },
    editedMember: {
      _id: '',
      fullName: '',
      studentId: '',
      role: '',
    },
    items: [
      {
        text: 'Club Management System',
        disabled: false,
        to: '/',
      },
      {
        text: 'Members',
        disabled: true,
        href: '/',
      },
    ],
    headers: [
      { text: 'Full Name', value: 'fullName' },
      { text: 'Total KPIs', value: 'totalKPIs' },
      { text: 'Student ID', value: 'studentId' },
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
      this.$store.dispatch('member/deleteMember', this.editedMember._id)
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
        await this.$store.dispatch('member/editMember', {
          id: this.editedMember._id,
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
    getColor (kpis) {
      if (kpis < 0) return 'red'
      else return 'green'
    },
  },
}
</script>
