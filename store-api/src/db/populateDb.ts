import { Client } from 'pg';
import dotenv from 'dotenv';
import data from '../../products';

dotenv.config({ path: `${__dirname}/../../../.env` });

const client = new Client({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT as string, 10) || 5432,
});

async function populateDb() {
  try {
    await client.connect();

    // Iterate through each product and insert into the database
    data.map(async (product) => {
      const { name, price, company, rating = 4.5, featured = false } = product;
      const query = {
        text: 'INSERT INTO products(product_name, product_price, product_company, product_rating, product_featured) VALUES($1, $2, $3, $4, $5)',
        values: [name, price, company, rating, featured],
      };

      await client.query(query);
      console.log(`Inserted product: ${name}`);
    });

    console.log('All products inserted successfully.');
  } catch (error) {
    console.error('Error inserting products:', error);
  } finally {
    console.log('close the connection');
    await client.end();
  }
}

populateDb();
