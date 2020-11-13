<template>
  <div>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-data-table dense
                  v-model="selected"
                  :headers="headers"
                  :items="vehicles"
                  :items-per-page="5"
                  :sort-desc="[false, true]"
                  :single-select="singleSelect"
                  item-key="vehicle"
                  show-select
                  class="elevation-1"
                  :search="search"
                  :custom-filter="filterOnlyCapsText"
                  @current-items="highlightMarker(selected)"
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

var vehicleArray = [];

export default {
name: "Vehicles_table",
  data () {
    return {
      vehicleArray: vehicleArray,
      search: '',
      singleSelect: false,
      selected: [],
      headers: '',
      vehicles: vehicleArray
    }
  },
  created() {
    bus.$on('receivedData', (data) => {
      vehicleArray = data
      this.vehicles = vehicleArray
      this.createMarkersOnMap();
    });
    this.headers = myJson.data().myJson.values;
    this.deleteAllData();
    bus.$emit('pageCreatedVehicles');
  },
  methods: {
    filterOnlyCapsText (value, search) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    deleteAllData: () => {
      while (vehicleArray.length > 0) {
        vehicleArray.pop();
      }
    },
    createMarkersOnMap () {
      bus.$emit('createMarkers', vehicleArray)
    },
    highlightMarker (data) {
      bus.$emit('highlightMarker', data)
    }
  },
}
</script>

<style scoped>

</style>