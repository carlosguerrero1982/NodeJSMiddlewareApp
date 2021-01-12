require('./config/config');


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/index'));

// parse application/json
app.use(bodyParser.json());





mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true }, (error, resp) => {

    if (error) throw error;

    console.log("base de datos online");
});

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto", process.env.PORT);
});