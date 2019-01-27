require('dotenv').config();
var debug = require('debug')('TimeLocker:server');
var cors = require('cors')
const express = require('express');
const PORT = 3000;
var parser = require('body-parser');
var router = require('./routes.js');
var app = express();
module.exports.app = app;

app.set('port', PORT);
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../dist'));
app.use(cors());

// Set up our routes
app.use('/api/keepsafe', router);

// Serve the client files
// app.use(express.static(__dirname + '/../client'));

//listen
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
