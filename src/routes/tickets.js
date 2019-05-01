// @ts-check

const express = require('express');
const router = express.Router();


const TicketController = require('../controllers/Ticket/TicketController');

router.get('/search', TicketController.searchTickets);

router.get('/', TicketController.getTickets);

router.get('/:id', TicketController.getTicket);

router.post('/', TicketController.createTicket);


module.exports = router;