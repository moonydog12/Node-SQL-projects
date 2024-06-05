import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWD,
  database: process.env.PG_DATABASE,
  logging: false,
});

export default sequelize;
