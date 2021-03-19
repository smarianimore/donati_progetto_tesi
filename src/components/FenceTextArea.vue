<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{block.id}}
      </v-card-title>
      <v-card-text>
        {{textResults}}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {bus} from "@/main";
import myJson from '../main';

export default {
  props: {
    block: Object,
  },
  name: "FenceTextArea",
  data: () => ({
    myjsonEntity: '',
    textResults: '',
    fenceResults: [],
    bench: [],
    map: {}
  }),
  created() {
    this.myjsonEntity = myJson.data().myJson.entity;
    let flag = false;
    this.map[this.block.id] = 0;
    bus.$on('fencesResults', (data) => {
      for (let i = 0; i < data.length; i++) {
        if(this.block.id == data[i].id){
          for (let j = 0; j < data[i].results.length; j++) {
            if (!(this.fenceResults.includes(data[i].results[j]))) {
              this.bench.unshift(data[i].results[j]);
              this.fenceResults.unshift(data[i].results[j]);
              let splitting = data[i].results[j].split(':');
              let id = splitting[0];
              let firstField = splitting[1];
              let secondField = splitting[2];
              this.textResults += '' + id + ', ' + firstField + ', ' + secondField + '  |  ';
              this.map[this.block.id] += 1;
              if(this.map[this.block.id] >= 16 && flag == false && this.myjsonEntity == "patients"){
                alert("Epidemic risk area in: " + data[i].id + ", Alert the patients involved!")
                flag = true;
              }
              if(this.map[this.block.id] >= 16 && flag == false && this.myjsonEntity == "vehicles"){
                alert("High traffic area in: " + data[i].id + ", Alert the vehicles involved!")
                flag = true;
              }
              console.log(this.map[data[i].id])
            }
          }
        }
      }
    });
  }
}
</script>

<style scoped>
</style>