const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

require('../routes/service')(app);

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    res.status(404).send({
        success: false,
        message: 'Resource not found'
    });
});

const port = process.env.PORT || 8001;
app.listen(port, function() {
    console.log('Listening on port ' + port);
});