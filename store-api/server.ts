import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/db';
import 'express-async-errors';
import notFoundMiddleware from './src/middleware/not-found';
import errorHandlerMiddleware from './src/middleware/error-handler';
import productsRouter from './src/routes/products';

dotenv.config();
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v1/products', productsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function startServer() {
  await sequelize.authenticate();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

startServer();
