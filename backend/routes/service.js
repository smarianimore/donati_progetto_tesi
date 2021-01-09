const func = require("../models/entities");
// eslint-disable-next-line no-unused-vars
const bodyParser = require("body-parser");

module.exports = function(app) {
//    let peopleArray =  func.generateData("patients");
//    let vehicleArray = func.generateData("vehicles");
    app.put('/receive/entities/vehicles', (req, res)=> {
    //    console.log("/upload: Received data: body length: ", req.headers['content-length']);
        let vehicleArray = req.body.data
        func.setVehiclesArray(vehicleArray);
        res.send('Done');
    });
    app.put('/vehicles/location', (req, res)=> {
        // console.log("/upload: Received data: body length: ", req.headers['content-length']);
        let vehicle = req.body.data
        func.setVehiclesLocation(vehicle);
        res.send('Done');
    });

    app.put('/receive/entities/patients', (req, res)=> {
        //    console.log("/upload: Received data: body length: ", req.headers['content-length']);
        let patientsArray = req.body.data
        func.setPatientsArray(patientsArray);
        res.send('Done');
    });
    app.put('/patients/location', (req, res)=> {
        // console.log("/upload: Received data: body length: ", req.headers['content-length']);
        let patient = req.body.data
        func.setPatientsLocation(patient);
        res.send('Done');
    });


    app.get('/entities/patients', (req, res) => {
 //       res.send(peopleArray);
        res.send(func.getPatientsArray())
    });
    app.get('/entities/vehicles', (req, res) => {
 //       res.send(vehicleArray);
        res.send(func.getVehiclesArray())
    });


    app.get('/entities/markers/updated', (req, res) => {
        res.send(func.getUpdatedMarkers(req.query.entity));
    });


    app.put('/entities/markers/deselect', (req, res) => {
        func.deselectAllMarkers(req.body.entity)
        res.send('Done')
    });
    app.put('/entities/markers/highlight', (req, res) => {
        let dataArray = req.body.data
        func.highlightMarkers(dataArray, req.body.entity)
        res.send('Done')
    }), error => {
        console.log("Error SERVER "+error)
    };


    app.get('/entities/patients/markers', (req, res) => {
    //    res.send(func.createMarkers(peopleArray));
        res.send(func.createMarkersPatients());
    });
    app.get('/entities/vehicles/markers', (req, res) => {
      //  res.send(func.createMarkers(vehicleArray));
        res.send(func.createMarkersVehicles());
    });

    app.get('/entities/tertile/ergonomics', (req, res) => {
        res.send(func.createIndexColorTertileErgonomics());
    });
    app.get('/entities/tertile/vibrations', (req, res) => {
        res.send(func.createIndexColorTertileVibrations());
    });
    app.get('/entities/tertile/fuel', (req, res) => {
        res.send(func.createIndexColorTertileFuel());
    });
    app.get('/entities/tertile/noise', (req, res) => {
        res.send(func.createIndexColorTertileNoise());
    });
    app.get('/entities/tertile/lace', (req, res) => {
        res.send(func.createIndexColorTertileLace());
    });
    app.get('/entities/tertile/charlston', (req, res) => {
        res.send(func.createIndexColorTertileCharlston());
    });
    app.get('/entities/tertile/asa', (req, res) => {
        res.send(func.createIndexColorTertileASA());
    });
    app.get('/entities/tertile/gma', (req, res) => {
        res.send(func.createIndexColorTertileGMA());
    });
    app.get('/entities/tertile/barthel', (req, res) => {
        res.send(func.createIndexColorTertileBarthel());
    });


    app.get('/entities/quartile/ergonomics', (req, res) => {
        res.send(func.createIndexColorQuartileErgonomics());
    });
    app.get('/entities/quartile/vibrations', (req, res) => {
        res.send(func.createIndexColorQuartileVibrations());
    });
    app.get('/entities/quartile/fuel', (req, res) => {
        res.send(func.createIndexColorQuartileFuel());
    });
    app.get('/entities/quartile/noise', (req, res) => {
        res.send(func.createIndexColorQuartileNoise());
    });
    app.get('/entities/quartile/lace', (req, res) => {
        res.send(func.createIndexColorQuartileLace());
    });
    app.get('/entities/quartile/charlston', (req, res) => {
        res.send(func.createIndexColorQuartileCharlston());
    });
    app.get('/entities/quartile/asa', (req, res) => {
        res.send(func.createIndexColorQuartileASA());
    });
    app.get('/entities/quartile/gma', (req, res) => {
        res.send(func.createIndexColorQuartileGMA());
    });
    app.get('/entities/quartile/barthel', (req, res) => {
        res.send(func.createIndexColorQuartileBarthel());
    });

    app.get('/entities/expression', (req, res) => {
        let result = func.resolveExpression(req.query.criterion, req.query.entity);
        result.then( function (result){
            res.send(result)
        })
    });
}