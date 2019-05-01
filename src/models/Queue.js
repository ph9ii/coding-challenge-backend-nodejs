const mongoose = require('mongoose');

const queueSchema = mongoose.Schema({
	full_name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	email: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	license_number: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	color: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	type: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	description: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 255
	},
	day_phone: {
		type: String,
		minLength: 3,
		maxLength: 100
	},
	eve_phone: {
		type: String,
		minLength: 3,
		maxLength: 100
	},
	mob_phone: {
		type: String,
		minLength: 3,
		maxLength: 100
	},
	datetime: { type: Date, default: Date.now }
});

module.exports.Queue = mongoose.model('Queue', queueSchema);