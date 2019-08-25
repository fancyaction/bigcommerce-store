const path = require('path');
const express = require("express");
let app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');





app.use(express.static('dist'));


app.use(bodyParser.json({limit: '128mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '128mb' }));

app.use('/', routes);

module.exports = app;