<template>
  <div style="height: 800px;">
    <link rel="stylesheet" href="css/leaflet.awesome-markers.css">
    <l-map
        style="height: 80%; width: 100%"
        :zoom="zoom"
        @click="addMarker"
        :center="center"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <template v-for="block in myjson_fences">
        <component :is="block.circle" :block="block" :key="block.id"></component>
      </template>
      <l-marker v-for="item in markers" :key="item.id" :lat-lng="item.location" :icon="getIcon(item)">
        <l-popup :content="item.totalinfo"></l-popup>
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
import  myJson from '../main';
import H from '@here/maps-api-for-javascript';
import CircleFence from "@/components/CircleFence";

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
    CircleFence
  },
  data: function () {
    return {
      url: constant.MAP_URL,
      zoom: 12,
      center: [],
      bounds: null,
      markers: [],
      entity: '',
      fencesResults: '',
      myjson_fences: [],
      apiKey: constant.APIKEY
    };
  },
  methods: {
    testLoadBand(start){
      let millis = Date.now() - start;
      console.log('milliseconds elapsed ' + millis)
    },
    addMarker(event) {
      console.log(event.latlng)
      //this.markers.push(event.latlng);
    },
    changeCoordinates() {
     // let start = Date.now();
      axios.get(constant.URL_BACKEND + '/entities/markers/updated', {params: {entity: this.entity}}).then(response => {
      //  this.testLoadBand(start);  //method for testing band load;
        this.markers = response.data.markers;
        this.reverseGeocoding();
        this.fencesResults = response.data.fences;
        this.checkFences(this.fencesResults);
      });
    },
    checkFences(results){
      bus.$emit('fencesResults', results)
    },
    createMarkersPatients() {
      axios.get(constant.URL_BACKEND + '/entities/patients/markers').then(response => {
        this.markers = response.data
        this.reverseGeocoding();
      });
    },
    createMarkersVehicles() {
      axios.get(constant.URL_BACKEND + '/entities/vehicles/markers').then(response => {
        this.markers = response.data
        this.reverseGeocoding();
      });
    },
    reverseGeocoding() {
      var platform = new H.service.Platform({
        apikey: [this.apiKey]
      });
      var service = platform.getSearchService();
      for (let i = 0; i < this.markers.length; i++) {
        service.reverseGeocode({
          at: '' + this.markers[i].location.lat + ',' + this.markers[i].location.lng + ',150'
        }, (result) => {
          result.items.forEach((item) => {
            axios.put(constant.URL_BACKEND + '/entities/markers/address', {id: this.markers[i].id, address: item.address.label, entity: this.entity});
          });
        });
      }
    },
    highlightMarkers(dataArray) {
      axios.put( constant.URL_BACKEND + '/entities/markers/highlight',  { data: dataArray, entity: this.entity}).catch(error => {
        console.log("Error in highlightMarkers: "+error)
      });
     if(dataArray.length == 0){
        this.deselectAllMarkers();
      }
      for(let z = 0; z < this.markers.length; z++){
        this.markers[z].highlighted = false
      }
      for(let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < this.markers.length; j++) {
          //this.center = dataArray[i].location;
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
            axios.get(constant.URL_BACKEND + '/entities/tertile/ergonomics').then(response => {
              this.markers = response.data
            });
            break
          case 'Vibrations':
            this.deselectAllMarkers()
            axios.get(constant.URL_BACKEND + '/entities/tertile/vibrations').then(response => {
              this.markers = response.data
            });
            break
          case 'Fuel':
            this.deselectAllMarkers()
            alert('The best criterion for this index is quartile!')
            axios.get(constant.URL_BACKEND + '/entities/tertile/fuel').then(response => {
              this.markers = response.data
            });
            break
          case 'Noise':
            this.deselectAllMarkers()
            alert('The best criterion for this index is quartile!')
            axios.get(constant.URL_BACKEND + '/entities/tertile/noise').then(response => {
              this.markers = response.data
            });
            break
          case 'Lace':
            this.deselectAllMarkers()
            axios.get(constant.URL_BACKEND + '/entities/tertile/lace').then(response => {
              this.markers = response.data
            });
            break
          case 'Charlston':
            this.deselectAllMarkers()
            axios.get(constant.URL_BACKEND + '/entities/tertile/charlston').then(response => {
              this.markers = response.data
            });
            break
          case 'ASA':
            this.deselectAllMarkers()
            axios.get(constant.URL_BACKEND + '/entities/tertile/asa').then(response => {
              this.markers = response.data
            });
            break
          case 'GMA':
            this.deselectAllMarkers()
            axios.get(constant.URL_BACKEND + '/entities/tertile/gma').then(response => {
              this.markers = response.data
            });
            break
          case 'Barthel':
            this.deselectAllMarkers()
            axios.get(constant.URL_BACKEND + '/entities/tertile/barthel').then(response => {
              this.markers = response.data
            });
            break
        }
      } else if (data.criterion === 'quartile') {
        switch (data.text) {
          case 'Ergonomics':
            this.deselectAllMarkers()
            axios.get(constant.URL_BACKEND + '/entities/quartile/ergonomics').then(response => {
              this.markers = response.data
            });
            break
          case 'Vibrations':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get(constant.URL_BACKEND + '/entities/quartile/vibrations').then(response => {
              this.markers = response.data
            });
            break
          case 'Fuel':
            this.deselectAllMarkers()
            axios.get(constant.URL_BACKEND + '/entities/quartile/fuel').then(response => {
              this.markers = response.data
            });
            break
          case 'Noise':
            this.deselectAllMarkers()
            axios.get(constant.URL_BACKEND + '/entities/quartile/noise').then(response => {
              this.markers = response.data
            });
            break
          case 'Lace':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get(constant.URL_BACKEND + '/entities/quartile/lace').then(response => {
              this.markers = response.data
            });
            break
          case 'Charlston':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get(constant.URL_BACKEND + '/entities/quartile/charlston').then(response => {
              this.markers = response.data
            });
            break
          case 'ASA':
            this.deselectAllMarkers()
            alert('It is NOT POSSBILE to show this index in quartiles!')
            axios.get(constant.URL_BACKEND + '/entities/quartile/asa').then(response => {
              this.markers = response.data
            });
            break
          case 'GMA':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get(constant.URL_BACKEND + '/entities/quartile/gma').then(response => {
              this.markers = response.data
            });
            break
          case 'Barthel':
            this.deselectAllMarkers()
            alert('The best criterion for this index is tertile!')
            axios.get(constant.URL_BACKEND + '/entities/quartile/barthel').then(response => {
              this.markers = response.data
            });
            break
        }
      } else {
        this.deselectAllMarkers()
        axios.get(constant.URL_BACKEND + '/entities/expression', {params: {criterion: data.criterion, entity: this.entity}}).then(response => {
          this.markers = response.data
        });
      }
    }
  },
  created() {
    this.center = myJson.data().myJson.center;
    this.entity = myJson.data().myJson.entity;
    this.myjson_fences = myJson.data().myJson.fences;
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
      console.log(this.entity)
      axios.put(constant.URL_BACKEND + '/entities/markers/deselect', {entity: this.entity}).catch(error => {
        console.log("Error in deselectMarkers: "+error)
      });
    });
    bus.$on('selectCriterion',(data) => {
      this.selectCriterion(data[0])
    });
    bus.$on('changeCoordinates',() => {
      this.changeCoordinates()
    });
    bus.$on('changedEntity', () => {
      this.entity = myJson.data().myJson.entity;
    });
  },
}

</script>

<style scoped>

</style>