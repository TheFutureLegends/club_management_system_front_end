<template>
  <v-data-table :headers="headers" :items="desserts" :search.sync="search">
    <template v-slot:[`item.name`]="{ item }">
      <div class="subtitle-2">{{ item.name }}</div>
    </template>
    <template v-slot:[`item.kpi`]="{ item }">
      <v-chip :color="getColor(item.kpi)" dark>
        {{ item.kpi }}
      </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Members",

  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "KPI", value: "kpi" },
      { text: "ID Number", value: "idNumber" },
      { text: "Major", value: "major" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [
      {
        name: "Hứa Văn Anh Khoa",
        kpi: 159,
        idNumber: "S3823075",
        major: "IT",
        protein: 4.0,
      },
      {
        name: "Bùi Vũ Thiên An",
        kpi: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
      },
      {
        name: "Trần Khang Duy",
        kpi: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
      },
      {
        name: "Trần Minh Hoàng",
        kpi: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        name: "Nguyễn Phước Duy Trung",
        kpi: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
      },
      {
        name: "Trương Đức Khải",
        kpi: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
      },
      {
        name: "Trần Vũ Thiên Ân",
        kpi: 401,
        fat: 0.2,
        carbs: 98,
        protein: 0,
      },
    ],
  }),
  computed: {
    search: {
      get() {
        return this.$store.state.searchValue
      },
      set(value) {
        this.$store.commit('doSearch', value)
      }
    }
  },
  methods: {
    getColor(kpi) {
      if (kpi > 400) return "green";
      else if (kpi > 200) return "amber";
      else return "red";
    },
  },
};
</script>

