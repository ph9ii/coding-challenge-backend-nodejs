// @ts-check

const bcrypt = require('bcrypt');

const showAll = require('../../api/apiResponser');

const { 
	Officer, 
	validate,
	update } = require('../../models/Officer');

const {
	hyperMediaAll, 
	hyperMediaOne } = require('../../transformers/officerTransformer');

exports.getOfficers = async (req, res, next) => {

	const officers = await Officer.forge()
		.fetchPage({
			pageSize: req.query.pagesize, // Defaults to 10 if not specified
			page: req.query.page, // Defaults to 1 if not specified
		});

	const hyperOfficers = hyperMediaAll(req, officers.toJSON());

	showAll(req, res, hyperOfficers, officers);

	// res.status(200).send(officers);
}

exports.getOfficer = async (req, res, next) => {

	const officer = await Officer.forge({id: req.params.id}).fetch();
	if (!officer) return res.status(404).send("No officer found with the given id");

	const hyperOfficer = hyperMediaOne(req, officer);

	res.status(200).json({ data: hyperOfficer });
}

exports.createOfficer = async (req, res, next) => {

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const officer = await Officer.forge({ email: req.body.email }).fetch();
	if (officer) return res.status(400).send("Email address already in use");

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(req.body.password, salt);

	const email = req.body.email;

	const name = req.body.name;

	const newOfficer = await Officer.forge({ name, email, password: hash}).save();

    const hyperOfficer = hyperMediaOne(req, newOfficer);

	res.status(201).json({ data: hyperOfficer });
}

exports.updateOfficer = async (req, res, next) => {

	const { error } = update(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const officer = await Officer.forge({id: req.params.id}).fetch();

	if (!officer) 
		return res.status(404).send("No officer found with the given id");

	if (!req.body.password) 
		return res.status(400).send("You must specify a valid old password to update");

	// Check password
	const validPass = await bcrypt.compare(req.body.password, officer.get('password'));
	if (!validPass) return res.status(400).send("Please, check your password");

	if (req.body.name) 
		await officer
		.save({ name: req.body.name }, { patch: true });

	if (req.body.email) {
		const email = await Officer.forge({ email: req.body.email }).fetch();

		// Check if email exist
		if (email) return res.status(400).send("Email address already in use");

		await officer.save({ email: req.body.email }, { patch: true });
	}

	if (req.body.new_password) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(req.body.new_password, salt);

		await officer.save({ password: hash }, { patch: true });
	}

	const hyperOfficer = hyperMediaOne(req, officer);

	res.status(200).json({ data: hyperOfficer });
}


exports.deleteUser = async (req, res, next) => {

	const officer = await Officer.forge({id: req.params.id}).fetch();

	if (!officer) return res.status(404).send("No officer found with the given id");

	officer.destroy();

	const hyperOfficer = hyperMediaOne(req, officer);

	res.status(200).json({ data: hyperOfficer });
}