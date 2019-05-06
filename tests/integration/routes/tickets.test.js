
let server;

const request = require('supertest');
const winston = require('winston');

const faker = require('faker');
const moment = require('moment');

const knexConfig = require('../../../knexfile');
const knex = require('knex')(knexConfig.test);

const { Officer } = require('../../../src/models/Officer');

const { Ticket } = require('../../../src/models/Ticket');

const { Queue } = require('../../../src/models/Queue');

describe('/api/tickets', () => { 
    let ticket;
    let officer;
    let datetime;

	beforeEach(async (done) => { 
        server = require('../../../server');

	    datetime = moment(faker.date.recent()).format('YYYY-MM-DD HH-mm-ss');

		return knex.migrate.rollback()
			.then(() => {
				return knex.migrate.latest()
				.then(async () => {
                    officer = await Officer.forge({
						name: 'officer1',
						email: 'officer1@domain.com',
                        password: 'secret',
                        avail: true
                    }).save();
                    
					ticket = await Ticket.forge({
						full_name: 'Person name1',
						email: 'ticket1@domain.com',
                        license_number: 'abc 123',
                        color: 'white',
                        type: 'type a',
                        description: 'some description',
                        datetime: datetime,
                        officer_id: officer.get('id')
                    }).save();
                    
				    done();
				})
				.catch ((ex) => {
					console.error('Latest failed! ', ex.message);
				});
			})
			.catch ((ex) => {
				console.error('Rollback beforeEach failed! ', ex.message);
			});
	});
	afterEach(async (done) => {
		await server.close();
		
		return knex.migrate.rollback()
			.then(() => {
				done();
			})
			.catch ((ex) => {
				console.error('Rollback afterEach failed! ', ex.message);
			});
	});

	describe('GET /', () => {
		it('should return all tickets', async () => {
            const anotherTicket = await Ticket.forge({
                full_name: 'Person name2',
                email: 'ticket2@domain.com',
                license_number: 'abc 123',
                color: 'blue',
                type: 'type b',
                description: 'some description',
                datetime: datetime,
                officer_id: officer.get('id')
            }).save();

            const res = await request(server).get('/api/tickets');
            
			expect(res.status).toBe(200);
			
			expect(res.body.data.some(g => g.full_name === 'Person name1')).toBeTruthy();
			expect(res.body.data.some(g => g.full_name === 'Person name2')).toBeTruthy();
		});
	});

	describe('GET /:id', () => {
		it('should return an ticket if given id is valid', async () => {
			const res = await request(server).get('/api/tickets/' + ticket.get('id'));

			expect(res.status).toBe(200);
			expect(res.body.data).toHaveProperty('full_name', ticket.get('full_name'));
		});

		it('should return 404 if no ticket with the given id', async () => {
			const id = '123';

			const res = await request(server).get('/api/tickets/' + id);

			expect(res.status).toBe(404);
		});
    });
    
    describe('GET /search', () => {
        let fullname;

        beforeEach(async () => {
            fullname = 'Person name1';
        });

		it('should return tickets that match the given search field only', async () => {
            const anotherTicket = await Ticket.forge({
                full_name: 'Person name2',
                email: 'ticket2@domain.com',
                license_number: 'abc 123',
                color: 'blue',
                type: 'type b',
                description: 'some description',
                datetime: datetime,
                officer_id: officer.get('id')
            }).save();

            const res = await request(server).get('/api/tickets/search?fname=' + fullname);

            expect(res.status).toBe(200);
            expect(res.body.data.some(g => g.full_name === 'Person name1')).toBeTruthy();
            expect(res.body.data.some(g => g.full_name === 'Person name2')).toBeFalsy();
		});

		it('should return 404 if given search field not matches any ticket', async () => {
			const fullname = 'abc';

			const res = await request(server).get('/api/tickets/search?fname=' + fullname);

			expect(res.status).toBe(404);
		});
	});

	describe('POST /', () => {
		let full_name;
		let email;
        let license_number;
        let color;
        let type;
        let description;
        let newDatetime;

		const exec = () => {
			return request(server)
			.post('/api/tickets')
            .send({ 
                full_name, email, license_number, color, type, 
                description, datetime: newDatetime
            });
		}

		beforeEach(() => {
			full_name = 'newTicket person name';
			email = 'newPerson@domain.com'
            license_number = 'abc 123';
            color = 'abc',
            type = 'abc',
            description = 'abc',
            newDatetime = new Date();
		});

		it('should return 400 if full name is empty', async () => {
			full_name = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if full name is less than 3', async () => {
			full_name = 'ab';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if full name is more than 50', async () => {
			full_name = new Array(52).join('a');

			const res = await exec();

			expect(res.status).toBe(400);
        });
        
        it('should return 400 if color is empty', async () => {
			color = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if color is less than 3', async () => {
			color = 'ab';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if color is more than 20', async () => {
			color = new Array(22).join('a');

			const res = await exec();

			expect(res.status).toBe(400);
        });
        
        it('should return 400 if license number is empty', async () => {
			license_number = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if license number is less than 3', async () => {
			license_number = 'ab';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if license number is more than 20', async () => {
			license_number = new Array(22).join('a');

			const res = await exec();

			expect(res.status).toBe(400);
        });
        
        it('should return 400 if type is empty', async () => {
			type = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if type is less than 3', async () => {
			type = 'ab';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if type is more than 20', async () => {
			type = new Array(22).join('a');

			const res = await exec();

			expect(res.status).toBe(400);
        });
        
        it('should return 400 if datetime is empty', async () => {
			newDatetime = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});
        
        it('should return 400 if datetime is not a valid datetime format', async () => {
			newDatetime = 'abcd123';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if email is empty', async () => {
			email = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if email is not valid', async () => {
			email = 'abc@ex';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if description is empty', async () => {
			description = '';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if description is less than 3', async () => {
			description = 'ab';

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if full description is more than 1000', async () => {
			description = new Array(1002).join('a');

			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should save the ticket if all fields is valid', async () => {
			await Ticket.where('id', '!=', '0')
			.destroy();

            const res = await exec();

            const newTicket = await Ticket.forge({full_name: full_name}).fetch();

			expect(res.status).toBe(201);
			expect(newTicket).not.toBeNull();
		});

		it('should return the ticket if it is valid', async () => {
			await Ticket.where('id', '!=', '0')
			.destroy();

			const res = await exec();

			expect(res.status).toBe(201);
			expect(res.body.data).toHaveProperty('id');
			expect(res.body.data).toHaveProperty('full_name', 'newTicket person name');
        });
        
        it('should save the ticket to queue if all fields is valid, and no avail officer', 
            async () => {
            
			await Ticket.where('id', '!=', '0')
            .destroy();
            
            await officer.save({ avail: false }, { patch: true });

            const res = await exec();

            const notQueueTicket = await Ticket.forge({full_name: full_name}).fetch();

            const queueTicket = await Queue.find({full_name: full_name});

			expect(res.status).toBe(201);
            expect(notQueueTicket).toBeNull();
            expect(queueTicket).not.toBeNull();
		});

		it('should return the ticket from queue if it is valid', async () => {
			await Ticket.where('id', '!=', '0')
            .destroy();

            await officer.save({ avail: false }, { patch: true });

            const queueTicket = await Queue.find({full_name: full_name});

			const res = await exec();

			expect(res.status).toBe(201);
			expect(res.body.data).toHaveProperty('_id');
			expect(res.body.data).toHaveProperty('full_name', 'newTicket person name');
		});
	});
});

