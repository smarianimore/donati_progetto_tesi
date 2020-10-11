<template>
  <div style="height: 600px;">
    <link rel="stylesheet" href="css/leaflet.awesome-markers.css">
    <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    <l-map
        style="height: 80%; width: 100%"
        :zoom="zoom"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.location" :icon="getIcon(item)">
        <l-popup :content="item.informations"></l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';
import L from 'leaflet';
import { bus } from '../main';

export default {
  name: "Map",
  props: {
    peopleArray: {
      type: Array
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data: function () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [44.694773,10.769152],
      bounds: null,
      markers: [],
    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    createMarkers(dataArray) {
      let i;
      for(i = 0; i < dataArray.length; i++) {
        if(dataArray[i].person){
          this.markers.push({
            id: dataArray[i].id,
            location: dataArray[i].location,
            informations: dataArray[i].firstName + ' ' + dataArray[i].lastName + '<br> Phone: ' + dataArray[i].phone +
                '<br> Email: ' + dataArray[i].email,
            color:'#38a938',
            strokeColor:'#157315',
            circleColor:'#ecc9c9',
            highlighted: false
          });
        }else if(dataArray[i].vehicle){
          this.markers.push({
            id: dataArray[i].id,
            location: dataArray[i].location,
            informations: 'Model: ' + dataArray[i].model + '<br> Type: ' + dataArray[i].type + '<br> Color: '
                + dataArray[i].color,
            color:'#38a938',
            strokeColor:'#157315',
            circleColor:'#ecc9c9',
            highlighted: false
          });
        }
      }
    },
    highlightMarkers(dataArray) {
      if(dataArray.length == 0){
        this.deselectAllMarkers();
      }
      for(let z = 0; z < this.markers.length; z++){
        this.markers[z].highlighted = false
      }
      let i;
      let j;
      for(i = 0; i < dataArray.length; i++) {
        for (j = 0; j < this.markers.length; j++) {
          this.center = dataArray[i].location;
          if(this.markers[j].id == dataArray[i].id) {
                this.markers[j].color = '#c11a1a',
                this.markers[j].strokeColor = '#d73534',
                this.markers[j].circleColor = '#590000'
                this.markers[j].highlighted = true
          }
        }
      }
      this.deselectMarkers(dataArray);
    },
    deselectMarkers(dataArray) {
      let i;
      let j;
      for(i = 0; i < dataArray.length; i++) {
        for (j = 0; j < this.markers.length; j++) {
          if(this.markers[j].id != dataArray[i].id && this.markers[j].highlighted == false){
                this.markers[j].color = '#38a938',
                this.markers[j].strokeColor = '#157315',
                this.markers[j].circleColor = '#ecc9c9'
                this.markers[j].highlighted = false
          }
        }
      }
    },
    deselectAllMarkers() {
      for(let j = 0; j < this.markers.length; j++){
            this.markers[j].color = '#38a938',
            this.markers[j].strokeColor = '#157315',
            this.markers[j].circleColor = '#ecc9c9'
            this.markers[j].highlighted = false
      }
    },
    getIcon(item){
      return L.divIcon({
        className: "my-custom-pin",
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 34.892337" height="60" width="40">
  <g transform="translate(-814.59595,-274.38623)">
    <g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
      <path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:${item.color};stroke:${item.strokeColor};"/>
      <circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:${item.circleColor};"/>
    </g>
  </g>
</svg>`
      });
    }
  },
  created() {
    bus.$on('createMarkers', (data) => {
      this.createMarkers(data)
    });
    bus.$on('highlightMarker', (data) => {
      this.highlightMarkers(data)
    });
  },
}
</script>

<style scoped>

.my-custom-pin{
  background-color: transparent;
}

</style>