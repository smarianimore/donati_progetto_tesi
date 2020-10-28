<template>
  <div class="container-fluid" style="margin-top: 20px;">
    <div class="row">
      <div class="col-sm-3">
      </div>
      <div class="col-sm-9">
        <div class="btn-group mygroup dropdown">
          <button v-on:click.prevent= "uncheckRadio" class="mw-100 btn btn-default botdrop"
                  data-content="Click to deselect risk score, resetting colouring"
                  data-placement="bottom"
                  data-toggle="popover" data-trigger="hover" id="toggleRisk"
                  type="submit">
            <b>Deselect risk score</b></button>
        </div>
        <ul class="list-inline list-group-flush">
          <li class="mw-100 list-group-item" style="text-align: center; background-color: #583470; opacity: 0.8;">
            <b style="color: white;">Risk scores</b>
          </li>
            <template v-for="block in myjson">
              <component :is="block.component" :block="block" :key="block.text"></component>
            </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from '../main'
import  myJson from '../main';
import IndexButton from "@/components/IndexButton";

export default {
  name: "Home_top_second_row",
  components: {
    IndexButton
  },
  data: () => ({
    myjson: [],
  }),
  created() {
    this.myjson = myJson.data().myJson.indexes
  },
  methods: {
    uncheckRadio: function () {
      bus.$emit('uncheckRadio')
      this.lace = null
      this.charlson = null
      this.gma = null
      this.barthel = null
      this.asa = null
      this.d_selected = false
    }
  }
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
  color: #ffffff;
  background-color: #583470;
  border-color: #ffffff;
  float: none;
}

</style>