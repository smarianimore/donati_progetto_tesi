<template>
  <div style="height: 800px;">
    <link rel="stylesheet" href="css/leaflet.awesome-markers.css">
    <l-map
        style="height: 80%; width: 100%"
        :zoom="zoom"
        :center="center"
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
import axios from "axios";

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
    changeCoordinates() {
      axios.get('http://localhost:8000/entities/markers/updated').then(response => {
        this.markers = response.data
      });
    },
    createMarkersPatients() {
      axios.get('http://localhost:8000/entities/patients/markers').then(response => {
        this.markers = response.data
        this.center = response.data[0].location
      });
    },
    createMarkersVehicles() {
      axios.get('http://localhost:8000/entities/vehicles/markers').then(response => {
        this.markers = response.data
        this.center = response.data[0].location
      });
    },
    highlightMarkers(dataArray) {
      axios.put('http://localhost:8000/entities/markers/highlight',  { data: dataArray}).catch(error => {
        console.log("Error in highlightMarkers "+error)
      });
     if(dataArray.length == 0){
        this.deselectAllMarkers();
      }
      for(let z = 0; z < this.markers.length; z++){
        this.markers[z].highlighted = false
      }
      for(let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < this.markers.length; j++) {
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
      for(let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < this.markers.length; j++) {
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
    selectCriterion(data) {
      if (data.criterion === 'tertile') {
        switch (data.text) {
          case 'Ergonomics':
            alert('The best criterion for this index is quartile!');
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/tertile/ergonomics').then(response => {
              this.markers = response.data
            });
            break
          case 'Vibrations':
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/tertile/vibrations').then(response => {
              this.markers = response.data
            });
            break
          case 'Fuel':
            this.deselectAllMarkers()
            alert('The best criterion for this index is quartile!')
            axios.get('http://localhost:8000/entities/tertile/fuel').then(response => {
              this.markers = response.data
            });
            break
          case 'Noise':
            this.deselectAllMarkers()
            alert('The best criterion for this index is quartile!')
            axios.get('http://localhost:8000/entities/tertile/noise').then(response => {
              this.markers = response.data
            });
            break
          case 'Lace':
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/tertile/lace').then(response => {
              this.markers = response.data
            });
            break
          case 'Charlston':
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/tertile/charlston').then(response => {
              this.markers = response.data
            });
            break
          case 'ASA':
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/tertile/asa').then(response => {
              this.markers = response.data
            });
            break
          case 'GMA':
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/tertile/gma').then(response => {
              this.markers = response.data
            });
            break
          case 'Barthel':
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/tertile/barthel').then(response => {
              this.markers = response.data
            });
            break
        }
      } else if (data.criterion === 'quartile') {
        switch (data.text) {
          case 'Ergonomics':
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/quartile/ergonomics').then(response => {
              this.markers = response.data
            });
            break
          case 'Vibrations':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get('http://localhost:8000/entities/quartile/vibrations').then(response => {
              this.markers = response.data
            });
            break
          case 'Fuel':
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/quartile/fuel').then(response => {
              this.markers = response.data
            });
            break
          case 'Noise':
            this.deselectAllMarkers()
            axios.get('http://localhost:8000/entities/quartile/noise').then(response => {
              this.markers = response.data
            });
            break
          case 'Lace':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get('http://localhost:8000/entities/quartile/lace').then(response => {
              this.markers = response.data
            });
            break
          case 'Charlston':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get('http://localhost:8000/entities/quartile/charlston').then(response => {
              this.markers = response.data
            });
            break
          case 'ASA':
            this.deselectAllMarkers()
            alert('It is NOT POSSBILE to show this index in quartiles!')
            axios.get('http://localhost:8000/entities/quartile/asa').then(response => {
              this.markers = response.data
            });
            break
          case 'GMA':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get('http://localhost:8000/entities/quartile/gma').then(response => {
              this.markers = response.data
            });
            break
          case 'Barthel':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get('http://localhost:8000/entities/quartile/barthel').then(response => {
              this.markers = response.data
            });
            break
        }
      } else {
        this.deselectAllMarkers()
        axios.get('http://localhost:8000/entities/expression', {params: {criterion: data.criterion}}).then(response => {
          this.markers = response.data
        });
      }
    }
  },
  created() {
    bus.$on('createMarkersPatients', () => {
      this.createMarkersPatients()
    });
    bus.$on('createMarkersVehicles', () => {
      this.createMarkersVehicles()
    });
    bus.$on('highlightMarker', (data) => {
      this.highlightMarkers(data)
    });
    bus.$on('uncheckRadio',() => {
      this.deselectAllMarkers()
      axios.put('http://localhost:8000/entities/markers/deselect');
    });
    bus.$on('selectCriterion',(data) => {
      this.selectCriterion(data[0])
    });
    bus.$on('changeCoordinates',() => {
      this.changeCoordinates()
    });
  },
}

</script>

<style scoped>

</style>