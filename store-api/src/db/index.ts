import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT as string, 10) || 5432,
});

export default client;
