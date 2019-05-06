// @ts-check

require('dotenv').config();
const config = require('config');

const winston = require('winston');
if (process.env.NODE_ENV !== 'test') {
	require('winston-mongodb');
}

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const express = require("express");
const morgan = require("morgan");

module.exports = function(app) {
	if (app.get('env') === 'development' || app.get('env') === 'test') {
		app.use(morgan('tiny'));
		startupDebugger('Morgan is running...');
	}

	// Database
	dbDebugger("Morgan is running...");

	winston.handleExceptions(
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.File({ filename: process.env.LOG_FILE }),
		// new winston.transports.MongoDB({ db: `${process.env.LOG_DB_HOST}/${process.env.LOG_DB_NAME}` })
	);

	process.on('unhandledRejection', (ex) => {
		throw ex;
	});

	winston.add(winston.transports.File, { filename: process.env.LOG_FILE });

	if (process.env.NODE_ENV !== 'test') {
		winston.add(winston.transports.MongoDB, { 
			db: config.get('mongodb_log'),
			level: 'info' 
		});
	}
}