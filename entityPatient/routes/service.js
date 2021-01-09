const func = require("../models/core");
const axios = require('axios');
// eslint-disable-next-line no-unused-vars
const bodyParser = require("body-parser");

let patientsArray = [];
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
    patientsArray = func.generateData("patients");
    for(let i = 0; i < patientsArray.length; i++){
        axios.put('http://localhost:8000/receive/entities/patients', { data: patientsArray[i]}, {maxContentLength: Infinity,
            maxBodyLength: Infinity}).catch(error => {
            console.log("Error in sending patient array to server - " + error)
        });
    }
    changeCoordinatesEveryTotSeconds();
}

function changeCoordinatesEveryTotSeconds(){
    setInterval(function(){
        changeCoordinates();
    }, 1500);
}

function changeCoordinates(){
    for (let i = 0; i < patientsArray.length; i++){
        if(patientsArray[i].index < patientsArray[i].coordinates.length -1){
            patientsArray[i].location.lat = patientsArray[i].coordinates[patientsArray[i].index].lat;
            patientsArray[i].location.lng = patientsArray[i].coordinates[patientsArray[i].index].lng;
            patientsArray[i].index += 1;
        }
        axios.put('http://localhost:8000/patients/location', { data: patientsArray[i]}, {maxContentLength: Infinity,
            maxBodyLength: Infinity}).catch(error => {
            console.log("Error in sending patient location to server - " + error)
        });
    }
}