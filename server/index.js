require("dotenv").config();
const debug = require("debug")("TimeLocker:server");
const cors = require("cors");
const express = require("express");
// const mid = require("./middleware");
const parser = require("body-parser");
const router = require("./routes.js");

const PORT = 3000;
var app = express();
module.exports.app = app;

app.set("port", PORT);
app.use(parser.json());
// app.use(m.getParams);
app.use(cors());

// Set up our routes
app.use("/api/keepsafe", router);

//listen
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
