const faker = require('faker');

let createRecord = (knex, id) => {
  return knex('ticket_thread').insert({
    id,
    ticket_id: faker.random.number({'min': 1, 'max': 9}),
    comment: faker.lorem.sentences(),
    created_at: new Date(),
    updated_at: new Date()
  });
}

exports.seed = (knex, Promise) => {
  return knex('ticket_thread').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 15; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};
