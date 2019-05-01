// @ts-check

const showAll = require('../../api/apiResponser');

const EventEmitter = require('../../events/EventEmitter');

const { Officer } = require('../../models/Officer');

const { TicketThread } = require('../../models/TicketThread');

const { 
	Ticket, 
	update } = require('../../models/Ticket');

const { hyperMediaOne, hyperMediaAll } = require('../../transformers/ticketTransformer');

exports.updateTicket = async (req, res, next) => {
	const { error } = update(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const officer = await Officer.forge({id: req.params.officer_id}).fetch();
	if (!officer) return res.status(404).send("No officer found with the given id");

	const ticket = await Ticket.forge({id: req.params.ticket_id}).fetch();
	if (!ticket) return res.status(404).send("No case found with the given id");

	if (ticket.get('officer_id') !== officer.get('id')) 
		return res.status(400).send("This case assigned to a different officer");

	if (ticket.get('status') === 'resolved') 
		return res.status(400).send("You cannot update, case already resolved");

	if (req.body.comment) {
		await TicketThread.forge({ 
			ticket_id: ticket.get('id'),
			comment: req.body.comment,
		}).save();
	}

	if (req.body.status) {
		await officer.save({ avail: true }, { patch: true });
		EventEmitter.emit('officer-avail', officer);

		await ticket.save({ status: req.body.status }, { patch: true });
	}

	const hyperTicket = hyperMediaOne(req, ticket);

	res.status(200).json({ data: hyperTicket, comment: req.body.comment });
}
