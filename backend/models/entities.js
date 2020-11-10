const gendata = require("../models/generate-data")
const constants = require("../models/constants")

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

module.exports.generateData = function(entity) {
    if(entity === "patients"){
        let peopleArray = [];
        for(let i = 0; i < constants.NUMBER_OF_ITEMS_IN_TABLE; i++){
            let person = new Person();
            peopleArray.unshift(person);
        }
        return peopleArray
    }
    if(entity === "vehicles") {
        let vehicleArray = [];
        for (let i = 0; i < constants.NUMBER_OF_ITEMS_IN_TABLE; i++) {
            let vehicle = new Vehicle();
            vehicleArray.unshift(vehicle);
        }
        return vehicleArray
    }
}