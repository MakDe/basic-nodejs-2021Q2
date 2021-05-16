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

  return taskValue ? findBy('id', taskValue, tasks) : tasks[0];
};

const setById = async (value, data) => {
  db.set(TABLE_NAME_TASKS, merge(data, db.get(TABLE_NAME_TASKS)));

  return data;
};

const removeById = async (boardValue, taskValue) => {
  const key = taskValue ? 'id' : 'boardId';
  const removing = getById(boardValue, taskValue);

  if (removing) {
    db.set(
      TABLE_NAME_TASKS,
      removeBy(key, taskValue || boardValue, db.get(TABLE_NAME_TASKS))
    );
  }


  return removing;
};

const update = async (boardValue, taskValue, newData) => {
  const data = replaceBy('id', taskValue, newData, db.get(TABLE_NAME_TASKS));

  if (data) {
    db.set(TABLE_NAME_TASKS, data);
  }

  return getById(boardValue, taskValue);
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
