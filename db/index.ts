import JSONdb from 'simple-json-db';
import path from 'path';
import { FILE_DB } from '../src/common/config';
import {
  TABLE_NAME_USERS,
  TABLE_NAME_BOARDS,
  TABLE_NAME_TASKS,
} from '../src/common/constants';

const dirPath = path.join(__dirname, '/database.json');
const db = new JSONdb(dirPath, {
  asyncWrite: false,
  syncOnWrite: FILE_DB,
});

/** Create table in db.
 * @param {string} name - Table name.
 * @return {void}
 */
const createTable = (
  name:
    | typeof TABLE_NAME_USERS
    | typeof TABLE_NAME_BOARDS
    | typeof TABLE_NAME_TASKS
) => {
  if (!db.has(name)) {
    db.set(name, []);
  }
};

createTable(TABLE_NAME_USERS);
createTable(TABLE_NAME_BOARDS);
createTable(TABLE_NAME_TASKS);

export default db;
