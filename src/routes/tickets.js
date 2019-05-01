// @ts-check

const express = require('express');
const router = express.Router();


const TicketController = require('../controllers/Ticket/TicketController');

const TicketOfficerController = require('../controllers/Ticket/TicketOfficerController');

router.get('/search', TicketController.searchTickets);

router.get('/', TicketController.getTickets);

router.get('/:id', TicketController.getTicket);

router.post('/', TicketController.createTicket);

// Ticket Officer Controller
router.get('/:id/officers', TicketOfficerController.getOfficerTickets);


module.exports = router;