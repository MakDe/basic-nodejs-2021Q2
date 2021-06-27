/* eslint-disable no-console */
import { createConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PORT } from './common/config';
import app from './app';
import ormconfig from './db';
import * as usersService from './resources/users/user.service';

createConnection(ormconfig)
  .then(async () => {
    await usersService.setUser({
      id: uuidv4(),
      name: 'admin',
      login: 'admin',
      password: 'admin',
    });
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    console.log('DB Error: ', e);
    process.exit(1);
  });
