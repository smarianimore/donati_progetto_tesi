const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = "mongodb://dbuser:dbuserpassword@connecare-ds-test-shard-00-00.zl4sx.mongodb.net:27017,connecare-ds-test-" +
    "shard-00-01.zl4sx.mongodb.net:27017,connecare-ds-test-shard-00-02.zl4sx.mongodb.net:27017/connecare-ds-test?ssl=" +
    "true&replicaSet=atlas-e0qrne-shard-0&authSource=admin&retryWrites=true&w=majority";

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db("connecare-ds-test");
    var patients = db.collection('patients').find({});

    module.exports = patients;

    function iterateFunc(doc) {
        console.log(JSON.stringify(doc, null, 4));
    }

    function errorFunc(error) {
        console.log(error);
    }

    patients.forEach(iterateFunc, errorFunc);

    client.close();
});