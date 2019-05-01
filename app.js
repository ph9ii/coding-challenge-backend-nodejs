// @ts-check

require('dotenv').config();
const express = require("express");
const app = express();

// Logging
require('./init/logging')(app);

// Load Middleware
require('./init/middleware')(app);

// Load Routes
require('./init/routes')(app);

// Load DB
require('./init/mongodb')();

module.exports = app;

