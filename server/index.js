const express = require('express');
// const db = require('../db');
const helpers = require('../helpers');
const PORT = 3000;

// Middleware
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', PORT);

// Logging and parsing
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../dist'));

// Set up our routes
app.use('/api/keepAway', router);

// Serve the client files
app.use(express.static(__dirname + '/../client'));

//listen
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
