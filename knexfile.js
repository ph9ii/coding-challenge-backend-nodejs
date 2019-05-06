// @ts-check

require('dotenv').config();
const config = require('config');

module.exports = {
  test: {
    client: 'sqlite3',
    connection: { 
      filename: "./mydb.sqlite",
      // filename: ':memory:',
    },
    useNullAsDefault: true,
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

  development: {
    client: 'mysql',
    connection: {
      host: config.get('MYSQL_DB_HOST'),
      database: config.get('MYSQL_DB_NAME'),
      user:     config.get('MYSQL_DB_USER'),
      password: config.get('MYSQL_DB_PASSWORD'),
      port: config.get('MYSQL_DB_PORT'),
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
      host: config.get('MYSQL_DB_HOST'),
      database: config.get('MYSQL_DB_NAME'),
      user:     config.get('MYSQL_DB_USER'),
      password: config.get('MYSQL_DB_PASSWORD'),
      port: config.get('MYSQL_DB_PORT'),
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
      host: config.get('MYSQL_DB_HOST'),
      database: config.get('MYSQL_DB_NAME'),
      user:     config.get('MYSQL_DB_USER'),
      password: config.get('MYSQL_DB_PASSWORD'),
      port: config.get('MYSQL_DB_PORT'),
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