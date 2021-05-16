const { TABLE_NAME_TASKS } = require('../../common/constants');
const db = require('../../db');
const {
  findBy,
  merge,
  removeBy,
  replaceBy,
  findByAll,
} = require('../../helpers');

const getAll = async (value) =>
  findByAll('boardId', value, db.get(TABLE_NAME_TASKS));

const getById = async (boardValue, taskValue) => {
  const tasks = findByAll('boardId', boardValue, db.get(TABLE_NAME_TASKS));

  return findBy('id', taskValue, tasks);
};

const setById = async (value, data) => {
  const newData = { ...data, boardId: value };

  db.set(TABLE_NAME_TASKS, merge(newData, db.get(TABLE_NAME_TASKS)));

  return newData;
};

const removeById = async (boardValue, taskValue) => {
  const key = taskValue ? 'id' : 'boardId';
  const value = taskValue || boardValue;

  const removed = getById(value);

  db.set(TABLE_NAME_TASKS, removeBy(key, value, db.get(TABLE_NAME_TASKS)));

  return removed;
};

const update = async (boardValue, taskValue, newData) => {
  const data = replaceBy(
    'id',
    taskValue,
    { ...newData, id: taskValue, boardId: boardValue },
    db.get(TABLE_NAME_TASKS)
  );

  if (data) {
    db.set(TABLE_NAME_TASKS, data);
  }

  return getById(taskValue);
};

const checkAndOverwrite = async (userId) => {
  const data = db.get(TABLE_NAME_TASKS);

  const newData = data.map((task) => {
    if (task.userId === userId) {
      return {
        ...task,
        userId: null,
      };
    }

    return task;
  });

  db.set(TABLE_NAME_TASKS, newData);
};

module.exports = {
  getAll,
  getById,
  setById,
  removeById,
  update,
  checkAndOverwrite,
};
