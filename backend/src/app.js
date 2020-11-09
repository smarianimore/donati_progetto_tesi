import * as generateData from '../assets/js/generate-data.js';
import * as constant from '../assets/js/constants'

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

require('../routes/service')(app);

let faker = require('faker');
faker.locale = "it";

class Person {
    constructor() {
        this.id = generateData.generateRandomIntegerNumber(constant.MINIMUM_ID, constant.MAXIMUM_ID)
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        //Range of data chosen based on the previous thesis work
        this.lace = generateData.generateRandomIntegerNumber(constant.MIN_LACE, constant.MAX_LACE);
        this.charlson = generateData.generateRandomDecimalNumber(constant.MIN_CHARLSON, constant.MAX_CHARLSON);
        this.gma = generateData.generateRandomIntegerNumber(constant.MIN_GMA, constant.MAX_GMA);
        this.barthel = generateData.generateRandomIntegerNumber(constant.MIN_BARTHEL, constant.MAX_BARTHEL);
        this.asa = generateData.generateRandomStringFromArray(constant.ARRAY_ASA);
        this.skills = generateData.generateRandomIntegerNumber(constant.MIN_SKILLS, constant.MAX_SKILLS);
        this.retrieval = generateData.generateRandomStringFromArray(constant.ARRAY_RETRIEVAL);
        this.selfcare = generateData.generateRandomIntegerNumber(constant.MIN_SELFCARE, constant.MAX_SELFCARE);
        this.dwelling = generateData.generateRandomIntegerNumber(constant.MIN_DWELLING, constant.MAX_DWELLING);
        this.career = generateData.generateRandomIntegerNumber(constant.MIN_CAREER, constant.MAX_CAREER);
        //Center in Reggio Emilia, Radius 10km
        this.location = generateData.generateRandomPoint(constant.CENTER_POINT,constant.RADIUS);
        this.phone = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        //For the map recognition
        this.person = true
    }

}
let peopleArray = [];

generateData = function (){
    for(let i = 0; i < constant.NUMBER_OF_ITEMS_IN_TABLE; i++){
        let person = new Person();
        peopleArray.unshift(person);
    }
}

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    res.status(404).send({
        success: false,
        message: 'Resource not found'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
    this.generateData()
});