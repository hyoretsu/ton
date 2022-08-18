// import { DataType, QueryInterface } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

const Postgres = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.POSTGRES_PORT),
  dialect: 'postgres',
  models: [`${__dirname}/entities`],
});

// const queryInterface = new QueryInterface(Postgres);
// queryInterface.

export default Postgres;
