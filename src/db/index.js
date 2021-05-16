const JSONdb = require('simple-json-db');
const path = require('path');
const {
  TABLE_NAME_USERS,
  TABLE_NAME_BOARDS,
  TABLE_NAME_TASKS,
} = require('../common/constants');

const dirPath = path.join(__dirname, '/database.json');
const db = new JSONdb(dirPath, {
  asyncWrite: true,
  syncOnWrite: false,
});

const createTable = (name) => {
  if (!db.has(name)) {
    db.set(name, []);
  }
};

createTable(TABLE_NAME_USERS);
createTable(TABLE_NAME_BOARDS);
createTable(TABLE_NAME_TASKS);

module.exports = db;
