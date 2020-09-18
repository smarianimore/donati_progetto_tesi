const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string

const url = "mongodb://dbuser:dbuserpassword@connecare-ds-test-shard-00-00.zl4sx.mongodb.net:27017,connecare-ds-test-" +
    "shard-00-01.zl4sx.mongodb.net:27017,connecare-ds-test-shard-00-02.zl4sx.mongodb.net:27017/connecare-ds-test?ssl=" +
    "true&replicaSet=atlas-e0qrne-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// The database to use
const dbName = "connecare-ds-test";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("patients");

        // Construct a document
        let patientsDocument = [
                {
                    "idPazienti": 1,
                    "nome": "Stefano",
                    "cognome": "Mariani",
                    "percorsoImg": "photo/stefanomariani.jpg",
                    "asa": "II",
                    "barthel": 32,
                    "charlson": 3.54,
                    "lace": 46,
                    "gma": 3,
                    "career": 1,
                    "dwelling": 2,
                    "retrieval": "YES",
                    "selfcare": 0,
                    "skills": 0,
                    "idMessaggi": 4,
                    "idAlert": 2,
                    "Address": "Via Caduti di Via Nuova 5",
                    "City": "Cadelbosco di Sopra",
                    "Postal": 42023,
                    "Country": "Italy"
                },
                {
                    "idPazienti": 2,
                    "nome": "Franco",
                    "cognome": "Zambonelli",
                    "percorsoImg": "photo/francozambonelli.jpg",
                    "asa": "I",
                    "barthel": 67,
                    "charlson": 4.21,
                    "lace": 12,
                    "gma": 1,
                    "career": 0,
                    "dwelling": 3,
                    "retrieval": "NO",
                    "selfcare": 2,
                    "skills": 2,
                    "idMessaggi": 0,
                    "idAlert": 0,
                    "Address": "Via Abramo Lincoln 1/A",
                    "City": "Reggio Emilia",
                    "Postal": 42124,
                    "Country": "Italy"
                },
                {
                    "idPazienti": 3,
                    "nome": "Marco",
                    "cognome": "Mamei",
                    "percorsoImg": "photo/marcomamei.jpg",
                    "asa": "II",
                    "barthel": 98,
                    "charlson": 2.2,
                    "lace": 76,
                    "gma": 2,
                    "career": 2,
                    "dwelling": 1,
                    "retrieval": "YES",
                    "selfcare": 1,
                    "skills": 1,
                    "idMessaggi": 2,
                    "idAlert": 0,
                    "Address": "Via Girondola 20",
                    "City": "Cavriago",
                    "Postal": 42025,
                    "Country": "Italy"
                },
                {
                    "idPazienti": 4,
                    "nome": "Mauro",
                    "cognome": "Ferrari",
                    "percorsoImg": "photo/mauroferrari.jpg",
                    "asa": "III",
                    "barthel": 50,
                    "charlson": 1.42,
                    "lace": 21,
                    "gma": 4,
                    "career": 1,
                    "dwelling": 2,
                    "retrieval": "NO",
                    "selfcare": 2,
                    "skills": 1,
                    "idMessaggi": 2,
                    "idAlert": 1,
                    "Address": "Via Giovanni Amendola 2",
                    "City": "Reggio Emilia",
                    "Postal": 42122,
                    "Country": "Italy"
                }
        ]

        // Insert a single document, wait for promise so we can read it back
        // eslint-disable-next-line no-unused-vars
        const p = await col.insertMany(patientsDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);

    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);