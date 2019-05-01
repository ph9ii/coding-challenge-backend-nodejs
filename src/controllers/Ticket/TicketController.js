// @ts-check

const moment = require('moment');
const winston = require('winston');
const bookshelf = require('../../../bookshelf');

const showAll = require('../../api/apiResponser');

const { Officer } = require('../../models/Officer');

const { Queue } = require('../../models/Queue');

const { 
	Ticket, 
	validate,
	update } = require('../../models/Ticket');

const {
	hyperMediaAll, 
	hyperMediaOne } = require('../../transformers/ticketTransformer');

exports.searchTickets = async (req, res, next) => {
	const fname  =  req.query.fname || undefined;
	const email  =  req.query.email || undefined;
	const number =  req.query.number || undefined;
	const color  =  req.query.color || undefined;
	const type   =  req.query.type || undefined;
	const status = req.query.status || undefined;
	const datetime 	  =  req.query.datetime || undefined;
	const description = req.query.description || undefined;
	
	const tickets = await Ticket
		.query('where', 'email', 'LIKE', `%${email}%`)
		.query('orWhere', 'full_name', 'LIKE', `%${fname}%`)
		.query('orWhere', 'color', 'LIKE', `%${color}%`)
		.query('orWhere', 'type', 'LIKE', `%${type}%`)
		.query('orWhere', 'description', 'LIKE', `%${description}%`)
		.query('orWhere', 'license_number', 'LIKE', `%${number}%`)
		.query('orWhere', 'datetime', 'LIKE', `%${datetime}%`)
		.query('orWhere', 'status', 'LIKE', `%${status}%`)

		.fetchPage({
			pageSize: req.query.pagesize, // Defaults to 10 if not specified
			page: req.query.page, // Defaults to 1 if not specified
		});

	if (tickets.length === 0) 
		return res.status(404).send("No ticket(s) found match your search");

	const hypertickets = hyperMediaAll(req, tickets.toJSON());

	showAll(req, res, hypertickets, tickets);
}

exports.getTickets = async (req, res, next) => {
	const tickets = await Ticket.forge()
		.fetchPage({
			pageSize: req.query.pagesize, // Defaults to 10 if not specified
			page: req.query.page, // Defaults to 1 if not specified
		});

	const hypertickets = hyperMediaAll(req, tickets.toJSON());

	showAll(req, res, hypertickets, tickets);
}

exports.getTicket = async (req, res, next) => {
	const ticket = await Ticket.forge({id: req.params.id}).fetch({ withRelated: ['threads'] });
	if (!ticket) return res.status(404).send("No ticket found with the given id");

	const hyperTicket = hyperMediaOne(req, ticket);

	res.status(200).json({ data: hyperTicket});
}


exports.createTicket = async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const officer = await Officer.forge({ avail: true }).fetch();

	let datetime = new Date(req.body.datetime);

	datetime = moment(datetime).format('YYYY-MM-DD HH-mm-ss');

	if (!officer) {
		const ticket = new Queue({ 
			full_name: req.body.full_name,
			email: req.body.email,
			license_number: req.body.license_number,
			color: req.body.color,
			type: req.body.type,
			description: req.body.description,
			datetime: datetime,
			day_phone: req.body.day_phone,
			eve_phone: req.body.eve_phone,
			mob_phone: req.body.day_phone,
		});

		await ticket.save();

		return res.status(201).json({ status: 'pending', data: ticket });
	}

	return new Promise(async (resolve, reject) => {
	    bookshelf.transaction(async (t) => {
	        try {
	        	const ticket = await Ticket.forge({ 
					officer_id: officer.get('id'),
					full_name: req.body.full_name,
					email: req.body.email,
					license_number: req.body.license_number,
					color: req.body.color,
					type: req.body.type,
					description: req.body.description,
					day_phone: req.body.day_phone,
					eve_phone: req.body.eve_phone,
					mob_phone: req.body.mob_phone,
					datetime: datetime,
				}).save();

				await officer.save({ avail: false }, { patch: true });

				const hyperTicket = hyperMediaOne(req, ticket);

				res.status(201).json({ status: 'open', data: hyperTicket });

	      	} catch (err) {
		        winston.error('A transaction error', err);
		        await t.rollback(t);
		        res.status(500).send('Something went wrong');
		        reject(err);
		    }
	    });
	});	
}