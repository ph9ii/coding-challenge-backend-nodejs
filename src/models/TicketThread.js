// @ts-check

const Joi = require("@hapi/joi");

const bookshelf = require('../../bookshelf');
bookshelf.plugin('pagination');
bookshelf.plugin('registry');

const TicketThread = bookshelf.Model.extend({
  tableName: 'ticket_thread',
  
});

module.exports.TicketThread = bookshelf.model('TicketThread', TicketThread);

