// @ts-check

const express = require('express');
const router = express.Router();


const TicketController = require('../controllers/Ticket/TicketController');


router.get('/', TicketController.getTickets);

router.get('/:id', TicketController.getTicket);

module.exports = router;