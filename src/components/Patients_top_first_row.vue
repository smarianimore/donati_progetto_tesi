<template>
  <div class="home">
    <div class="container-fluid" style="margin-top: 5px">
      <div class="row">
        <div class="col-lg-2 text-center">
          <img alt="Connecare (logo)" class="img-rounded logo" src="../photo/patients.png">
        </div>
        <div class="col-lg-7 text-center">
          <div class="btn-group mygroup dropdown">
            <button v-on:click.prevent= "deselectRiskScore" class="mw-100 btn btn-default botdrop"
                    data-content="Click to deselect risk score, resetting colouring"
                    data-placement="bottom"
                    data-toggle="popover" data-trigger="hover" id="toggleRisk"
                    style="opacity:0.7"
                    type="submit">
              <b>Deselect risk score</b></button>
          </div>
        </div>
        <div class="col-lg-3 text-center">

        </div>
      </div>
    </div>
    <div class="Home_top_second_row">
      <template>
        <Home_top_second_row :item="item" :bus="bus" ref="childRadio"></Home_top_second_row>
      </template>
    </div>
    <div class="Home_left_and_map">
      <Home_left_and_map></Home_left_and_map>
    </div>
  </div>
</template>

<script>
import Home_top_second_row from "@/components/Patients_top_second_row";
import Home_left_and_map from "@/components/Patients_left_and_map";
import { bus } from '../main'

export default {
  data: () => ({
    item: {},
  }),
  components: {
    Home_top_second_row,
    Home_left_and_map,
  },
  name: "Home_top_first_row",
  methods: {
    deselectRiskScore: function () {
      bus.$emit('uncheckRadio')
    }
  }
}
</script>


<style scoped>

td {
  padding: 0 10px 0 10px
}

.logo {
  margin-left: 20px;
  height: 100px;
}

.form-check-label {
  font-weight: normal;
}

.toggle-all {
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  border: 1px solid #563d7c;
  border-radius: 0;
  vertical-align: middle;
}

.botdrop {
  background-color: #563d7c;
  opacity: 0.8;
  display: inline-block;
  padding: 6px 12px;
  color: white;
  margin: 1%;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid #563d7c;
  border-radius: 0;
  height: 40px;
  width: 160px;
}

.botdrop:hover {
  background-color: #563d7c;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 12px;
  color: white;
  font-weight: normal;
  /*line-height: 1.428571429;*/
  text-align: center;
  align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 0;
  /*height: 40px;
  width: 160px;*/
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