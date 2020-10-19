<template>
  <div class="home">
    <div class="container-fluid" style="margin-top: 5px">
      <div class="row">
        <div class="col-lg-2 text-center">
          <img alt="Patients (logo)" class="img-rounded logo" src="../photo/patients.png">
        </div>
      </div>
    </div>
    <div class="Home_top_second_row">
      <template>
        <Home_top_second_row></Home_top_second_row>
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

export default {
  data: () => ({
    item: {},
  }),
  components: {
    Home_top_second_row,
    Home_left_and_map,
  },
  name: "Home_top_first_row",
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

.list-inline li {
  flex: 1;
  text-align: left;
}

</style>