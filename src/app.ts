import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import cors from 'cors';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import authRouter from './resources/auth/auth.router';
import loggerMiddleware from './middlewares/requestLogger';
import errorHandleMiddleware from './middlewares/errorHandler';
import authMiddleware from './middlewares/authChecker';
import logger from './logger';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());

app.use(express.json());

app.use(loggerMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/login', authRouter);

app.use(authMiddleware);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use(errorHandleMiddleware);

process.on('uncaughtException', (err: Error): void => {
  logger.log('error', `uncaughtException: ${err.message}`);

  process.exit(1);
});

process.on('unhandledRejection', (_, promise) => {
  promise.catch((err: Error) => {
    logger.log('error', `unhandledRejection: ${err.message}`);

    process.exit(1);
  });
});

export default app;
