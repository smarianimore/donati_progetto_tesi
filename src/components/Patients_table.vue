<template>
  <div>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-data-table dense
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
import * as generateData from '../assets/js/generate-data.js';
import { bus } from '../main'

let faker = require('faker');
faker.locale = "it";

class Person {
  constructor() {
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    //Range of data chosen based on the previous thesis work
    this.lace = generateData.generateRandomIntegerNumber(10, 80);
    this.charlson = generateData.generateRandomDecimalNumber(1.0, 5.0);
    this.gma = generateData.generateRandomIntegerNumber(1, 4);
    this.barthel = generateData.generateRandomIntegerNumber(20, 100);
    this.asa = generateData.generateRandomStringFromArray(['I','II','III']);
    this.skills = generateData.generateRandomIntegerNumber(0, 2);
    this.retrieval = generateData.generateRandomStringFromArray(['YES', 'NO']);
    this.selfcare = generateData.generateRandomIntegerNumber(0, 2);
    this.dwelling = generateData.generateRandomIntegerNumber(1, 3);
    this.career = generateData.generateRandomIntegerNumber(0, 2);
    //Center in Reggio Emilia, Radius 10km
    this.location = generateData.generateRandomPoint({ 'lat':44.694773, 'lng':10.769152},20000);
    this.phone = faker.phone.phoneNumber();
    this.email = faker.internet.email();
    //For the map recognition
    this.person = true
  }

}

let peopleArray = [];

export default {

  name: "Patients_table",
  props: {peopleArray: peopleArray},
  data () {
    return {
      search: '',
      singleSelect: false,
      selected: [],
      headers: [
        { text: 'Name', value: 'firstName' },
        { text: 'Surname', value: 'lastName' },
        { text: 'LACE', value: 'lace' },
        { text: 'Charlson', value: 'charlson' },
        { text: 'GMA', value: 'gma' },
        { text: 'Barthel', value: 'barthel' },
        { text: 'ASA', value: 'asa' },
        { text: 'Skills', value: 'skills' },
        { text: 'Retrieval', value: 'retrieval' },
        { text: 'Selfcare', value: 'selfcare' },
        { text: 'Dwelling', value: 'dwelling' },
        { text: 'Career', value: 'career' },
      ],
      patients: peopleArray
    }
  },
  created() {
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
      for(i = 0; i < 20; i++){
        let person = new Person();
        peopleArray.unshift(person);
      }
      this.createMarkersOnMap();
    },
    deleteAllData: () => {
      while (peopleArray.length > 0) {
        peopleArray.pop();
      }
    },
    createMarkersOnMap () {
      bus.$emit('createMarkers', peopleArray)
    },
    highlightMarker (data) {
      console.log ('I selezionati sono pari a: ' + this.selected.length)
      bus.$emit('highlightMarker', data)
    }
  }
}
</script>

<style scoped>

</style>