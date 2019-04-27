// @ts-check

require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.MYSQL_DB_NAME,
      user:     process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: process.env.MYSQL_DB_NAME,
      user:     process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
};