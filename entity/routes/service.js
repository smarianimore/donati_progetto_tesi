const func = require("../models/core");
const axios = require('axios');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
    let vehicleArray = func.generateData("vehicles");
    axios.put('http://localhost:8000/receive/entities/vehicles', { data: vehicleArray}).catch(error => {
        console.log("Error in sending vehicle array to server: "+error)
    });

}