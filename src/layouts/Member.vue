<template>
  <v-app>
    <SideBar>
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
      <AddMemberDialog />
    </SideBar>
    <v-main class="blue-grey lighten-5">
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar";
import AddMemberDialog from "@/components/AddMemberDialog";

export default {
  components: {
    SideBar,
    AddMemberDialog,
  },
  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.$store.commit("doSearch", value);
      },
    },
  },
};
</script>