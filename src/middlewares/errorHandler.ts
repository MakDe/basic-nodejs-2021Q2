import { ErrorRequestHandler } from 'express';
import logger from '../logger';

const errorHandler: ErrorRequestHandler = (err, _req, res, next): void => {
  logger.log('error', `code: 500, message: ${err.message}`);
  res.status(500).send('Internal server error');

  next();
};

export default errorHandler;
