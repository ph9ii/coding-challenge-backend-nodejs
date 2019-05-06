
let server;

const request = require('supertest');
const winston = require('winston');

const knexConfig = require('../../../knexfile');
const knex = require('knex')(knexConfig.test);

const { Officer } = require('../../../src/models/Officer');

describe('/api/officers', () => { 
	let officer;

	beforeEach(async (done) => { 
		server = require('../../../server');

		return knex.migrate.rollback()
			.then(() => {
				return knex.migrate.latest()
				.then(async () => {
					officer = await Officer.forge({
						name: 'officer1',
						email: 'officer1@domain.com',
						password: 'secret'
					}).save();
				    done();
				})
				.catch ((ex) => {
					console.error('Latest failed! ', ex.message);
				});
			})
			.catch ((ex) => {
				console.error('Rollback failed! ', ex.message);
			});
	});
	afterEach(async (done) => {
		await server.close();
		
		return knex.migrate.rollback()
			.then(() => {
				done();
			})
			.catch ((ex) => {
				console.error('Rollback failed! ', ex.message);
			});
	});

	describe('GET /', () => {
		it('should return all officers', async () => {
            const anotherOfficer = await Officer.forge({ 
				name: 'anotherOfficer',
				email: 'another@dom.com',
				password: 'secret'
			}).save();

			const res = await request(server).get('/api/officers');
			expect(res.status).toBe(200);
			
			expect(res.body.data.some(g => g.name === 'officer1')).toBeTruthy();
			expect(res.body.data.some(g => g.name === 'anotherOfficer')).toBeTruthy();
		});
	});

	describe('GET /:id', () => {
		it('should return an officer if given id is valid', async () => {
			const res = await request(server).get('/api/officers/' + officer.get('id'));

			expect(res.status).toBe(200);
			expect(res.body.data).toHaveProperty('name', officer.get('name'));
		});

		it('should return 404 if no officer with the given id', async () => {
			const id = '123';

			const res = await request(server).get('/api/officers/' + id);

			expect(res.status).toBe(404);
		});
	});

	describe('POST /', () => {
		let name;
		let email;
		let password;

		const exec = () => {
			return request(server)
				.post('/api/officers')
				.send({ name, email, password });
		}

		beforeEach(() => {
			name = 'officer2';
			email = 'officer2@domain.com'
			password = 'YU0op0kl$';
		});

		it('should return 400 if officer name is empty', async () => {
			name = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if officer name is less than 3', async () => {
			name = 'ab';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if officer name is more than 50', async () => {
			name = new Array(52).join('a');

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if officer email is empty', async () => {
			email = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if officer email is not valid', async () => {
			email = 'abc@ex';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if officer email is duplicated', async () => {
			email = 'old@domain.com';

			await Officer.forge({ name, email, password }).save();

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if password is empty', async () => {
			password = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if officer password is not valid(strong password)', async () => {
			password = 'abcde';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should save the officer if name, email, password is valid', async () => {
			await Officer.where('id', '!=', '0')
			.destroy();

			const res = await exec();

			const newOfficer = Officer.forge({email: email}).fetch();

			expect(res.status).toBe(201);
			expect(newOfficer).not.toBeNull();
		});

		it('should return the officer if it is valid', async () => {
			await Officer.where('id', '!=', '0')
			.destroy();

			const res = await exec();

			expect(res.status).toBe(201);
			expect(res.body.data).toHaveProperty('id');
			expect(res.body.data).toHaveProperty('name', 'officer2');
		});
	});
});

