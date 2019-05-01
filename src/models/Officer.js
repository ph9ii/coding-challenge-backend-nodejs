// @ts-check

const Joi = require("@hapi/joi");

const { Ticket } = require('./Ticket');

const bookshelf = require('../../bookshelf');
bookshelf.plugin('pagination');
bookshelf.plugin('registry');
bookshelf.plugin('visibility');

const Officer = bookshelf.Model.extend({
  tableName: 'officer',
  hidden: ['password_hash', 'password_salt', 'password'],

  tickets: function() {
    return this.hasMany(Ticket, 'Ticket');
  },
  
});

module.exports.Officer = bookshelf.model('Officer', Officer);


/**
* Validate officer fields
*
* @param officer object
*
* @return boolean
*/
function validateOfficer(officer) {
	const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).email()
      .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      .required()
      .label("You must enter a valid email address"),
    password: Joi.string().min(8).max(255)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .required()
      .label(`You password must contain at least one uppercase, 
        numbers, special characters and be at least 8 characters long`)
  };
  return Joi.validate(officer, schema);
}

function validateUpdate(officer) {
  const schema = {
    name: Joi.string().min(3).max(50),
    email: Joi.string().min(3).max(255).email()
      .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      .label("You must enter a valid email address"),
    password: Joi.string().min(8).max(255).required(),
    new_password: Joi.string().min(8).max(255)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .label(`You password must contain at least one uppercase, 
        numbers, special characters and be at least 8 characters long`)
  };
  return Joi.validate(officer, schema);
}

module.exports.validate = validateOfficer;

module.exports.update = validateUpdate;