// @ts-check

const showAll = require('../../api/apiResponser');

const { 
	Ticket, 
	validate,
	update } = require('../../models/Ticket');

const {
	hyperMediaAll, 
	hyperMediaOne } = require('../../transformers/ticketTransformer');

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

	const ticket = await Ticket.forge({id: req.params.id}).fetch();
	if (!ticket) return res.status(404).send("No ticket found with the given id");

	const hyperTicket = hyperMediaOne(req, ticket);

	res.status(200).json({ data: hyperTicket });
}