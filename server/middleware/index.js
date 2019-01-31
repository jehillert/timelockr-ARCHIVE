var debug = require("debug")("TimeLocker:server:middleware");
const Promise = require("bluebird");
const moment = require("moment");
const models = require("./../models");
const helpers = require("./../../lib/helpers.js");
const safe = require("./../../lib/safe.js");

// debug(`base url --- ${req.baseUrl}`);
// debug(`originalUrl --- ${req.originalUrl}`);
// debug(`subdomains --- ${req.subdomains}`);
// debug(`hostname --- ${req.hostname}`);
// debug(`path --- ${req.path}`);

