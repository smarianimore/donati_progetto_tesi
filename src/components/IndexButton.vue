<template>
  <div>
    <li class="mw-100 list-group-item" v-if="block.text === 'Lace'" style="font-size: 13px; opacity: 0.9;">
      <label class="radio-inline"><input type="radio" name="risk-scores" :value="LACE" v-on:click="selectLace" v-model="lace" :id="LACE" >{{ block.text }}<span
          class="success"></span></label>
    <li class="mw-100 list-group-item" v-if="block.text === 'Charlston'" style="font-size: 13px; opacity: 0.9;">
      <label class="radio-inline"><input type="radio"  name="risk-scores" :value="Charlson" v-on:click="selectCharlson" v-model="charlson" :id="Charlson">{{ block.text }}<span
          class="success"></span></label>
    <li class="mw-100 list-group-item" v-if="block.text === 'ASA'" style="font-size: 13px; opacity: 0.9;">
      <label class="radio-inline"><input type="radio"  name="risk-scores" :value="ASA" v-on:click="selectASA" v-model="asa" :id="ASA">{{ block.text }}<span
          class="success"></span></label>
    <li class="mw-100 list-group-item" v-if="block.text === 'Barthel'" style="font-size: 13px; opacity: 0.9;">
      <label class="radio-inline"><input type="radio"  name="risk-scores" :value="Barthel"  v-on:click="selectBarthel" v-model="barthel" :id="Barthel">{{ block.text }}<span
          class="success"></span></label>
    <li class="mw-100 list-group-item" v-if="block.text === 'GMA'" style="font-size: 13px; opacity: 0.9;">
      <label class="radio-inline"><input type="radio"  name="risk-scores" :value="GMA"  v-on:click="selectGMA" v-model="gma" :id="GMA">{{ block.text }}<span
          class="success"></span></label>
    <li class="list-group-item" v-if="block.text === 'Noise'" style="font-size: 13px; opacity: 0.9;">
      <label><input type="radio" name="risk-scores" :value="Noise" v-on:click="selectNoise"
                    v-model="noise" :id="Noise"> {{ block.text }} <span class="success"></span></label>
    <li class="list-group-item" v-if="block.text === 'Vibrations'" style="font-size: 13px; opacity: 0.9;">
      <label><input type="radio" name="risk-scores" :value="Vibrations" v-on:click="selectVibrations"
                    v-model="vibrations" :id="Vibrations"> {{ block.text }} <span class="success"></span></label>
    <li class="list-group-item" v-if="block.text === 'Fuel'" style="font-size: 13px; opacity: 0.9;">
      <label><input type="radio" name="risk-scores" :value="Fuel" v-on:click="selectFuel"
                    v-model="fuel" :id="Fuel"> {{ block.text }} <span class="success"></span></label>
    <li class="list-group-item" v-if="block.text === 'Ergonomics'" style="font-size: 13px; opacity: 0.9;">
      <label><input type="radio" name="risk-scores" :value="Ergonomics" v-on:click="selectCriterion"
                    v-model="ergonomics" :id="Ergonomics"> {{ block.text }} <span class="success"></span></label>
    </li>
  </div>
</template>

<script>
import {bus} from "@/main";


export default {
  props: {
    block: Object,

  },
  name: "IndexButton",
  data: () => ({
    d_selected: '',
    lace: '',
    charlson: '',
    gma: '',
    barthel: '',
    asa: '',
    noise: '',
    vibrations: '',
    fuel: '',
    ergonomics: ''
  }),
  computed: {
    selected: {
      get() {
        return this.d_selected;
      },
      set(v) {
        if (v === this.d_selected) {
          this.d_selected = false;
        } else {
          this.d_selected = v;
        }
      }
    }
  },
  methods: {
    uncheckRadio: function () {
      bus.$emit('uncheckRadio')
      this.d_selected = false
      this.lace = null
      this.charlson = null
      this.gma = null
      this.barthel = null
      this.asa = null
      this.noise = null
      this.vibrations = null
      this.fuel = null
      this.ergonomics = null
    },
    selectCriterion: function () {
      let data = [{text: this.block.text, criterion: this.block.criterion }]
      bus.$emit('selectCriterion', data)
    },
    selectLace: function () {
      bus.$emit('selectLace')
    },
    selectCharlson: function () {
      bus.$emit('selectCharlson')
    },
    selectGMA: function () {
      bus.$emit('selectGMA')
    },
    selectBarthel: function () {
      bus.$emit('selectBarthel')
    },
    selectASA: function () {
      bus.$emit('selectASA')
    },
    selectNoise: function () {
      bus.$emit('selectNoise')
    },
    selectVibrations: function () {
      bus.$emit('selectVibrations')
    },
    selectFuel: function () {
      bus.$emit('selectFuel')
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