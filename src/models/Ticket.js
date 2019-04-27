// @ts-check

const Joi = require("@hapi/joi");

const bookshelf = require('../../bookshelf');
bookshelf.plugin('pagination');
bookshelf.plugin('registry');

const Ticket = bookshelf.Model.extend({
  tableName: 'ticket',
  
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
    email: Joi.string().min(3).max(255)
      .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    description: Joi.string().min(3).max(1000).required(),
    color: Joi.string().min(3).max(20).required(),
    license_number: Joi.string().min(3).max(20).required(),
    type: Joi.string().min(3).max(20).required(),
    datetime: Joi.date().min(3).max(20).required(),
  };
  return Joi.validate(ticket, schema);
}

function validateUpdate(ticket) {
  const schema = {
    full_name: Joi.string().min(3).max(50),
    email: Joi.string().min(3).max(255)
      .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    description: Joi.string().min(3).max(1000),
    color: Joi.string().min(3).max(20),
    license_number: Joi.string().min(3).max(20),
    type: Joi.string().min(3).max(20),
    datetime: Joi.date().min(3).max(20),
  };
  return Joi.validate(ticket, schema);
}

module.exports.validate = validateTicket;

module.exports.update = validateUpdate;