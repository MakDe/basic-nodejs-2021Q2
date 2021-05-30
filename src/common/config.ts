import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  FILE_DB,
} = process.env;

const authMode = AUTH_MODE === 'true';
const fileDb = FILE_DB === 'true';

export {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  authMode as AUTH_MODE,
  fileDb as FILE_DB,
};
