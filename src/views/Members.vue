<template>
  <div>
    <base-header>
      <v-text-field
        flat
        dense
        background-color="blue-grey lighten-5"
        prepend-inner-icon="mdi-magnify"
        label="Search name"
        hide-details
        solo
        clearable
        v-model="search"
        class="ml-10"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            rounded
            depressed
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="pr-2"> mdi-plus </v-icon> Add Member
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="title"> {{ formTitle }} </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedMember.fullname"
                  label="Full Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="editedMember.studentId"
                  label="ID Number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  v-model="editedMember.role"
                  label="Role"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="close"> Cancel </v-btn>
            <v-btn color="primary" @click="save"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" width="500px">
        <v-card>
          <v-card-title class="title"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="primary" @click="deleteMemberConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </base-header>

    <v-data-table
      class="elevation-2"
      :headers="headers"
      :items="members"
      :search.sync="search"
    >
      <template v-slot:[`item.fullname`]="{ item }">
        <div class="subtitle-2">{{ item.fullname }}</div>
      </template>
      <template v-slot:[`item.totalKPI`]="{ item }">
        <v-chip :color="getKpiColor(item.totalKPI)" dark>
          {{ item.totalKPI }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editMember(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteMember(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader'

export default {
  name: 'Members',
  components: {
    BaseHeader,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    members: [],
    editedIndex: -1,
    defaultMember: {
      fullname: '',
      studentId: '',
      role: '',
    },
    editedMember: {
      fullname: '',
      studentId: '',
      role: '',
    },
    headers: [
      { text: 'Full Name', value: 'fullname' },
      { text: 'Total KPI', value: 'totalKPI' },
      { text: 'Student ID', value: 'studentId' },
      { text: 'Role', value: 'role' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add New Member' : 'Edit Member'
    },
  },
  created() {
    this.getMembers()
  },
  methods: {
    getKpiColor(kpi) {
      if (kpi > 400) return 'green'
      else if (kpi > 100) return 'amber'
      else return 'red'
    },
    async getMembers() {
      const { data } = await this.$axios.get('/members')
      this.members = data
    },
    editMember(member) {
      this.editedIndex = this.members.indexOf(member)
      this.editedMember = Object.assign({}, member)
      this.dialog = true
    },
    deleteMember(member) {
      this.editedIndex = this.members.indexOf(member)
      this.editedItem = Object.assign({}, member)
      this.dialogDelete = true
    },
    deleteMemberConfirm() {
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
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.members[this.editedIndex], this.editedMember)
      } else {
        this.members.push(this.editedMember)
      }
      this.close()
    },
  },
}
</script>
