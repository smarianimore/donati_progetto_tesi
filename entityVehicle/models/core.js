const gendata = require("../models/generate-data")
const constants = require("../models/constants")
const fs = require('fs')

let faker = require('faker');
faker.locale = "it";
faker.seed(123);

let array_traces = [...constants.ARRAY_FILE_TRACES];

// eslint-disable-next-line no-unused-vars
var contextVehicles;

class Vehicle {
    constructor() {
        this.id = gendata.generateRandomIntegerNumber(constants.MINIMUM_ID, constants.MAXIMUM_ID)
        this.vehicle = faker.vehicle.vehicle();
        this.manufacturer = faker.vehicle.manufacturer();
        this.model = faker.vehicle.model();
        this.type = faker.vehicle.type();
        this.fuel = faker.vehicle.fuel();
        this.vin = faker.vehicle.vin();
        this.color = faker.vehicle.color();
        this.noise = gendata.generateRandomDecimalNumber(10.0, 100.0);
        this.vibrations = gendata.generateRandomDecimalNumber(0.30, 0.55);
        this.fuel = gendata.generateRandomDecimalNumber(0.0, 100.0);
        this.ergonomics = gendata.generateRandomDecimalNumber(0.0, 100.0);
        // this.location = gendata.generateRandomPoint(constants.CENTER_POINT, constants.RADIUS);
        this.coordinates = readTraceFile();
        this.location = this.coordinates[0];
        this.index = 1;
    }
}

function readTraceFile() {
    try {
        let coordinates = [];
        let trace = array_traces.pop();
        const data = fs.readFileSync(trace, 'UTF-8');

        const lines = data.split(/\r?\n/);

        coordinates.unshift(lines.length);

        lines.forEach((line) => {
            let splitting = line.split(',');
            let latitude = parseFloat(splitting[0]);
            let longitude = parseFloat(splitting[1]);
            let location = {'lat': latitude, 'lng': longitude};
            coordinates.unshift(location);

        });
        array_traces.unshift(trace);
        return coordinates;
    } catch (err) {
        console.error(err);
    }
}

module.exports.generateData = function(entity) {
    if(entity === "vehicles") {
        let vehicleArray = [];
        for (let i = 0; i < constants.ARRAY_FILE_TRACES.length; i++) {
            let vehicle = new Vehicle();
            vehicleArray.unshift(vehicle);
        }
        contextVehicles = {
            vehicles: vehicleArray
        };
        return vehicleArray
    }
}

module.exports.getContext = function() {
    return contextVehicles
}
