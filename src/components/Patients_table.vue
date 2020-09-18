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

export default {

  name: "Patients_table",
  data () {
    return {
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
        { text: 'Name', value: 'name' },
        { text: 'Surname', value: 'surname' },
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
      //patients: ''
    }
  },
  created() {
    this.fillPatientsTable();
  },
  methods: {
    filterOnlyCapsText (value, search) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    fillPatientsTable() {

    }
  },
}
</script>

<style scoped>

</style>