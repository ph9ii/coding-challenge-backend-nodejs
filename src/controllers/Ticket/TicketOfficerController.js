const { Ticket } = require('../../models/Ticket');

const { hyperMediaOne } = require('../../transformers/officerTransformer');

exports.getOfficerTickets = async (req, res, next) => {
	const ticket = await Ticket.forge({id: req.params.id}).fetch();

	if (!ticket) return res.status(404).send("No ticket found with the given id");

	const officer = await ticket.officer().fetch();

	const hyperOfficer = hyperMediaOne(req, officer);

	res.status(200).json({ data: hyperOfficer });
}