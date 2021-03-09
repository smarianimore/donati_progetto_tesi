const func = require("../models/core");
const axios = require('axios');
// eslint-disable-next-line no-unused-vars
const bodyParser = require("body-parser");
const constants = require("../models/constants");

let vehicleArray = [];
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
    vehicleArray = func.generateData("vehicles");
    for(let i = 0; i < vehicleArray.length; i++){
        axios.put(constants.URL_HEROKU + '/receive/entities', { data: vehicleArray[i], entity: 'vehicles'}, {maxContentLength: Infinity,
            maxBodyLength: Infinity}).catch(error => {
            console.log("Error in sending vehicle array to server - " + error)
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
    for (let i = 0; i < vehicleArray.length; i++){
        if(vehicleArray[i].index < vehicleArray[i].coordinates.length -1){
            vehicleArray[i].location.lat = vehicleArray[i].coordinates[vehicleArray[i].index].lat;
            vehicleArray[i].location.lng = vehicleArray[i].coordinates[vehicleArray[i].index].lng;
            vehicleArray[i].index += 1;
        }
        axios.put(constants.URL_HEROKU + '/location', { data: vehicleArray[i], entity: 'vehicles'}, {maxContentLength: Infinity,
            maxBodyLength: Infinity}).catch(error => {
            console.log("Error in sending vehicle location to server - " + error)
        });
    }
}