const { TABLE_NAME_USERS } = require('../../common/constants');

const db = require('../../db');
const { findBy, merge, removeBy, replaceBy } = require('../../helpers');

const getAll = async () => db.get(TABLE_NAME_USERS);

const getById = async (value) => findBy('id', value, db.get(TABLE_NAME_USERS));

const set = async (data) => {
  db.set(TABLE_NAME_USERS, merge(data, db.get(TABLE_NAME_USERS)));

  return data;
};

const removeById = async (value) => {
  const removed = getById(value);

  db.set(TABLE_NAME_USERS, removeBy('id', value, db.get(TABLE_NAME_USERS)));

  return removed;
};

const updateById = async (value, newData) => {
  const data = replaceBy('id', value, newData, db.get(TABLE_NAME_USERS));

  if (data) {
    db.set(TABLE_NAME_USERS, data);
  }

  return getById(value);
};

module.exports = { getAll, getById, set, removeById, updateById };
