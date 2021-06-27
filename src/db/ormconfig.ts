import { ConnectionOptions } from 'typeorm';
import { HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } from '../common/config';

import User from '../resources/users/user.model';
import Board from '../resources/boards/board.model';
import Column from '../resources/boards/board.column.model';
import Task from '../resources/tasks/task.model';

export default {
  type: 'postgres',
  database: DB_NAME,
  host: HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  synchronize: false,
  logging: false,
  entities: [User, Board, Column, Task],
  migrations: ['./src/migrations/**/*.ts'],
  cli: {
    migrationsDir: './src/migrations',
  },
} as ConnectionOptions;
