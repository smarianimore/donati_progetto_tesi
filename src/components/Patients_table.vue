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
import * as constant from '../assets/js/constants'
import  myJson from '../main';

let faker = require('faker');
faker.locale = "it";

class Person {
  constructor() {
    this.id = generateData.generateRandomIntegerNumber(constant.MINIMUM_ID, constant.MAXIMUM_ID)
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    //Range of data chosen based on the previous thesis work
    this.lace = generateData.generateRandomIntegerNumber(constant.MIN_LACE, constant.MAX_LACE);
    this.charlson = generateData.generateRandomDecimalNumber(constant.MIN_CHARLSON, constant.MAX_CHARLSON);
    this.gma = generateData.generateRandomIntegerNumber(constant.MIN_GMA, constant.MAX_GMA);
    this.barthel = generateData.generateRandomIntegerNumber(constant.MIN_BARTHEL, constant.MAX_BARTHEL);
    this.asa = generateData.generateRandomStringFromArray(constant.ARRAY_ASA);
    this.skills = generateData.generateRandomIntegerNumber(constant.MIN_SKILLS, constant.MAX_SKILLS);
    this.retrieval = generateData.generateRandomStringFromArray(constant.ARRAY_RETRIEVAL);
    this.selfcare = generateData.generateRandomIntegerNumber(constant.MIN_SELFCARE, constant.MAX_SELFCARE);
    this.dwelling = generateData.generateRandomIntegerNumber(constant.MIN_DWELLING, constant.MAX_DWELLING);
    this.career = generateData.generateRandomIntegerNumber(constant.MIN_CAREER, constant.MAX_CAREER);
    //Center in Reggio Emilia, Radius 10km
    this.location = generateData.generateRandomPoint(constant.CENTER_POINT,constant.RADIUS);
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
      headers: '',
      patients: peopleArray
    }
  },
  created() {
    this.headers = myJson.data().myJson.values;
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
      for(let i = 0; i < constant.NUMBER_OF_ITEMS_IN_TABLE; i++){
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
      bus.$emit('highlightMarker', data)
    },
  }
}
</script>

<style scoped>

</style>