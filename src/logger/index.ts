import winston from 'winston';
import { LOGS_COMBINED_PATH, LOGS_ERROR_PATH } from '../common/constants';

const logger = winston.createLogger({
  level: 'http',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: LOGS_ERROR_PATH,
      level: 'error',
    }),
    new winston.transports.File({ filename: LOGS_COMBINED_PATH }),
  ],
});

export default logger;
