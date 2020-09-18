<template>
  <div class="container-fluid" style="margin-top: 20px;">
    <div class="row">
      <div class="col-sm-3">
      </div>
      <div class="col-sm-9">
        <ul class="list-inline list-group-flush">
          <li class="mw-100 list-group-item" style="text-align: center; background-color: #583470; opacity: 0.8;">
            <b style="color: white;">Risk scores</b>
          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input type="radio" name="risk-scores" :value="LACE" v-model="lace" :id="LACE">LACE<span
                class="success"></span></label>
          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input type="radio"  name="risk-scores" :value="Charlson" v-model="charlson" :id="Charlson">Charlson<span
                class="success"></span></label>
          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input type="radio"  name="risk-scores" :value="GMA" v-model="gma" :id="GMA">GMA<span
                class="success"></span></label>
          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input type="radio"  name="risk-scores" :value="Barthel" v-model="barthel" :id="Barthel">Barthel<span
                class="success"></span></label>
          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input type="radio"  name="risk-scores" :value="ASA" v-model="asa" :id="ASA">ASA<span
                class="success"></span></label>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home_top_second_row",
  props: ['item', 'bus'],
  data: () => ({
    d_selected: '',
    lace: '',
    charlson: '',
    gma: '',
    barthel: '',
    asa: ''
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
      this.lace = null
      this.charlson = null
      this.gma = null
      this.barthel = null
      this.asa = null
      this.d_selected = false
    }
  },
  mounted() {
    this.bus.$on('uncheckRadio', this.uncheckRadio)
  },
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

</style>