const func = require("../models/entities");

module.exports = function(app) {
    let peopleArray =  func.generateData("patients");
    let vehicleArray =  func.generateData("vehicles");
    app.get('/entities/patients', (req, res) => {
        //const response = JSON.parse(JSON.stringify(peopleArray));
        res.send(peopleArray);
    });
    app.get('/entities/vehicles', (req, res) => {
        //const response = JSON.parse(JSON.stringify(vehicleArray));
        res.send(vehicleArray);
    });
}