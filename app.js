const express = require('express');
const path = require('path');
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

//serve angular app
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req,res) => {
   res.sendFile(path.join(__dirname,'public/index.html'));
});

module.exports = app;