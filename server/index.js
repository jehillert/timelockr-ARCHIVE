require('dotenv').config();
const cors = require('cors');
const debug = require('debug')('TimeLocker:server');
const express = require('express');
const parser = require('body-parser');
const router = require('./routes.js');
const PORT = process.env.PORT || 3000;

const app = express();
module.exports.app = app;

// app.set('port', PORT);
app.use(parser.json());
app.use(cors());
app.use('/api/keepsafe', router);

// app.listen(PORT, () => {
// console.log(`Node app started.  Listening on port ${PORT}`);
// });
app.set('port', PORT);
app.listen(app.get('port'), function() {
  console.log(`Node app started.  Listening on port ${PORT}`);
});