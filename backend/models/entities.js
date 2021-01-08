const gendata = require("../models/generate-data")
const constants = require("../models/constants")
const fs = require('fs')

const mozjexl = require('mozjexl');

let faker = require('faker');
faker.locale = "it";
faker.seed(123);

let array_traces = [...constants.ARRAY_FILE_TRACES]

let vehicleArray = [];

let markers = []

var contextVehicles;
var contextPatients;

class Person {
    constructor() {
        this.id = gendata.generateRandomIntegerNumber(constants.MINIMUM_ID, constants.MAXIMUM_ID)
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        //Range of data chosen based on the previous thesis work
        this.lace = gendata.generateRandomIntegerNumber(constants.MIN_LACE, constants.MAX_LACE);
        this.charlson = gendata.generateRandomDecimalNumber(constants.MIN_CHARLSON, constants.MAX_CHARLSON);
        this.gma = gendata.generateRandomIntegerNumber(constants.MIN_GMA, constants.MAX_GMA);
        this.barthel = gendata.generateRandomIntegerNumber(constants.MIN_BARTHEL, constants.MAX_BARTHEL);
        this.asa = gendata.generateRandomStringFromArray(constants.ARRAY_ASA);
        this.skills = gendata.generateRandomIntegerNumber(constants.MIN_SKILLS, constants.MAX_SKILLS);
        this.retrieval = gendata.generateRandomStringFromArray(constants.ARRAY_RETRIEVAL);
        this.selfcare = gendata.generateRandomIntegerNumber(constants.MIN_SELFCARE, constants.MAX_SELFCARE);
        this.dwelling = gendata.generateRandomIntegerNumber(constants.MIN_DWELLING, constants.MAX_DWELLING);
        this.career = gendata.generateRandomIntegerNumber(constants.MIN_CAREER, constants.MAX_CAREER);
        //Center in Reggio Emilia, Radius 10km
        this.location = gendata.generateRandomPoint(constants.CENTER_POINT, constants.RADIUS);
        this.phone = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        //For the map recognition
        this.person = true;
        this.coordinates = readTraceFile();
        this.location = this.coordinates[0];
        this.index = 1;
    }
}

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
    if(entity === "patients"){
        let peopleArray = [];
        for(let i = 0; i < constants.ARRAY_FILE_TRACES.length; i++){
            let person = new Person();
            peopleArray.unshift(person);
        }
        contextPatients = {
            patients: peopleArray
        };
        return peopleArray
    }
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

module.exports.setVehiclesArray = function (vehicle){
    vehicleArray.unshift(vehicle);
}

module.exports.getVehiclesArray = function (){
    return vehicleArray;
}

module.exports.createMarkersVehicles = function() {
    let markers_created = [];
    for(let i = 0; i < vehicleArray.length; i++) {
        markers_created.push({
            id: vehicleArray[i].id,
            location: vehicleArray[i].location,
            coordinates: vehicleArray[i].coordinates,
            index: vehicleArray[i].index,
            informations: 'Model: ' + vehicleArray[i].model + '<br> Type: ' + vehicleArray[i].type + '<br> Color: '
                + vehicleArray[i].color,
            noise: vehicleArray[i].noise,
            vibrations: vehicleArray[i].vibrations,
            fuel: vehicleArray[i].fuel,
            ergonomics: vehicleArray[i].ergonomics,
            color: constants.MARKER_NOT_HIGHLIGHTED_COLOR,
            strokeColor: constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
            circleColor: constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
            highlighted: false
        });
    }
    markers = [...markers_created];
    changeCoordinatesEveryTotSeconds()
    return markers_created
}

module.exports.createMarkers = function(dataArray) {
    let markers_created = [];
    for(let i = 0; i < dataArray.length; i++) {
        if(dataArray[i].person){
            markers_created.push({
                id: dataArray[i].id,
                location: dataArray[i].location,
                coordinates: dataArray[i].coordinates,
                index: dataArray[i].index,
                informations: dataArray[i].firstName + ' ' + dataArray[i].lastName + '<br> Phone: ' + dataArray[i].phone +
                    '<br> Email: ' + dataArray[i].email,
                lace: dataArray[i].lace,
                charlson: dataArray[i].charlson,
                gma: dataArray[i].gma,
                barthel: dataArray[i].barthel,
                asa: dataArray[i].asa,
                color: constants.MARKER_NOT_HIGHLIGHTED_COLOR,
                strokeColor: constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
                circleColor: constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
                highlighted: false
            });
        }else if(dataArray[i].vehicle){
            markers_created.push({
                id: dataArray[i].id,
                location: dataArray[i].location,
                coordinates: dataArray[i].coordinates,
                index: dataArray[i].index,
                informations: 'Model: ' + dataArray[i].model + '<br> Type: ' + dataArray[i].type + '<br> Color: '
                    + dataArray[i].color,
                noise: dataArray[i].noise,
                vibrations: dataArray[i].vibrations,
                fuel: dataArray[i].fuel,
                ergonomics: dataArray[i].ergonomics,
                color: constants.MARKER_NOT_HIGHLIGHTED_COLOR,
                strokeColor: constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
                circleColor: constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
                highlighted: false
            });
        }
    }
    markers = [...markers_created];
    changeCoordinatesEveryTotSeconds()
    return markers_created
}

function changeCoordinatesEveryTotSeconds(){
    setInterval(function(){
        changeCoordinates();
    }, 500);
}

function changeCoordinates(){
    for (let i = 0; i < markers.length; i++){
       // console.log(markers[i].index);
        if(markers[i].index < markers[i].coordinates.length -1){
            markers[i].location.lat = markers[i].coordinates[markers[i].index].lat;
            markers[i].location.lng = markers[i].coordinates[markers[i].index].lng;
            markers[i].index += 1;
        }
    }
}

module.exports.getUpdatedMarkers = function () {
    return markers
}

module.exports.createIndexColorTertileErgonomics = function() {
    for(let i = 0; i < markers.length; i++) {
        if(markers[i].ergonomics <= constants.TERTILE_LOWER_THRESHOLD){
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else if (markers[i].ergonomics > constants.TERTILE_LOWER_THRESHOLD && markers[i].ergonomics <= constants.TERTILE_MEDIUM_THRESHOLD){
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorTertileVibrations = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].vibrations < constants.VIBRATIONS_LOWER_THRESHOLD) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].vibrations >= constants.VIBRATIONS_LOWER_THRESHOLD && markers[i].vibrations <= constants.VIBRATIONS_HIGHER_THRESHOLD) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorTertileFuel = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].fuel <= constants.TERTILE_LOWER_THRESHOLD) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else if (markers[i].fuel > constants.TERTILE_LOWER_THRESHOLD && markers[i].fuel <= constants.TERTILE_MEDIUM_THRESHOLD) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorTertileNoise = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].noise < constants.NOISE_BOTHER_THRESHOLD) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].noise >= constants.NOISE_BOTHER_THRESHOLD && markers[i].noise < constants.NOISE_DAMAGE_THRESHOLD) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorTertileLace = function() {
    for(let i = 0; i < markers.length; i++) {
        if(markers[i].lace <= (constants.MAX_LACE / 3)){
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].lace > (constants.MAX_LACE / 3) && markers[i].lace <= 2 * (constants.MAX_LACE / 3)) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].lace > 2 * (constants.MAX_LACE / 3) && markers[i].lace <= constants.MAX_LACE) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorTertileCharlston = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].charlson <= (constants.MAX_CHARLSON / 3)) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].charlson > (constants.MAX_CHARLSON / 3) && markers[i].charlson <= 2 * (constants.MAX_CHARLSON / 3)) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].charlson > 2 * (constants.MAX_CHARLSON / 3) && markers[i].charlson <= constants.MAX_CHARLSON) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorTertileASA = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].asa === constants.ASA_II) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].asa === constants.ASA_III) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR;
            markers[i].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorTertileGMA = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].gma >= constants.MIN_GMA && markers[i].gma < constants.MEDIUM_GMA) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].gma == constants.MEDIUM_GMA) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].gma == constants.MAX_GMA) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorTertileBarthel = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].barthel >= constants.MEDIUM_BARTHEL_91 && markers[i].barthel <= constants.MAX_BARTHEL) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].barthel >= constants.MEDIUM_BARTHEL_61 && markers[i].barthel <= constants.MEDIUM_BARTHEL_90) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].barthel <= constants.MEDIUM_BARTHEL_60) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorQuartileErgonomics = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].ergonomics <= constants.ERGONOMICS_LOWER_THRESHOLD) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else if (markers[i].ergonomics > constants.ERGONOMICS_LOWER_THRESHOLD && markers[i].ergonomics <= constants.ERGONOMICS_MEDIUM_THRESHOLD) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].ergonomics > constants.ERGONOMICS_MEDIUM_THRESHOLD && markers[i].ergonomics <= constants.ERGONOMICS_HIGHER_THRESHOLD) {
            markers[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorQuartileVibrations = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].vibrations < constants.QUARTILE_VIBRATIONS_MIDDLE_THRESHOLD) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].vibrations >= constants.QUARTILE_VIBRATIONS_MIDDLE_THRESHOLD && markers[i].vibrations <= constants.VIBRATIONS_LOWER_THRESHOLD) {
            markers[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markers[i].vibrations >= constants.VIBRATIONS_LOWER_THRESHOLD && markers[i].vibrations <= constants.VIBRATIONS_HIGHER_THRESHOLD) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorQuartileFuel = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].fuel <= constants.FUEL_LOWER_THRESHOLD) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else if (markers[i].fuel > constants.FUEL_LOWER_THRESHOLD && markers[i].fuel <= constants.FUEL_MEDIUM_THRESHOLD) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].fuel > constants.FUEL_MEDIUM_THRESHOLD && markers[i].fuel <= constants.FUEL_HIGHER_THRESHOLD) {
            markers[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorQuartileNoise = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].noise < constants.NOISE_BOTHER_THRESHOLD) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].noise >= constants.NOISE_BOTHER_THRESHOLD && markers[i].noise < constants.NOISE_DISTURBANCE_THRESHOLD) {
            markers[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markers[i].noise >= constants.NOISE_DISTURBANCE_THRESHOLD && markers[i].noise < constants.NOISE_DAMAGE_THRESHOLD) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorQuartileLace = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].lace <= (constants.MAX_LACE / 4)) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].lace > (constants.MAX_LACE / 4) && markers[i].lace <= 2 * (constants.MAX_LACE / 4)) {
            markers[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markers[i].lace > 2 * (constants.MAX_LACE / 4) && markers[i].lace <= 3 * (constants.MAX_LACE / 4)) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].lace > 3 * (constants.MAX_LACE / 4) && markers[i].lace <= constants.MAX_LACE) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorQuartileCharlston = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].charlson <= (constants.MAX_CHARLSON / 4)) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].charlson > (constants.MAX_CHARLSON / 4) && markers[i].charlson <= 2 * (constants.MAX_CHARLSON / 4)) {
            markers[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markers[i].charlson > 2 * (constants.MAX_CHARLSON / 4) && markers[i].charlson <= 3 * (constants.MAX_CHARLSON / 4)) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].charlson > 3 * (constants.MAX_CHARLSON / 4) && markers[i].charlson <= constants.MAX_CHARLSON) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorQuartileASA = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].asa === constants.ASA_II) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].asa === constants.ASA_III) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else {
            markers[i].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR;
            markers[i].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorQuartileGMA = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].gma >= constants.MIN_GMA && markers[i].gma < constants.QUARTILE_GMA_MIDDLE_THRESHOLD) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].gma == constants.QUARTILE_GMA_MIDDLE_THRESHOLD) {
            markers[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markers[i].gma == constants.MEDIUM_GMA) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].gma == constants.MAX_GMA) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.createIndexColorQuartileBarthel = function() {
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].barthel >= constants.MEDIUM_BARTHEL_91 && markers[i].barthel <= constants.MAX_BARTHEL) {
            markers[i].color = constants.MARKER_NO_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markers[i].barthel >= constants.MEDIUM_BARTHEL_61 && markers[i].barthel <= constants.MEDIUM_BARTHEL_90) {
            markers[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markers[i].barthel <= constants.MEDIUM_BARTHEL_60 && markers[i].barthel > constants.QUARTILE_BARTHEL_LOWER_THRESHOLD_30) {
            markers[i].color = constants.MARKER_SOME_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markers[i].barthel <= constants.QUARTILE_BARTHEL_LOWER_THRESHOLD_30) {
            markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markers
}

module.exports.resolveExpression = async function (criterion, entity) {
    if(entity == 'patients'){
        return await mozjexl.eval(criterion, contextPatients).then(function (res) {
            module.exports.deselectAllMarkers()
            for (let j = 0; j < res.length; j++) {
                for (let i = 0; i < markers.length; i++) {
                    if (markers[i].id == res[j].id) {
                        markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
                        markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
                        markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
                    }
                }
            }
            return markers;
        });
    }
    if(entity == 'vehicles'){
        return await mozjexl.eval(criterion, contextVehicles).then(function (res) {
            module.exports.deselectAllMarkers()
            for (let j = 0; j < res.length; j++) {
                for (let i = 0; i < markers.length; i++) {
                    if (markers[i].id == res[j].id) {
                        markers[i].color = constants.MARKER_HIGH_RISK_COLOR;
                        markers[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
                        markers[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
                    }
                }
            }
            return markers;
        });
    }
}

module.exports.deselectAllMarkers = function (){
    for(let j = 0; j < markers.length; j++){
        markers[j].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR,
            markers[j].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
            markers[j].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
            markers[j].highlighted = false
    }
}

module.exports.highlightMarkers = function(data){
    if(data.length == 0){
        module.exports.deselectAllMarkers()
    }
    for(let z = 0; z < markers.length; z++){
        markers[z].highlighted = false
    }
    for(let i = 0; i < data.length; i++) {
        for (let j = 0; j < markers.length; j++) {
            if(markers[j].id == data[i].id) {
                markers[j].color = constants.MARKER_HIGHLIGHTED_COLOR,
                    markers[j].strokeColor = constants.MARKER_HIGHLIGHTED_STROKE_COLOR,
                    markers[j].circleColor = constants.MARKER_HIGHLIGHTED_CIRCLE_COLOR,
                    markers[j].highlighted = true
            }
        }
    }
    for(let i = 0; i < data.length; i++) {
        for (let j = 0; j < markers.length; j++) {
            if(markers[j].id != data[i].id && markers[j].highlighted == false){
                markers[j].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR,
                markers[j].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
                markers[j].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR
                markers[j].highlighted = false
            }
        }
    }
}, error => {
    console.log("Error SERVER "+error)
};