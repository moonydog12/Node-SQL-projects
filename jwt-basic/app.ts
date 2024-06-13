import dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import mainRouter from './routes';

const app = express();
dotenv.config();

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Server is listening on port ${port}...`);
