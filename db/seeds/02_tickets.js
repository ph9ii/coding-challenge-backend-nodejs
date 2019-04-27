const faker = require('faker');

let createRecord = (knex, id) => {
  return knex('ticket').insert({
    id,
    officer_id: faker.random.number({'min': 1, 'max': 9}),
    name: faker.name.findName(),
    email: faker.internet.email(),
    status: 'closed',
    created_at: new Date(),
    updated_at: new Date()
  });
}

exports.seed = (knex, Promise) => {
  return knex('ticket').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 40; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};
