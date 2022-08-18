require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
  },
};
