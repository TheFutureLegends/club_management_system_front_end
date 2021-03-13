<template>
  <div>
    <h3>Dashboard</h3>
    <v-breadcrumbs class="px-0 py-2 mb-4" :items="items"></v-breadcrumbs>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <v-data-table
                :headers="headers"
                :items-per-page="5"
                hide-default-footer
            >
              <template v-slot:top>
                <h4 class="mb-4">Black list</h4>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-data-table
            :headers="headers"
            :items-per-page="5"
            class="elevation-2 pa-4"
            hide-default-footer
        >
          <template v-slot:top>
            <h4 class="mb-4">New members</h4>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: 'Full Name', value: 'fullName' },
      { text: 'Total KPIs', value: 'totalKPIs' },
      { text: 'Student ID', value: 'studentId' },
      { text: 'Role', value: 'role' },
    ],
    items: [
      {
        text: 'Club Management System',
        disabled: true,
        href: '/',
      },
      {
        text: 'Dashboard',
        disabled: true,
        href: '/',
      },
    ],
  }),
}
</script>

