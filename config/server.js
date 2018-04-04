var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(function(req, res, next) {
  res.status(404).send("errors/404");
  next();
});

app.use(function(err, req, res, next) {
  res.status(500).send("errors/500");
  next();
});

consign()
  .include("app/routes")
  .then("app/models")
  .then("app/controllers")
  .into(app);

module.exports = app;
