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

export default {
  props: {
    block: Object,
  },
  name: "FenceTextArea",
  data: () => ({
    fenceResults: [],
    bench: [],
    textResults: ''
  }),
  created() {
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