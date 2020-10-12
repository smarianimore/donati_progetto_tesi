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
import * as generateData from '../assets/js/generate-data.js';
import { bus } from '../main'
import * as constant from '../assets/js/constants'

var faker = require('faker');
faker.locale = "it";
faker.seed(123);

class Vehicle {
  constructor() {
    this.id = generateData.generateRandomIntegerNumber(constant.MINIMUM_ID, constant.MAXIMUM_ID)
    this.vehicle = faker.vehicle.vehicle();
    this.manufacturer = faker.vehicle.manufacturer();
    this.model = faker.vehicle.model();
    this.type = faker.vehicle.type();
    this.fuel = faker.vehicle.fuel();
    this.vin = faker.vehicle.vin();
    this.color = faker.vehicle.color();
    this.location = generateData.generateRandomPoint(constant.CENTER_POINT,constant.RADIUS)
  }
}

var vehicleArray = [];

export default {
name: "Vehicles_table",
  data () {
    return {
      vehicleArray: vehicleArray,
      search: '',
      singleSelect: false,
      selected: [],
      headers: [
        { text: 'Vehicle', value: 'vehicle' },
        { text: 'Manufacturer', value: 'manufacturer' },
        { text: 'Model', value: 'model' },
        { text: 'Type', value: 'type' },
        { text: 'Fuel', value: 'fuel' },
        { text: 'Vin', value: 'vin' },
        { text: 'Color', value: 'color' },
      ],
      vehicles: vehicleArray
    }
  },
  created() {
    this.deleteAllData();
    this.generateData();
  },
  methods: {
    filterOnlyCapsText (value, search) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    generateData() {
      var i;
      for(i = 0; i < constant.NUMBER_OF_ITEMS_IN_TABLE; i++){
        let vehicle = new Vehicle();
        vehicleArray.unshift(vehicle);
      }
      this.createMarkersOnMap();
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