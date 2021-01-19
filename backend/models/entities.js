const constants = require("../models/constants")
const mozjexl = require('mozjexl');
const Tile38 = require('tile38');
const client = new Tile38();

let faker = require('faker');
faker.locale = "it";
faker.seed(123);

let vehiclesArray = [];
let patientsArray = [];

let markersVehicles = [];
let markersPatients = [];

let contextVehicles;
let contextPatients;

let fence1ResultsVehicles = [];
let fence2ResultsVehicles = [];
let fence3ResultsVehicles = [];
let fence4ResultsVehicles = [];

let fence1ResultsPatients = [];
let fence2ResultsPatients = [];
let fence3ResultsPatients = [];
let fence4ResultsPatients = [];

module.exports.setVehiclesArray = function (vehicle){
    vehiclesArray.unshift(vehicle);
    client.set('fleet', vehicle.id, [vehicle.location.lat, vehicle.location.lng]).catch(err =>
        console.log(err) // id not found
    );
    let query1Vehicles = client.intersectsQuery('fleet').detect('enter', 'exit').circle(39.994, 116.326, 500);
    let query2Vehicles = client.intersectsQuery('fleet').detect('enter', 'exit').circle(39.981, 116.300, 500);
    let query3Vehicles = client.intersectsQuery('fleet').detect('enter', 'exit').circle(39.999, 116.314, 500);
    let query4Vehicles = client.intersectsQuery('fleet').detect('enter', 'exit').circle(39.983, 116.328, 500);

    // eslint-disable-next-line no-unused-vars
       let fence1Vehicles = query1Vehicles.executeFence((err, results) => {
           if (err) {
               console.error("Query1 Vehicles: something went wrong! " + err);
           } else {
               if(results.detect == 'enter'){
                 //  console.dir(results)
                   if(!(fence1ResultsVehicles.includes(results.id))){
                       console.log('Vehicle entered the Fence 1: ' + results.id);
                       fence1ResultsVehicles.unshift(results.id)
                   }
               }
               if(results.detect == 'exit'){
                 //  console.log('Vehicle left the Fence 1: ' + results.id)
                   if(fence1ResultsVehicles.includes(results.id)){
                       for(let i = 0; i < fence1ResultsVehicles.length; i++){
                           if ( fence1ResultsVehicles[i] === results.id) {
                               fence1ResultsVehicles.splice(i, 1);
                               console.log('Fence1: Ho rimosso un veicolo dai risultati: ' + results.id)
                           }
                       }
                   }
               }
           }
       });
       // eslint-disable-next-line no-unused-vars
       let fence2Vehicles = query2Vehicles.executeFence((err, results) => {
           if (err) {
               console.error("Query2 Vehicles: something went wrong! " + err);
           } else {
               if(results.detect == 'enter'){
                   //  console.dir(results)
                   if(!(fence2ResultsVehicles.includes(results.id))){
                       console.log('Vehicle entered the Fence 2: ' + results.id);
                       fence2ResultsVehicles.unshift(results.id)
                   }
               }
               if(results.detect == 'exit'){
                   //  console.log('Vehicle left the Fence 2: ' + results.id)
                   if(fence2ResultsVehicles.includes(results.id)){
                       for(let i = 0; i < fence2ResultsVehicles.length; i++){
                           if ( fence2ResultsVehicles[i] === results.id) {
                               fence2ResultsVehicles.splice(i, 1);
                               console.log('Fence2: Ho rimosso un veicolo dai risultati: ' + results.id)
                           }
                       }
                   }
               }
           }
       });
       // eslint-disable-next-line no-unused-vars
       let fence3Vehicles = query3Vehicles.executeFence((err, results) => {
           if (err) {
               console.error("Query3 Vehicles: something went wrong! " + err);
           } else {
               if(results.detect == 'enter'){
                   //  console.dir(results)
                   if(!(fence3ResultsVehicles.includes(results.id))){
                       console.log('Vehicle entered the Fence 3: ' + results.id);
                       fence3ResultsVehicles.unshift(results.id)
                   }
               }
               if(results.detect == 'exit'){
                   //  console.log('Vehicle left the Fence 3: ' + results.id)
                   if(fence3ResultsVehicles.includes(results.id)){
                       for(let i = 0; i < fence3ResultsVehicles.length; i++){
                           if ( fence3ResultsVehicles[i] === results.id) {
                               fence3ResultsVehicles.splice(i, 1);
                               console.log('Fence3: Ho rimosso un veicolo dai risultati: ' + results.id)
                           }
                       }
                   }
               }
           }
       });
    // eslint-disable-next-line no-unused-vars
    let fence4Vehicles = query4Vehicles.executeFence((err, results) => {
        if (err) {
            console.error("Query4 Vehicles: something went wrong! " + err);
        } else {
            if(results.detect == 'enter'){
                //  console.dir(results)
                if(!(fence4ResultsVehicles.includes(results.id))){
                    console.log('Vehicle entered the Fence 4: ' + results.id);
                    fence4ResultsVehicles.unshift(results.id)
                }
            }
            if(results.detect == 'exit'){
                //  console.log('Vehicle left the Fence 4: ' + results.id)
                if(fence4ResultsVehicles.includes(results.id)){
                    for(let i = 0; i < fence4ResultsVehicles.length; i++){
                        if ( fence4ResultsVehicles[i] === results.id) {
                            fence4ResultsVehicles.splice(i, 1);
                            console.log('Fence4: Ho rimosso un veicolo dai risultati: ' + results.id)
                        }
                    }
                }
            }
        }
    });
}

module.exports.getVehiclesFencesResults = function () {
    let fencesResults = {
        fence1: fence1ResultsVehicles,
        fence2: fence2ResultsVehicles,
        fence3: fence3ResultsVehicles,
        fence4: fence4ResultsVehicles,
    }
    return fencesResults;
}

module.exports.getVehiclesArray = function(){
    return vehiclesArray;
}

module.exports.setPatientsArray = function(patient){
    patientsArray.unshift(patient);
    client.set('people', patient.id, [patient.location.lat, patient.location.lng]).catch(err =>
        console.log(err) // id not found
    );
    let query1Patients = client.intersectsQuery('people').detect('enter', 'exit').circle(39.997, 116.322, 500);
    let query2Patients = client.intersectsQuery('people').detect('enter', 'exit').circle(40.006, 116.325, 500);
    let query3Patients = client.intersectsQuery('people').detect('enter', 'exit').circle(40.002, 116.322, 500);
    let query4Patients = client.intersectsQuery('people').detect('enter', 'exit').circle(40.007, 116.319, 500);

    // eslint-disable-next-line no-unused-vars
    let fence1Patients = query1Patients.executeFence((err, results) => {
        if (err) {
            console.error("Query1 Patients: something went wrong! " + err);
        } else {

            if(results.detect == 'enter'){
                //console.dir(results)
                if(!(fence1ResultsPatients.includes(results.id))){
                    console.log('Patient entered the Fence 1: ' + results.id);
                    fence1ResultsPatients.unshift(results.id)
                }
            }
            if(results.detect == 'exit'){
                //  console.log('Patient left the Fence 1: ' + results.id)
                if(fence1ResultsPatients.includes(results.id)){
                    for(let i = 0; i < fence1ResultsPatients.length; i++){
                        if ( fence1ResultsPatients[i] === results.id) {
                            fence1ResultsPatients.splice(i, 1);
                            console.log('Fence1: Ho rimosso un paziente dai risultati: ' + results.id)
                        }
                    }
                }
            }
        }
    });
    // eslint-disable-next-line no-unused-vars
    let fence2Patients = query2Patients.executeFence((err, results) => {
        if (err) {
            console.error("Query2 Patients: something went wrong! " + err);
        } else {
            if(results.detect == 'enter'){
                //  console.dir(results)
                if(!(fence2ResultsPatients.includes(results.id))){
                    console.log('Patient entered the Fence 2: ' + results.id);
                    fence2ResultsPatients.unshift(results.id)
                }
            }
            if(results.detect == 'exit'){
                //  console.log('Patient left the Fence 2: ' + results.id)
                if(fence2ResultsPatients.includes(results.id)){
                    for(let i = 0; i < fence2ResultsPatients.length; i++){
                        if ( fence2ResultsPatients[i] === results.id) {
                            fence2ResultsPatients.splice(i, 1);
                            console.log('Fence2: Ho rimosso un paziente dai risultati: ' + results.id)
                        }
                    }
                }
            }
        }
    });
    // eslint-disable-next-line no-unused-vars
    let fence3Patients = query3Patients.executeFence((err, results) => {
        if (err) {
            console.error("Query3 Patients: something went wrong! " + err);
        } else {
            if(results.detect == 'enter'){
                //  console.dir(results)
                if(!(fence3ResultsPatients.includes(results.id))){
                    console.log('Patient entered the Fence 3: ' + results.id);
                    fence3ResultsPatients.unshift(results.id)
                }
            }
            if(results.detect == 'exit'){
                //  console.log('Vehicle left the Fence 3: ' + results.id)
                if(fence3ResultsPatients.includes(results.id)){
                    for(let i = 0; i < fence3ResultsPatients.length; i++){
                        if ( fence3ResultsPatients[i] === results.id) {
                            fence3ResultsPatients.splice(i, 1);
                            console.log('Fence3: Ho rimosso un paziente dai risultati: ' + results.id)
                        }
                    }
                }
            }
        }
    });
    // eslint-disable-next-line no-unused-vars
    let fence4Patients = query4Patients.executeFence((err, results) => {
        if (err) {
            console.error("Query4 Patients: something went wrong! " + err);
        } else {
            if(results.detect == 'enter'){
                //  console.dir(results)
                if(!(fence4ResultsPatients.includes(results.id))){
                    console.log('Patient entered the Fence 4: ' + results.id);
                    fence4ResultsPatients.unshift(results.id)
                }
            }
            if(results.detect == 'exit'){
                //  console.log('Patient left the Fence 4: ' + results.id)
                if(fence4ResultsPatients.includes(results.id)){
                    for(let i = 0; i < fence4ResultsPatients.length; i++){
                        if ( fence4ResultsPatients[i] === results.id) {
                            fence4ResultsPatients.splice(i, 1);
                            console.log('Fence4: Ho rimosso un paziente dai risultati: ' + results.id)
                        }
                    }
                }
            }
        }
    });
}

module.exports.getPatientsFencesResults = function () {
    let fencesResults = {
        fence1: fence1ResultsPatients,
        fence2: fence2ResultsPatients,
        fence3: fence3ResultsPatients,
        fence4: fence4ResultsPatients,
    }
    return fencesResults;
}

module.exports.getPatientsArray = function (){
    return patientsArray;
}

module.exports.setContexts = function(entity){
    if(entity == 'vehicles'){
        contextVehicles = {
            vehicles: vehiclesArray
        };
    }
    if(entity == 'patients'){
        contextPatients = {
            patients: patientsArray
        };
    }
}

module.exports.createMarkersVehicles = function() {
    let markers_vehicles_created = [];
    for(let i = 0; i < vehiclesArray.length; i++) {
        markers_vehicles_created.push({
            id: vehiclesArray[i].id,
            location: vehiclesArray[i].location,
            coordinates: vehiclesArray[i].coordinates,
            index: vehiclesArray[i].index,
            informations: 'Model: ' + vehiclesArray[i].model + '<br> Type: ' + vehiclesArray[i].type + '<br> Color: '
                + vehiclesArray[i].color,
            noise: vehiclesArray[i].noise,
            vibrations: vehiclesArray[i].vibrations,
            fuel: vehiclesArray[i].fuel,
            ergonomics: vehiclesArray[i].ergonomics,
            color: constants.MARKER_NOT_HIGHLIGHTED_COLOR,
            strokeColor: constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
            circleColor: constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
            highlighted: false
        });
    }
    markersVehicles = [...markers_vehicles_created];
    return markers_vehicles_created
}

module.exports.createMarkersPatients = function() {
    let markers_patients_created = [];
    for(let i = 0; i < patientsArray.length; i++) {
        markers_patients_created.push({
            id: patientsArray[i].id,
            location: patientsArray[i].location,
            coordinates: patientsArray[i].coordinates,
            index: patientsArray[i].index,
            informations: patientsArray[i].firstName + ' ' + patientsArray[i].lastName + '<br> Phone: ' + patientsArray[i].phone +
                '<br> Email: ' + patientsArray[i].email,
            lace: patientsArray[i].lace,
            charlson: patientsArray[i].charlson,
            gma: patientsArray[i].gma,
            barthel: patientsArray[i].barthel,
            asa: patientsArray[i].asa,
            color: constants.MARKER_NOT_HIGHLIGHTED_COLOR,
            strokeColor: constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
            circleColor: constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
            highlighted: false
        });
    }
    markersPatients = [...markers_patients_created];
    return markers_patients_created
}

module.exports.setVehiclesLocation = function(vehicle) {
    for (let i = 0; i < markersVehicles.length; i++) {
        if (markersVehicles[i].id == vehicle.id) {
            markersVehicles[i].location = vehicle.location;
            client.set('fleet', vehicle.id, [vehicle.location.lat, vehicle.location.lng]).catch(err =>
                console.log(err) // id not found
            );
        }
    }
}

module.exports.setPatientsLocation = function(patient) {
    for(let i = 0; i < markersPatients.length; i++){
        if(markersPatients[i].id == patient.id){
            markersPatients[i].location = patient.location;
            client.set('people', patient.id, [patient.location.lat, patient.location.lng]).catch(err =>
                console.log(err) // id not found
            );
        }
    }
}

module.exports.getUpdatedMarkers = function (entity) {
    if(entity == 'vehicles'){
        return markersVehicles
    }
    if(entity == 'patients'){
        return markersPatients
    }
}

module.exports.createIndexColorTertileErgonomics = function() {
    for(let i = 0; i < markersVehicles.length; i++) {
        if(markersVehicles[i].ergonomics <= constants.TERTILE_LOWER_THRESHOLD){
            markersVehicles[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].ergonomics > constants.TERTILE_LOWER_THRESHOLD && markersVehicles[i].ergonomics <= constants.TERTILE_MEDIUM_THRESHOLD){
            markersVehicles[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markersVehicles[i].color = constants.MARKER_NO_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        }
    }
    return markersVehicles
}

module.exports.createIndexColorTertileVibrations = function() {
    for (let i = 0; i < markersVehicles.length; i++) {
        if (markersVehicles[i].vibrations < constants.VIBRATIONS_LOWER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_NO_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].vibrations >= constants.VIBRATIONS_LOWER_THRESHOLD && markersVehicles[i].vibrations <= constants.VIBRATIONS_HIGHER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markersVehicles[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersVehicles
}

module.exports.createIndexColorTertileFuel = function() {
    for (let i = 0; i < markersVehicles.length; i++) {
        if (markersVehicles[i].fuel <= constants.TERTILE_LOWER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].fuel > constants.TERTILE_LOWER_THRESHOLD && markersVehicles[i].fuel <= constants.TERTILE_MEDIUM_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markersVehicles[i].color = constants.MARKER_NO_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        }
    }
    return markersVehicles
}

module.exports.createIndexColorTertileNoise = function() {
    for (let i = 0; i < markersVehicles.length; i++) {
        if (markersVehicles[i].noise < constants.NOISE_BOTHER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_NO_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].noise >= constants.NOISE_BOTHER_THRESHOLD && markersVehicles[i].noise < constants.NOISE_DAMAGE_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markersVehicles[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersVehicles
}

module.exports.createIndexColorTertileLace = function() {
    for(let i = 0; i < markersPatients.length; i++) {
        if(markersPatients[i].lace <= (constants.MAX_LACE / 3)){
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].lace > (constants.MAX_LACE / 3) && markersPatients[i].lace <= 2 * (constants.MAX_LACE / 3)) {
            markersPatients[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].lace > 2 * (constants.MAX_LACE / 3) && markersPatients[i].lace <= constants.MAX_LACE) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.createIndexColorTertileCharlston = function() {
    for (let i = 0; i < markersPatients.length; i++) {
        if (markersPatients[i].charlson <= (constants.MAX_CHARLSON / 3)) {
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].charlson > (constants.MAX_CHARLSON / 3) && markersPatients[i].charlson <= 2 * (constants.MAX_CHARLSON / 3)) {
            markersPatients[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].charlson > 2 * (constants.MAX_CHARLSON / 3) && markersPatients[i].charlson <= constants.MAX_CHARLSON) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.createIndexColorTertileASA = function() {
    for (let i = 0; i < markersPatients.length; i++) {
        if (markersPatients[i].asa === constants.ASA_II) {
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].asa === constants.ASA_III) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else {
            markersPatients[i].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.createIndexColorTertileGMA = function() {
    for (let i = 0; i < markersPatients.length; i++) {
        if (markersPatients[i].gma >= constants.MIN_GMA && markersPatients[i].gma < constants.MEDIUM_GMA) {
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].gma == constants.MEDIUM_GMA) {
            markersPatients[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].gma == constants.MAX_GMA) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.createIndexColorTertileBarthel = function() {
    for (let i = 0; i < markersPatients.length; i++) {
        if (markersPatients[i].barthel >= constants.MEDIUM_BARTHEL_91 && markersPatients[i].barthel <= constants.MAX_BARTHEL) {
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].barthel >= constants.MEDIUM_BARTHEL_61 && markersPatients[i].barthel <= constants.MEDIUM_BARTHEL_90) {
            markersPatients[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].barthel <= constants.MEDIUM_BARTHEL_60) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.createIndexColorQuartileErgonomics = function() {
    for (let i = 0; i < markersVehicles.length; i++) {
        if (markersVehicles[i].ergonomics <= constants.ERGONOMICS_LOWER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].ergonomics > constants.ERGONOMICS_LOWER_THRESHOLD && markersVehicles[i].ergonomics <= constants.ERGONOMICS_MEDIUM_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].ergonomics > constants.ERGONOMICS_MEDIUM_THRESHOLD && markersVehicles[i].ergonomics <= constants.ERGONOMICS_HIGHER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else {
            markersVehicles[i].color = constants.MARKER_NO_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        }
    }
    return markersVehicles
}

module.exports.createIndexColorQuartileVibrations = function() {
    for (let i = 0; i < markersVehicles.length; i++) {
        if (markersVehicles[i].vibrations < constants.QUARTILE_VIBRATIONS_MIDDLE_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_NO_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].vibrations >= constants.QUARTILE_VIBRATIONS_MIDDLE_THRESHOLD && markersVehicles[i].vibrations <= constants.VIBRATIONS_LOWER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].vibrations >= constants.VIBRATIONS_LOWER_THRESHOLD && markersVehicles[i].vibrations <= constants.VIBRATIONS_HIGHER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markersVehicles[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersVehicles
}

module.exports.createIndexColorQuartileFuel = function() {
    for (let i = 0; i < markersVehicles.length; i++) {
        if (markersVehicles[i].fuel <= constants.FUEL_LOWER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].fuel > constants.FUEL_LOWER_THRESHOLD && markersVehicles[i].fuel <= constants.FUEL_MEDIUM_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].fuel > constants.FUEL_MEDIUM_THRESHOLD && markersVehicles[i].fuel <= constants.FUEL_HIGHER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else {
            markersVehicles[i].color = constants.MARKER_NO_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        }
    }
    return markersVehicles
}

module.exports.createIndexColorQuartileNoise = function() {
    for (let i = 0; i < markersVehicles.length; i++) {
        if (markersVehicles[i].noise < constants.NOISE_BOTHER_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_NO_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].noise >= constants.NOISE_BOTHER_THRESHOLD && markersVehicles[i].noise < constants.NOISE_DISTURBANCE_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markersVehicles[i].noise >= constants.NOISE_DISTURBANCE_THRESHOLD && markersVehicles[i].noise < constants.NOISE_DAMAGE_THRESHOLD) {
            markersVehicles[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else {
            markersVehicles[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersVehicles[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersVehicles[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersVehicles
}

module.exports.createIndexColorQuartileLace = function() {
    for (let i = 0; i < markersPatients.length; i++) {
        if (markersPatients[i].lace <= (constants.MAX_LACE / 4)) {
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].lace > (constants.MAX_LACE / 4) && markersPatients[i].lace <= 2 * (constants.MAX_LACE / 4)) {
            markersPatients[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].lace > 2 * (constants.MAX_LACE / 4) && markersPatients[i].lace <= 3 * (constants.MAX_LACE / 4)) {
            markersPatients[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].lace > 3 * (constants.MAX_LACE / 4) && markersPatients[i].lace <= constants.MAX_LACE) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.createIndexColorQuartileCharlston = function() {
    for (let i = 0; i < markersPatients.length; i++) {
        if (markersPatients[i].charlson <= (constants.MAX_CHARLSON / 4)) {
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].charlson > (constants.MAX_CHARLSON / 4) && markersPatients[i].charlson <= 2 * (constants.MAX_CHARLSON / 4)) {
            markersPatients[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].charlson > 2 * (constants.MAX_CHARLSON / 4) && markersPatients[i].charlson <= 3 * (constants.MAX_CHARLSON / 4)) {
            markersPatients[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].charlson > 3 * (constants.MAX_CHARLSON / 4) && markersPatients[i].charlson <= constants.MAX_CHARLSON) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.createIndexColorQuartileASA = function() {
    for (let i = 0; i < markersPatients.length; i++) {
        if (markersPatients[i].asa === constants.ASA_II) {
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].asa === constants.ASA_III) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        } else {
            markersPatients[i].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.createIndexColorQuartileGMA = function() {
    for (let i = 0; i < markersPatients.length; i++) {
        if (markersPatients[i].gma >= constants.MIN_GMA && markersPatients[i].gma < constants.QUARTILE_GMA_MIDDLE_THRESHOLD) {
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].gma == constants.QUARTILE_GMA_MIDDLE_THRESHOLD) {
            markersPatients[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].gma == constants.MEDIUM_GMA) {
            markersPatients[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].gma == constants.MAX_GMA) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.createIndexColorQuartileBarthel = function() {
    for (let i = 0; i < markersPatients.length; i++) {
        if (markersPatients[i].barthel >= constants.MEDIUM_BARTHEL_91 && markersPatients[i].barthel <= constants.MAX_BARTHEL) {
            markersPatients[i].color = constants.MARKER_NO_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_NO_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_NO_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].barthel >= constants.MEDIUM_BARTHEL_61 && markersPatients[i].barthel <= constants.MEDIUM_BARTHEL_90) {
            markersPatients[i].color = constants.MARKER_LITTLE_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_LITTLE_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_LITTLE_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].barthel <= constants.MEDIUM_BARTHEL_60 && markersPatients[i].barthel > constants.QUARTILE_BARTHEL_LOWER_THRESHOLD_30) {
            markersPatients[i].color = constants.MARKER_SOME_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_SOME_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_SOME_RISK_CIRCLE_COLOR;
        } else if (markersPatients[i].barthel <= constants.QUARTILE_BARTHEL_LOWER_THRESHOLD_30) {
            markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
            markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
            markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
        }
    }
    return markersPatients
}

module.exports.resolveExpression = async function (criterion, entity) {
    if(entity == 'patients'){
        return await mozjexl.eval(criterion, contextPatients).then(function (res) {
            module.exports.deselectAllMarkers('patients')
            for (let j = 0; j < res.length; j++) {
                for (let i = 0; i < markersPatients.length; i++) {
                    if (markersPatients[i].id == res[j].id) {
                        markersPatients[i].color = constants.MARKER_HIGH_RISK_COLOR;
                        markersPatients[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
                        markersPatients[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
                    }
                }
            }
            return markersPatients;
        });
    }
    if(entity == 'vehicles'){
        return await mozjexl.eval(criterion, contextVehicles).then(function (res) {
            module.exports.deselectAllMarkers('vehicles')
            for (let j = 0; j < res.length; j++) {
                for (let i = 0; i < markersVehicles.length; i++) {
                    if (markersVehicles[i].id == res[j].id) {
                        markersVehicles[i].color = constants.MARKER_HIGH_RISK_COLOR;
                        markersVehicles[i].strokeColor = constants.MARKER_HIGH_RISK_STROKE_COLOR;
                        markersVehicles[i].circleColor = constants.MARKER_HIGH_RISK_CIRCLE_COLOR;
                    }
                }
            }
            return markersVehicles;
        });
    }
}

module.exports.deselectAllMarkers = function (entity){
    if(entity == 'vehicles') {
        for (let j = 0; j < markersVehicles.length; j++) {
            markersVehicles[j].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR,
                markersVehicles[j].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
                markersVehicles[j].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
                markersVehicles[j].highlighted = false
        }
    }
    if(entity == 'patients') {
        for (let j = 0; j < markersPatients.length; j++) {
            markersPatients[j].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR,
                markersPatients[j].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
                markersPatients[j].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR,
                markersPatients[j].highlighted = false
        }
    }
}

module.exports.highlightMarkers = function(data, entity){
    if(entity == 'vehicles'){
        if(data.length == 0){
            module.exports.deselectAllMarkers(entity)
        }
        for(let z = 0; z < markersVehicles.length; z++){
            markersVehicles[z].highlighted = false
        }
        for(let i = 0; i < data.length; i++) {
            for (let j = 0; j < markersVehicles.length; j++) {
                if(markersVehicles[j].id == data[i].id) {
                    markersVehicles[j].color = constants.MARKER_HIGHLIGHTED_COLOR,
                        markersVehicles[j].strokeColor = constants.MARKER_HIGHLIGHTED_STROKE_COLOR,
                        markersVehicles[j].circleColor = constants.MARKER_HIGHLIGHTED_CIRCLE_COLOR,
                        markersVehicles[j].highlighted = true
                }
            }
        }
        for(let i = 0; i < data.length; i++) {
            for (let j = 0; j < markersVehicles.length; j++) {
                if(markersVehicles[j].id != data[i].id && markersVehicles[j].highlighted == false){
                    markersVehicles[j].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR,
                        markersVehicles[j].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
                        markersVehicles[j].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR
                    markersVehicles[j].highlighted = false
                }
            }
        }
    }
    if(entity == 'patients'){
        if(data.length == 0){
            module.exports.deselectAllMarkers(entity)
        }
        for(let z = 0; z < markersPatients.length; z++){
            markersPatients[z].highlighted = false
        }
        for(let i = 0; i < data.length; i++) {
            for (let j = 0; j < markersPatients.length; j++) {
                if(markersPatients[j].id == data[i].id) {
                    markersPatients[j].color = constants.MARKER_HIGHLIGHTED_COLOR,
                        markersPatients[j].strokeColor = constants.MARKER_HIGHLIGHTED_STROKE_COLOR,
                        markersPatients[j].circleColor = constants.MARKER_HIGHLIGHTED_CIRCLE_COLOR,
                        markersPatients[j].highlighted = true
                }
            }
        }
        for(let i = 0; i < data.length; i++) {
            for (let j = 0; j < markersPatients.length; j++) {
                if(markersPatients[j].id != data[i].id && markersPatients[j].highlighted == false){
                    markersPatients[j].color = constants.MARKER_NOT_HIGHLIGHTED_COLOR,
                        markersPatients[j].strokeColor = constants.MARKER_NOT_HIGHLIGHTED_STROKE_COLOR,
                        markersPatients[j].circleColor = constants.MARKER_NOT_HIGHLIGHTED_CIRCLE_COLOR
                    markersPatients[j].highlighted = false
                }
            }
        }
    }
}, error => {
    console.log("Error SERVER "+error)
};