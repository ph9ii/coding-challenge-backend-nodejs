// @ts-check

const express = require('express');
const router = express.Router();


const OfficerController = require('../controllers/Officer/OfficerController');

const OfficerTicketController = require('../controllers/Officer/OfficerTicketController');


router.get('/', OfficerController.getOfficers);

router.get('/:id', OfficerController.getOfficer);

router.post('/', OfficerController.createOfficer);

router.put('/:id', OfficerController.updateOfficer);

// Office Ticket Controller
router.put('/:officer_id/tickets/:ticket_id', OfficerTicketController.updateTicket);

router.get('/:id/tickets', OfficerTicketController.getOfficerTickets);

module.exports = router;