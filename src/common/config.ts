import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  AUTH_MODE,
} = process.env;
