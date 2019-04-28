const faker = require('faker');
const moment = require('moment');

let createRecord = (knex, id) => {
  return knex('ticket').insert({
    id,
    officer_id: faker.random.number({'min': 1, 'max': 9}),
    full_name: faker.name.findName(),
    license_number: faker.random.number({'min': 1001, 'max': 5001}),
    email: faker.internet.email(),
    color: faker.commerce.color(),
    type: faker.company.catchPhrase(),
    description: faker.lorem.sentences(),
    datetime: moment(faker.date.recent()).format('YYYY-MM-DD HH-mm-ss'),
    status: 'closed',
    created_at: new Date(),
    updated_at: new Date()
  });
}

exports.seed = (knex, Promise) => {
  return knex('ticket').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 15; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};
