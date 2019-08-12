const path = require('path');
const express = require("express");
let app = express();
const routes = require('./routes');




app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', routes);

module.exports = app;