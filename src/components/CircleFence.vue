<template>
  <l-circle
      :lat-lng="circle.center"
      :radius="circle.radius"
      :color="circle.color"
  />
</template>

<script>
import {LCircle} from 'vue2-leaflet';

export default {
  name: "CircleFence",
  props: {
    block: Object,
  },
  components: {
    LCircle
  },
  data() {
    return {
      circle: {
        center: [this.block.lat, this.block.lng],
        radius: this.block.radius,
        color: 'red'
      }
    };
  }
}
</script>

<style scoped>
</style>