// @ts-check

const express = require('express');
const router = express.Router();


const OfficerController = require('../controllers/Officer/OfficerController');


router.get('/', OfficerController.getOfficers);

router.get('/:id', OfficerController.getOfficer);

router.post('/', OfficerController.createOfficer);

router.put('/:id', OfficerController.updateOfficer);

module.exports = router;