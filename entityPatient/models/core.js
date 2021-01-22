const gendata = require("../models/generate-data")
const constants = require("../models/constants")
const fs = require('fs')

let faker = require('faker');
faker.locale = "ja";
faker.seed(123);

let array_traces = [...constants.ARRAY_FILE_TRACES];

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
       // this.location = gendata.generateRandomPoint(constants.CENTER_POINT, constants.RADIUS);
        this.phone = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        //For the map recognition
        this.person = true;
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
        return peopleArray
    }
}