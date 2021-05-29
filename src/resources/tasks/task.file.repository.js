const { TABLE_NAME_TASKS } = require('../../common/constants');
const db = require('../../db');
const {
  findBy,
  merge,
  removeBy,
  replaceBy,
  findByAll,
} = require('../../helpers');

/** Get all tasks from db.
 * @param {string} value - Board id
 * @return {Array<ITask>} - Tasks
 */
const dbTasksGetAll = async (value) =>
  findByAll('boardId', value, db.get(TABLE_NAME_TASKS));

/** Get task by ids from db.
 * @param {string} boardValue - Board id
 * @param {string | undefined} taskValue - Task id
 * @return {ITask} - Task
 */
const dbTasksGetById = async (boardValue, taskValue) => {
  const tasks = findByAll('boardId', boardValue, db.get(TABLE_NAME_TASKS));

  return taskValue ? findBy('id', taskValue, tasks) : tasks[0];
};

/** Add task to db.
 * @param {ITask} data - Addable task
 * @return {ITask} - Added task
 */
const dbTasksSetById = async (data) => {
  db.set(TABLE_NAME_TASKS, merge(data, db.get(TABLE_NAME_TASKS)));

  return data;
};

/** Delete task from db.
 * @param {string} boardValue - Board id
 * @param {string | undefined} taskValue - Task id
 * @return {ITask} - Removed task
 */
const dbTasksRemoveById = async (boardValue, taskValue) => {
  const key = taskValue ? 'id' : 'boardId';
  const removed = dbTasksGetById(boardValue, taskValue);

  if (removed) {
    db.set(
      TABLE_NAME_TASKS,
      removeBy(key, taskValue || boardValue, db.get(TABLE_NAME_TASKS))
    );
  }

  return removed;
};

/** Update task in db.
 * @param {string} boardValue - Board id
 * @param {string} taskValue - Task id
 * @param {ITask} newData - New task data
 * @return {ITask} - Updated Task
 */
const dbTasksUpdate = async (boardValue, taskValue, newData) => {
  const data = replaceBy('id', taskValue, newData, db.get(TABLE_NAME_TASKS));

  if (data) {
    db.set(TABLE_NAME_TASKS, data);
  }

  return dbTasksGetById(boardValue, taskValue);
};

/** Check and nullify userId values in db.
 * @param {string} userId - User id
 * @return {void}
 */
const dbTasksCheckAndOverwrite = async (userId) => {
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
  getAll: dbTasksGetAll,
  getById: dbTasksGetById,
  setById: dbTasksSetById,
  removeById: dbTasksRemoveById,
  update: dbTasksUpdate,
  checkAndOverwrite: dbTasksCheckAndOverwrite,
};
