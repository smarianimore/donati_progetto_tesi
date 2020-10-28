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
    <router-view/>
  </div>
</template>

<script>
import myJson from './main';
import router from "@/router";

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
      myjson: '',
      mydata: ''
    };
  },
  methods: {
    selectCategory() {
      this.mydata = myJson.data().myJson.entity;
      if(this.mydata === "patients") {
        router.push('home_patients')
      } else if (this.mydata === "vehicles") {
        router.push('home_vehicles')
      }
    }
  },
  created() {
    this.myjson = myJson.data().myJson
    this.selectCategory()
  }
}

</script>

<style>

</style>
