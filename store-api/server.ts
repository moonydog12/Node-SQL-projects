import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import notFoundMiddleware from './src/middleware/not-found';
import errorHandlerMiddleware from './src/middleware/error-handler';
import client from './src/db';
import productsRouter from './src/routes/products';

dotenv.config();
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());

// routes
app.get('/', async (req: Request, res: Response) => {
  const result = await client.query('SELECT * FROM tasks');
  res.send(result.rows);
});

app.use('/api/v1/products', productsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function startServer() {
  try {
    app.listen(port);
    await client.connect();
    console.log(`Listeining on port ${port}`);
  } catch (error) {
    console.log(error);
  }
}

startServer();
