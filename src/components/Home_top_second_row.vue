<template>
  <div class="container-fluid" style="margin-top: 20px;">
    <div class="row">
      <div class="col-sm-3">
        <!--<form>
            <div class="input-group">
                <input class="form-control" id="myInput" placeholder="Search patient on map" style="height: 40px;"
                       type="text">
                <div class="input-group-btn">
                    <button class="btn btn-default" id="searchButton" style="height: 40px;">
                        <i class="glyphicon glyphicon-search"></i>
                    </button>
                </div>
            </div>
        </form>-->
      </div>
      <div class="col-sm-9">
        <ul class="list-inline list-group-flush">

          <li class="mw-100 list-group-item" style="text-align: center; background-color: #583470; opacity: 0.8;">
            <b
                style="color: white;">Risk scores</b>

          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input id="lace" name="risk-scores" type="radio">LACE<span
                class="success"></span></label>

          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input id="charlson" name="risk-scores" type="radio">Charlson<span
                class="success"></span></label>

          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input id="gma" name="risk-scores" type="radio">GMA<span
                class="success"></span></label>

          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input id="barthel" name="risk-scores" type="radio">Barthel<span
                class="success"></span></label>

          <li class="mw-100 list-group-item" style="font-size: 13px; opacity: 0.9;">
            <label class="radio-inline"><input id="asa" name="risk-scores" type="radio">ASA<span
                class="success"></span></label>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Home_top_second_row"
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