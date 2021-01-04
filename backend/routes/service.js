const func = require("../models/entities");
// eslint-disable-next-line no-unused-vars
const bodyParser = require("body-parser");

module.exports = function(app) {
    let peopleArray =  func.generateData("patients");
    let vehicleArray = func.generateData("vehicles");
    app.get('/entities/patients', (req, res) => {
        res.send(peopleArray);
    });
    app.get('/entities/vehicles', (req, res) => {
        res.send(vehicleArray);
    });


    app.get('/entities/markers/updated', (req, res) => {
        res.send(func.getUpdatedMarkers());
    });


    app.put('/entities/markers/deselect', (req, res) => {
        func.deselectAllMarkers()
        res.send('Done')
    });
    app.put('/entities/markers/highlight', (req, res) => {
        let dataArray = req.body.data
        func.highlightMarkers(dataArray)
        res.send('Done')
    }), error => {
        console.log("Error SERVER "+error)
    };


    app.get('/entities/patients/markers', (req, res) => {
        res.send(func.createMarkers(peopleArray));
    });
    app.get('/entities/vehicles/markers', (req, res) => {
        res.send(func.createMarkers(vehicleArray));
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