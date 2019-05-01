// @ts-check

const EventEmitter = require('./EventEmitter');

const moment = require('moment');

const winston = require('winston');

const { Ticket } = require('../models/Ticket');

const { Queue } = require('../models/Queue');

const bookshelf = require('../../bookshelf');

module.exports = async (officer) => {
	const queue = await Queue.findOne();

	if (!queue) return winston.info("AVENGERS: Queue AVAIL.");

    let datetime = new Date(queue.datetime);

	datetime = moment(datetime).format('YYYY-MM-DD HH-mm-ss');

    return new Promise(async (resolve, reject) => {
	    bookshelf.transaction(async (t) => {
	        try {
	        	const officerId = officer.get('id');
	        	// Create Ticket
	        	winston.info(`AVENGERS: New ticket auto assigned to officer with id ${officerId}`);
	        	const ticket = await Ticket.forge({ 
					officer_id: officer.get('id'),
					full_name: queue.full_name,
					email: queue.email,
					license_number: queue.license_number,
					color: queue.color,
					type: queue.type,
					description: queue.description,
					day_phone: queue.day_phone,
					eve_phone: queue.eve_phone,
					mob_phone: queue.mob_phone,
					datetime: datetime,
				}).save();

				const queueDel = await queue.remove();

				winston.log("Queue removed")

				await officer.save({ avail: false }, { patch: true });

	      	} catch (err) {
		        winston.error('A transaction error', err);
		        await t.rollback(t);
		        reject(err);
		    }
	    });
	});
}