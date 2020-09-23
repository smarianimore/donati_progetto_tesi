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
        item-key="name"
        show-select
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
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
var faker = require('faker');
faker.locale = "it";

class Person {
  constructor() {
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
  //  this.phoneNumber = faker.phone.phoneNumber();
  //  this.email = faker.internet.email();
    this.latitude = faker.address.latitude();
    this.longitude = faker.address.longitude();
    this.image = faker.image.image();
  }
}
var peopleArray = [];

export default {

  name: "Patients_table",
  data () {
    return {
      peopleArray: peopleArray,
      search: '',
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'id',
        },
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
        { text: 'Carer', value: 'carer' },
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
    },
    deleteAllData: () => {
      while (peopleArray.length > 0) {
        peopleArray.pop();
      }
    }
  },
}
</script>

<style scoped>

</style>