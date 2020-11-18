
const gendata = require("../models/generate-data")
const constants = require("../models/constants")

const mozjexl = require('mozjexl');

let faker = require('faker');
faker.locale = "it";
faker.seed(123);

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
        this.person = true
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
        this.location = gendata.generateRandomPoint(constants.CENTER_POINT, constants.RADIUS);
    }
}

var context;

module.exports.generateData = function(entity) {
    if(entity === "patients"){
        let peopleArray = [];
        for(let i = 0; i < constants.NUMBER_OF_ITEMS_IN_TABLE; i++){
            let person = new Person();
            peopleArray.unshift(person);
        }
        context = {
            people: peopleArray
        };
        console.log(context)
        return peopleArray
    }
    if(entity === "vehicles") {
        let vehicleArray = [];
        for (let i = 0; i < constants.NUMBER_OF_ITEMS_IN_TABLE; i++) {
            let vehicle = new Vehicle();
            vehicleArray.unshift(vehicle);
        }
            context = {
            vehicles: vehicleArray
        };
        console.log(context)
        return vehicleArray
    }
}

let markers = []

module.exports.createMarkers = function(dataArray) {
    let markers_created = [];
    for(let i = 0; i < dataArray.length; i++) {
        if(dataArray[i].person){
            markers_created.push({
                id: dataArray[i].id,
                location: dataArray[i].location,
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
    markers = markers_created;
    return markers_created
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

module.exports.resolveExpression = async function (criterion) {
    return await mozjexl.eval(criterion, context).then(function (res) {
        deselectAllMarkers()
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

function deselectAllMarkers() {
    for(let j = 0; j < markers.length; j++){
        markers[j].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR,
            markers[j].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
            markers[j].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
            markers[j].highlighted = false
    }
}