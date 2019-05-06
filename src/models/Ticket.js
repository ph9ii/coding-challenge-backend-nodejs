// @ts-check

const Joi = require("@hapi/joi");

require('./Officer');

const { TicketThread } = require('./TicketThread');

const bookshelf = require('../../bookshelf');
bookshelf.plugin('pagination');
bookshelf.plugin('registry');

const Ticket = bookshelf.Model.extend({
  tableName: 'ticket',

  officer: function() {
    return this.belongsTo('Officer', 'officer_id');
  },

  threads: function() {
    return this.hasMany(TicketThread, 'ticket_id');
  },
  
});

module.exports.Ticket = bookshelf.model('Ticket', Ticket);

/**
* Validate ticket fields
*
* @param ticket object
*
* @return boolean
*/
function validateTicket(ticket) {
	const schema = {
    full_name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required()
      .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    description: Joi.string().min(3).max(1000).required(),
    color: Joi.string().min(3).max(20).required(),
    license_number: Joi.string().min(3).max(20).required(),
    type: Joi.string().min(3).max(20).required(),
    datetime: Joi.string().required()
      .regex(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?)|(^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))$/)
      .label(`You must enter a valid date & time format`),
    day_phone: Joi.string().min(7).max(20),
    eve_phone: Joi.string().min(7).max(20),
    mob_phone: Joi.string().min(7).max(20),
  };
  return Joi.validate(ticket, schema);
}

function validateUpdate(ticket) {
  const schema = {
    status: Joi.string().min(3).max(50)
    .regex(/(resolved)|(unsolved)$/)
    .label("Ticket status only can be 'closed' or 'unsolved'"),
    comment: Joi.string().min(3).max(1000),
  };
  return Joi.validate(ticket, schema);
}

module.exports.validate = validateTicket;

module.exports.update = validateUpdate;