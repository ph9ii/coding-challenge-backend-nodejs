// @ts-check

const EventEmitter = require('./EventEmitter');
const assignNewCaseOnOfficerAvail = require('./assignNewCase');


EventEmitter.on('officer-avail', assignNewCaseOnOfficerAvail);
