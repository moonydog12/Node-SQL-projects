import express from 'express';
import dotenv from 'dotenv';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import authRouter from './routes/auth';
import jobsRouter from './routes/jobs';

dotenv.config();
const app = express();

app.use(express.json());

// routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT || 8080);
console.log(`listening on port ${process.env.PORT}`);
