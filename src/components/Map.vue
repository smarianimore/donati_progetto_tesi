<template>
  <div style="height: 800px;">
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
import * as constant from '../assets/js/constants'
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
      url: constant.MAP_URL,
      zoom: 12,
      center: constant.CENTER_OF_MAP,
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
            lace: dataArray[i].lace,
            charlson: dataArray[i].charlson,
            gma: dataArray[i].gma,
            barthel: dataArray[i].barthel,
            asa: dataArray[i].asa,
            color: constant.MARKER_NOT_HIGHLIGHTED_COLOR,
            strokeColor: constant.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
            circleColor: constant.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
            highlighted: false
          });
        }else if(dataArray[i].vehicle){
          this.markers.push({
            id: dataArray[i].id,
            location: dataArray[i].location,
            informations: 'Model: ' + dataArray[i].model + '<br> Type: ' + dataArray[i].type + '<br> Color: '
                + dataArray[i].color,
            noise: dataArray[i].noise,
            vibrations: dataArray[i].vibrations,
            color: constant.MARKER_NOT_HIGHLIGHTED_COLOR,
            strokeColor: constant.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
            circleColor: constant.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
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
                this.markers[j].color = constant.MARKER_HIGHLIGHTED_COLOR,
                this.markers[j].strokeColor = constant.MARKER_HIGHLIGHTED_STROKE_COLOR,
                this.markers[j].circleColor = constant.MARKER_HIGHLIGHTED_CIRCLE_COLOR,
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
                this.markers[j].color = constant.MARKER_NOT_HIGHLIGHTED_COLOR,
                this.markers[j].strokeColor = constant.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
                this.markers[j].circleColor = constant.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR
                this.markers[j].highlighted = false
          }
        }
      }
    },
    deselectAllMarkers() {
      for(let j = 0; j < this.markers.length; j++){
            this.markers[j].color = constant.MARKER_NOT_HIGHLIGHTED_COLOR,
            this.markers[j].strokeColor = constant.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
            this.markers[j].circleColor = constant.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
            this.markers[j].highlighted = false
      }
    },
    getIcon(item){
      return L.divIcon({
        className: "my-custom-pin",
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 34.892337" height="60" width="40">
                <g transform="translate(-814.59595,-274.38623)">
                  <g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
                    <path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476
                     1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193
                     0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068
                     2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,
                     -1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655
                      -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:${item.color};stroke:${item.strokeColor};fill-opacity:${item.opacity}"/>
                    <circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:${item.circleColor};"/>
                  </g>
                </g>
              </svg>`
      });
    },
    selectLace() {
      for(let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].lace <= (constant.MAX_LACE / 3)){
          this.markers[i].color = constant.MARKER_NO_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_NO_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].lace > (constant.MAX_LACE / 3) && this.markers[i].lace <= 2 * (constant.MAX_LACE / 3)) {
          this.markers[i].color = constant.MARKER_SOME_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_SOME_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].lace > 2 * (constant.MAX_LACE / 3) && this.markers[i].lace <= constant.MAX_LACE) {
          this.markers[i].color = constant.MARKER_HIGH_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_HIGH_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
      }
    },
    selectCharlson() {
      for(let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].charlson <= (constant.MAX_CHARLSON / 3)){
          this.markers[i].color = constant.MARKER_NO_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_NO_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].charlson > (constant.MAX_CHARLSON / 3) && this.markers[i].charlson <= 2 * (constant.MAX_CHARLSON / 3)) {
          this.markers[i].color = constant.MARKER_SOME_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_SOME_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].charlson > 2 * (constant.MAX_CHARLSON / 3) && this.markers[i].charlson <= constant.MAX_CHARLSON) {
          this.markers[i].color = constant.MARKER_HIGH_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_HIGH_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
      }
    },
    selectGMA() {
      for(let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].gma > constant.MIN_GMA && this.markers[i].gma < constant.MEDIUM_GMA){
          this.markers[i].color = constant.MARKER_NO_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_NO_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].gma == constant.MEDIUM_GMA) {
          this.markers[i].color = constant.MARKER_SOME_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_SOME_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].gma == constant.MAX_GMA) {
          this.markers[i].color = constant.MARKER_HIGH_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_HIGH_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
      }
    },
    selectBarthel() {
      for(let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].barthel >= constant.MEDIUM_BARTHEL_91 && this.markers[i].barthel <= constant.MAX_BARTHEL){
          this.markers[i].color = constant.MARKER_NO_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_NO_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].barthel >= constant.MEDIUM_BARTHEL_61 && this.markers[i].barthel <= constant.MEDIUM_BARTHEL_90) {
          this.markers[i].color = constant.MARKER_SOME_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_SOME_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].barthel <= constant.MEDIUM_BARTHEL_60) {
          this.markers[i].color = constant.MARKER_HIGH_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_HIGH_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
      }
    },
    selectASA() {
      for(let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].asa === constant.ASA_II){
          this.markers[i].color = constant.MARKER_NO_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_NO_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].asa === constant.ASA_III) {
          this.markers[i].color = constant.MARKER_HIGH_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_HIGH_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else {
          this.markers[i].color = constant.MARKER_NOT_HIGHLIGHTED_COLOR;
          this.markers[i].strokeColor = constant.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR;
        }
      }
    },
    selectNoise() {
      for(let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].noise < constant.NOISE_BOTHER_THRESHOLD){
          this.markers[i].color = constant.MARKER_NO_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_NO_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].noise >= constant.NOISE_BOTHER_THRESHOLD && this.markers[i].noise < constant.NOISE_DISTURBANCE_THRESHOLD){
          this.markers[i].color = constant.MARKER_LITTLE_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_LITTLE_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].noise >= constant.NOISE_DISTURBANCE_THRESHOLD && this.markers[i].noise < constant.NOISE_DAMAGE_THRESHOLD){
          this.markers[i].color = constant.MARKER_SOME_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_SOME_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
          this.markers[i].color = constant.MARKER_HIGH_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_HIGH_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
      }
    },
    selectVibrations() {
      for(let i = 0; i < this.markers.length; i++) {
        if(this.markers[i].vibrations < constant.VIBRATIONS_LOWER_THRESHOLD){
          this.markers[i].color = constant.MARKER_NO_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_NO_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (this.markers[i].vibrations >= constant.VIBRATIONS_LOWER_THRESHOLD && this.markers[i].vibrations <= constant.VIBRATIONS_HIGHER_THRESHOLD){
          this.markers[i].color = constant.MARKER_SOME_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_SOME_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
          this.markers[i].color = constant.MARKER_HIGH_RISK_COLOR;
          this.markers[i].strokeColor = constant.MARKER_HIGH_RISK_STROKE_COLOR;
          this.markers[i].circleColor = constant.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
      }
    }
  },
  created() {
    bus.$on('createMarkers', (data) => {
      this.createMarkers(data)
    });
    bus.$on('highlightMarker', (data) => {
      this.highlightMarkers(data)
    });
    bus.$on('selectLace',() => {
      this.selectLace()
    });
    bus.$on('selectCharlson',() => {
      this.selectCharlson()
    });
    bus.$on('selectGMA',() => {
      this.selectGMA()
    });
    bus.$on('selectBarthel',() => {
      this.selectBarthel()
    });
    bus.$on('selectASA',() => {
      this.selectASA()
    });
    bus.$on('uncheckRadio',() => {
      this.deselectAllMarkers()
    });
    bus.$on('selectNoise',() => {
      this.selectNoise()
    });
    bus.$on('selectVibrations',() => {
      this.selectVibrations()
    });
  },
}
</script>

<style scoped>

.my-custom-pin{
  background-color: transparent;
}

</style>