const { TABLE_NAME_BOARDS } = require('../../common/constants');
const db = require('../../db');
const { findBy, merge, removeBy, replaceBy } = require('../../helpers');

const getAll = async () => db.get(TABLE_NAME_BOARDS);

const getById = async (value) => findBy('id', value, db.get(TABLE_NAME_BOARDS));

const set = async (data) => {
  db.set(TABLE_NAME_BOARDS, merge(data, db.get(TABLE_NAME_BOARDS)));

  return data;
};

const removeById = async (value) => {
  const removed = getById(value);

  db.set(
    TABLE_NAME_BOARDS,
    removeBy('id', value, db.get(TABLE_NAME_BOARDS))
  );

  return removed;
};

const updateById = async (value, newData) => {
  const data = replaceBy('id', value, newData, db.get(TABLE_NAME_BOARDS))

  if (data) {
    db.set(TABLE_NAME_BOARDS, data)
  }

  return getById(value);
};

module.exports = { getAll, getById, set, removeById, updateById };
