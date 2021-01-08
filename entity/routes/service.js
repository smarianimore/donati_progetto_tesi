const func = require("../models/core");
const axios = require('axios');
// eslint-disable-next-line no-unused-vars
const bodyParser = require("body-parser");

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
    let vehicleArray = func.generateData("vehicles");
    for(let i = 0; i < vehicleArray.length; i++){
        axios.put('http://localhost:8000/receive/entities/vehicles', { data: vehicleArray[i]}, {maxContentLength: Infinity,
            maxBodyLength: Infinity}).catch(error => {
            console.log("Error in sending vehicle array to server - " + error)
        });
    }


}