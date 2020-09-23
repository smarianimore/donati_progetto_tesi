<template>
  <div class="config-page">
    <div class="form">
      <form class="config-form">
    <header>
      <h1>Choose a category</h1>
    </header>
    <button v-on:click="showPatients()">Patients</button>
    <button v-on:click="showVehicles()">Vehicles</button>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
name: "ConfigPage",
  methods: {
    showPatients() {
      router.push('home_patients')
    },
    showVehicles() {
      router.push('home_vehicles')
    },
  }
}
</script>

<style scoped>

.config-form > header {
  position: relative;
  width: 100%;
  padding: 10px;
  margin: -10px -10px 25px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #0277bd;
  font-family: 'Roboto', sans-serif;
  font-style: oblique;
  font-size: 1.3rem;
  color: #FAFAFA;
  animation: scale_header 0.6s cubic-bezier(.55, 0, .1, 1), text_opacity 1s cubic-bezier(.55, 0, .1, 1);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
  0px 1px 5px 0px rgba(0, 0, 0, 0.12),
  0px 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.config-form > header:before {
  content: '';
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 5px;
  padding: 8px;
  margin: -10px 0 0 -10px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.156);
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: transparent;
  z-index: 5;
}

h1 {
  color: #ffffff;
}

.config-page {
  width: 100%;
  height: 100%;
  padding: 5%;
//background: #FFF;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.13);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form button {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #0277bd;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
}

.form button:hover.form button:active,.form button:focus {
  background: #257C9E;
}

.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}

.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}

body {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>