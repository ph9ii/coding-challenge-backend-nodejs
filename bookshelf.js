const currentEnv = process.env.NODE_ENV;

const knex = require('knex');
const bookshelf = require('bookshelf');
const knexConfig = require('./knexfile');
if (currentEnv === 'test') {
    module.exports = bookshelf(knex(knexConfig.test));
} else {
    module.exports = currentEnv === 'development' 
    ? bookshelf(knex(knexConfig.development)) : bookshelf(knex(knexConfig.production));
}
