<template>
  <div style="height: 600px;">
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
      <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.location" ></l-marker>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
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
    LMarker
  },
  data: function () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [44.694773,10.769152],
      bounds: null,
      markers: []
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
        this.markers.push({
          id: i,
          location: dataArray[i].location
        });
      }
    }
  },
  created() {
    bus.$on('createMarkers', (data) => {
      this.createMarkers(data)
    })
  },
}
</script>

<style scoped>

</style>