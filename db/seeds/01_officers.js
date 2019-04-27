const faker = require('faker');
const bcrypt = require('bcrypt');

let createRecord = async (knex, id) => {
  const salt = await bcrypt.genSalt(10);

  return knex('officer').insert({
    id,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: await bcrypt.hash('secret', salt),
    created_at: new Date(),
    updated_at: new Date()
  });
}

exports.seed = (knex, Promise) => {
  return knex('officer').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 100; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};
