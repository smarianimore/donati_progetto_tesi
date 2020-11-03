<template>
  <div class="home">
    <div class="container-fluid" style="margin-top: 5px">
      <div class="row">
        <div class="col-lg-2 text-center" v-if="myjson.entity === 'vehicles'">
          <img alt="Vehicles (logo)" class="img-rounded logo" src="../photo/vehicles.jpg">
        </div>
        <div class="col-lg-2 text-center" v-if="myjson.entity === 'patients'">
          <img alt="Patients (logo)" class="img-rounded logo" src="../photo/patients.png">
        </div>
        <div class="col-lg-7 text-center">
        </div>
        <div class="col-lg-3 text-center">
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row2">
        <div class="col-sm-3">
          <div class="card">
            <div v-if="myjson.entity === 'vehicles'">
              <button class="list-group-item list-group-item-action toggle-all"
                      data-content="Click to display all garages"
                      data-placement="bottom"
                      data-toggle="popover" data-trigger="hover"
                      id="showGarages"
                      type="button">
                Show Garages
              </button>
              <button class="list-group-item list-group-item-action toggle-all"
                      data-content="Click to display all garages"
                      data-placement="bottom"
                      data-toggle="popover" data-trigger="hover"
                      id="hideGarages"
                      type="button">
                Hide Garages
              </button>
            </div>
            <div v-if="myjson.entity === 'patients'">
              <button class="list-group-item list-group-item-action toggle-all"
                      data-content="Click to display all hospitals"
                      data-placement="bottom"
                      data-toggle="popover" data-trigger="hover"
                      id="showHospitals"
                      type="button">
                Show Hospitals
              </button>
              <button class="list-group-item list-group-item-action toggle-all"
                      data-content="Click to hide all hospitals"
                      data-placement="bottom"
                      data-toggle="popover" data-trigger="hover"
                      id="hideHospitals"
                      type="button">
                Hide Hospitals
              </button>
            </div>
            <br>
            <div>
              <li class="mw-100 list-group-item" style="text-align: center; background-color: #583470; opacity: 0.8;">
                <b style="color: white;">Risk scores</b>
              </li>
              <div class="btn-group mygroup dropdown">
                <button v-on:click.prevent= "deselectRiskScore" class="mw-100 btn btn-default botdrop"
                        data-content="Click to deselect risk score, resetting colouring"
                        data-placement="bottom"
                        data-toggle="popover" data-trigger="hover" id="toggleRisk"
                        type="submit">
                  <b>Deselect risk score</b>
                </button>
              </div>
            </div>
            <div>
              <template v-for="block in myjson_indexes">
                <component :is="block.component" :block="block" :key="block.text"></component>
              </template>
            </div>
            <br>
            <br>
            <!-- Keep map and table synchronised: <input id="myCheck" onclick="syncMapTable()" type="checkbox"> -->
            <div>
              <li class="list-group-item" style="height: 40px; font-size: 13px; opacity: 0.9;">
                <label><input id="myCheck" onclick="syncMapTable()" type="checkbox"> Keep map
                  and table synchronised<span class="success"></span></label>
              </li>
            </div>
            <div>
              <button class="list-group-item list-group-item-action toggle-all"
                      data-content="Click to display a route visiting all the patient(s) selected in the table (in a circular path"
                      data-placement="bottom"
                      data-toggle="popover" data-trigger="hover"
                      id="bRouting"
                      type="button">
                Calculate route
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-9">
          <Map> </Map>
        </div>
      </div>
      <div class="row3">
        <div class="col-sm-3">
        </div>
        <div class="col-sm-9" v-if="myjson.entity === 'vehicles'">
          <Vehicles_table></Vehicles_table>
        </div>
        <div class="col-sm-9" v-if="myjson.entity === 'patients'">
          <Patients_table></Patients_table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "@/components/Map";
import Vehicles_table from "@/components/Vehicles_table";
import Patients_table from "@/components/Patients_table";
import { bus } from '../main'
import  myJson from '../main';
import IndexButton from "@/components/IndexButton";

export default {
name: "Page",
  components: {Vehicles_table, Map, Patients_table, IndexButton},
  data () {
    return {
      myjson: '',
      myjson_indexes: [],
    }
  },
  created() {
    this.myjson = myJson.data().myJson;
    this.myjson_indexes = myJson.data().myJson.indexes;
  },
  methods: {
    deselectRiskScore: function () {
      bus.$emit('uncheckRadio')
    }
  }
}
</script>

<style scoped>

.row {
  background-image: url("../assets/profile-background-motive.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

td {
  padding: 0 10px 0 10px
}

.toggle-all {
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  border: 1px solid #563d7c;
  border-radius: 0;
  vertical-align: middle;
}

thead th {
  background-color: rgba(86, 61, 124, 0.8);
  color: white;
}

@keyframes fade {
  from {
    opacity: 0;
  }
}

@keyframes check {
  0% {
    height: 0;
    width: 0;
  }
  25% {
    height: 0;
    width: 20px;
  }
  50% {
    height: 40px;
    width: 10px;
  }
}

.logo {
  margin-left: 20px;
  height: 100px;
}

.list-inline li {
  flex: 1;
  text-align: left;
}

.btn.btn-warning {
  color: #ffffff;
  background-color: #583470;
  border-color: #ffffff;
}

.btn-group.mygroup {
  white-space: nowrap;
}

.btn.btn-default {
  color: #ffffff;
  background-color: #583470;
  border-color: #ffffff;
  float: none;
}

</style>
