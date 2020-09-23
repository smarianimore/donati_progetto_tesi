<template>
  <div class="home">
    <div class="container-fluid" style="margin-top: 5px">
      <div class="row">
        <div class="col-lg-2 text-center">

        </div>
        <div class="col-lg-7 text-center">
        </div>
        <div class="col-lg-3 text-center">
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3">
          <div class="card">
            <div>
              <button class="list-group-item list-group-item-action toggle-all"
                      data-content="Click to display all hospitals"
                      data-placement="bottom"
                      data-toggle="popover" data-trigger="hover"
                      id="showHospitals"
                      type="button">
                Show Garages
              </button>
              <button class="list-group-item list-group-item-action toggle-all"
                      data-content="Click to display all hospitals"
                      data-placement="bottom"
                      data-toggle="popover" data-trigger="hover"
                      id="hideHospitals"
                      type="button">
                Hide Garages
              </button>
            </div>
            <br>
            <div>
              <button class="list-group-item list-group-item-action toggle-all"
                      data-placement="bottom"
                      data-toggle="popover" data-trigger="hover"
                      id="infoPersona"
                      type="button">
                Vehicle Infos
              </button>
            </div>
            <br>
            <div>
              <li class="list-group-item" style="font-size: 13px; opacity: 0.9;">
                <label><input id="accesoh" type="checkbox" value="true">Show suggested garages<span class="success"></span></label>
              </li>
            </div>
          </div>
        </div>
        <div class="col-sm-9">
          <Map> </Map>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <div>
            <button class="list-group-item list-group-item-action toggle-all"
                    data-content="Click to locate on map the patient(s) selected in the table"
                    data-placement="bottom"
                    data-toggle="popover" data-trigger="hover"
                    id="b"
                    type="button">Locate on map
            </button>
          </div>
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
        <div class="col-sm-9">
          <Vehicles_table></Vehicles_table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "@/components/Map";
import Vehicles_table from "@/components/Vehicles_table";

export default {
name: "Vehicles_left_and_map",
  components: {Vehicles_table, Map}
}
</script>

<style scoped>

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

.sp {
  margin-top: 20px;
}

.imgpatient {
  height: 50px;
}
.infoh{
  background-color:white;
  color:black;
}

/* DO NOT REMOVE, ACTUALLY USED (leaflet)*/
.blinking {
  animation: fade 1s infinite alternate;
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

.list-inline {
  display: flex;
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
  float: none;
}

</style>