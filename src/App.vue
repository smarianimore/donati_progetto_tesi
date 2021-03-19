<template>
  <div id="app">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.18/b-1.5.6/b-colvis-1.5.6/b-flash-1.5.6/b-html5-1.5.6/b-print-1.5.6/sl-1.3.0/datatables.min.css"
          rel="stylesheet"
          type="text/css"/>
    <link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css" rel="stylesheet" type="text/css">
    <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" rel="stylesheet"/>
    <link href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" rel="stylesheet"/>
    <link href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css" rel="stylesheet">
    <link href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" rel="stylesheet"/>
    <template v-for="block in myjson">
      <component :is="block.component" :block="block" :key="block.entity"></component>
    </template>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import myJson from './main';
import router from "@/router";
import axios from "axios";
import { bus } from './main'
import * as constants from "@/assets/js/constants"

export default {
  name: 'App',
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  data: function () {
    return {
      array: [],
      myjson: '',
      myEntity: '',
      myfences: ''
    };
  },
  methods: {
    selectCategory() {
      this.myEntity = myJson.data().myJson.entity;
      this.myfences = myJson.data().myJson.fences;
      axios.get(constants.URL_BACKEND_HEROKU + '/entities', {params: {entity: this.myEntity}}).then(response => {
        this.array = response.data
        router.push('home_page')
      });
      axios.put(constants.URL_BACKEND_HEROKU + '/entities/fences', {data: this.myfences, entity: this.myEntity}).catch(error => {
        console.log("Error in sending fences to server: "+error)
      });
      bus.$emit('changedEntity');
    }
  },
  created() {
    this.myjson = myJson.data().myJson
    this.selectCategory()
    bus.$on('pageCreatedPatients', () => {
      bus.$emit('receivedData', this.array)
    });
    bus.$on('pageCreatedVehicles', () => {
      bus.$emit('receivedData', this.array)
    });
  }
}

</script>

<style>

</style>
