var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

var factsRouter = require('./routes/facts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', factsRouter);

module.exports = app;
