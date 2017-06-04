const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/index');
const routes = require('./routes/routes');
const errorHandling = require('./middleware/errorHandling');

const app = express();
app.use(cors());

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect(config.getDbConnection());
}

app.use(bodyParser.json());
routes(app);
app.use(errorHandling);

module.exports = app;