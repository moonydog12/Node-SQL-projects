import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWD,
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
});

function query(text: string, params?: any) {
  return pool.query(text, params);
}

export default query;
