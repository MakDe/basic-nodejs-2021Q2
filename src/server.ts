/* eslint-disable no-console */
import { createConnection } from 'typeorm';
import { PORT } from './common/config';
import app from './app';
import ormconfig from './db';

createConnection(ormconfig)
  .then(async () => {
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    console.log('DB Error: ', e);
    process.exit(1);
  });
