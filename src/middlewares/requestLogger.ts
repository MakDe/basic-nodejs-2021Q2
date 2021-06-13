import { RequestHandler } from 'express';
import { finished } from 'stream';
import logger from '../logger';

const requestLogger: RequestHandler = (req, res, next): void => {
  const { method, url, params, query, body } = req;

  next();

  finished(req, res, () => {
    const { statusCode } = res;
    logger.log(
      'info',
      `${method} ${url} code: ${statusCode} params: ${JSON.stringify(
        params
      )} query: ${JSON.stringify(query)} body: ${JSON.stringify(body)}`
    );
  });
};

export default requestLogger;
