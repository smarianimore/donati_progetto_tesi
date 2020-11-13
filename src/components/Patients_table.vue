<template>
  <div>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-data-table ref="table" dense
        v-model="selected"
        :headers="headers"
        :items="patients"
        :items-per-page="5"
        :sort-desc="[false, true]"
        :single-select="singleSelect"
        item-key="firstName"
        show-select
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        @current-items ="highlightMarker(selected)"
    >
      <template v-slot:header.name="{ header }">
        {{ header.text.toUpperCase() }}
      </template>
      <template v-slot:top>
        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
      </template>
      <template v-slot:top>
        <v-text-field v-model="search" label="Search (UPPER CASE ONLY)" class="mx-4"></v-text-field>
    </template>
    </v-data-table>
  </div>
</template>


<script>
import { bus } from '../main'
import  myJson from '../main';

let peopleArray = [];

export default {

  name: "Patients_table",
  props: {peopleArray: peopleArray},
  data () {
    return {
      search: '',
      singleSelect: false,
      selected: [],
      headers: '',
      patients: peopleArray
    }
  },
  created() {
    bus.$on('receivedData', (data) => {
      peopleArray = data
      this.patients = peopleArray
      this.createMarkersOnMap();
    });
    this.headers = myJson.data().myJson.values;
    this.deleteAllData();
    bus.$emit('pageCreatedPatients');
  },
  methods: {
    filterOnlyCapsText (value, search) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    deleteAllData: () => {
      while (peopleArray.length > 0) {
        peopleArray.pop();
      }
    },
    createMarkersOnMap () {
      bus.$emit('createMarkersPatients')
    },
    highlightMarker (data) {
      bus.$emit('highlightMarker', data)
    }
  }
}
</script>

<style scoped>

</style>