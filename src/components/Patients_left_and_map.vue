<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3">
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" id="ciao"
                style="text-align: center; height: 40px; background-color: #583470; opacity: 0.8;"><b
                style="color: white;">Barriers</b>
            <li class="list-group-item" style="height: 40px; font-size: 13px; opacity: 0.9;">
              <label class="checkbox-inline"><input id="skills" type="checkbox">Skills to carry out
                treatment<span class="success"></span></label>
            <li class="list-group-item" style="height: 40px; font-size: 13px; opacity: 0.9;">
              <label class="checkbox-inline"><input id="retrieval" type="checkbox">Retrieval of
                tablets from pharmacy<span
                    class="success"></span></label>
            <li class="list-group-item" style="height: 40px; font-size: 13px; opacity: 0.9;">
              <label class="checkbox-inline"><input type="checkbox" id="selfcare">Selfcare skills<span
                  class="success"></span></label>
            <li class="list-group-item" style="height: 40px; font-size: 13px; opacity: 0.9;">
              <label class="checkbox-inline"><input id="dwelling" type="checkbox">Dwelling<span
                  class="success"></span></label>
            <li class="list-group-item" style="height: 40px; font-size: 13px; opacity: 0.9;">
              <label class="checkbox-inline"><input id="carer" type="checkbox">Carer skills<span
                  class="success"></span></label>
            <li class="list-group-item">
              <button class="list-group-item list-group-item-action toggle-all"
                      data-content="Click to check or uncheck all the barriers above" data-placement="bottom"
                      data-toggle="popover" data-trigger="hover"
                      id="checkAll"
                      type="button">Toggle ALL
                barriers
              </button>
            </li>
          </ul>
          <div>
            <button class="list-group-item list-group-item-action toggle-all"
                    data-content="Click to display all hospitals"
                    data-placement="bottom"
                    data-toggle="popover" data-trigger="hover"
                    id="showHospitals"
                    type="button">
              Show Hospitals
            </button>
            <button class="list-group-item list-group-item-action toggle-all"
                    data-content="Click to display all hospitals"
                    data-placement="bottom"
                    data-toggle="popover" data-trigger="hover"
                    id="hideHospitals"
                    type="button">
              Hide Hospitals
            </button>
          </div>
          <br>
          <div>
            <button class="list-group-item list-group-item-action toggle-all"
                    data-placement="bottom"
                    data-toggle="popover" data-trigger="hover"
                    id="infoPersona"
                    type="button">
              Info Persona
            </button>
          </div>
          <br>
          <div>
            <li class="list-group-item" style="height: 60px; font-size: 13px; opacity: 0.9;">
              <label><input id="acceso" type="checkbox" value="true">Show the patients' managers
                on the map<span class="success"></span></label>
            </li>
          </div>
          <br>
          <div>
            <li class="list-group-item" style="font-size: 13px; opacity: 0.9;">
              <label><input id="accesoh" type="checkbox" value="true">Show suggested hospitals<span class="success"></span></label>
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
        <Patients_table></Patients_table>
      </div>
    </div>
  </div>
</template>

<script>
import Map from "@/components/Map";
import Patients_table from "@/components/Patients_table";

export default {
name: "Home_left_and_map",
  components: {Patients_table, Map}
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