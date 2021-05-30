import { ITask } from 'src/resources/tasks/task.types';
import { TABLE_NAME_TASKS } from '../../common/constants';
import db from '../../db';

import { findBy, merge, removeBy, replaceBy, findByAll } from '../../helpers';

/** Get all tasks from db.
 * @param {string} value - Board id
 * @return {Array<ITask>} - Tasks
 */
const dbTasksGetAll = async (value: string): Promise<Array<ITask>> =>
  findByAll('boardId', value, <Array<ITask>>db.get(TABLE_NAME_TASKS));

/** Get task by ids from db.
 * @param {string | number | null} boardValue - Board id
 * @param {string | number | null | undefined} taskValue - Task id
 * @return {ITask | null | undefined} - Task
 */
const dbTasksGetById = async (
  boardValue: string | number | null,
  taskValue: string | number | null | undefined
): Promise<ITask | null | undefined> => {
  const tasks = findByAll(
    'boardId',
    boardValue,
    <Array<ITask>>db.get(TABLE_NAME_TASKS)
  );

  return taskValue ? findBy('id', taskValue, tasks) : tasks[0];
};

/** Add task to db.
 * @param {ITask} data - Addable task
 * @return {ITask} - Added task
 */
const dbTasksSetById = async (data: ITask): Promise<ITask> => {
  db.set(TABLE_NAME_TASKS, merge(data, <Array<ITask>>db.get(TABLE_NAME_TASKS)));

  return data;
};

/** Delete task from db.
 * @param {string} boardValue - Board id
 * @param {string | undefined} taskValue - Task id
 * @return {ITask | null | undefined} - Removed task
 */
const dbTasksRemoveById = async (
  boardValue: string,
  taskValue?: string | undefined
): Promise<ITask | null | undefined> => {
  const key = taskValue ? 'id' : 'boardId';
  const removed = await dbTasksGetById(boardValue, taskValue);

  if (removed) {
    db.set(
      TABLE_NAME_TASKS,
      removeBy(
        key,
        taskValue || boardValue,
        <Array<ITask>>db.get(TABLE_NAME_TASKS)
      )
    );
  }

  return removed;
};

/** Update task in db.
 * @param {string | number | null} boardValue - Board id
 * @param {string} taskValue - Task id
 * @param {ITask} newData - New task data
 * @return {ITask | null | undefined} - Updated Task
 */
const dbTasksUpdate = async (
  boardValue: string | number | null,
  taskValue: string | number | null | undefined,
  newData: ITask
): Promise<ITask | null | undefined> => {
  const data = replaceBy(
    'id',
    taskValue,
    newData,
    <Array<ITask>>db.get(TABLE_NAME_TASKS)
  );

  if (data) {
    db.set(TABLE_NAME_TASKS, data);
  }

  return dbTasksGetById(boardValue, taskValue);
};

/** Check and nullify userId values in db.
 * @param {string} userId - User id
 * @return {void}
 */
const dbTasksCheckAndOverwrite = async (userId: string): Promise<void> => {
  const data = <Array<ITask>>db.get(TABLE_NAME_TASKS);

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

export {
  dbTasksGetAll as getAll,
  dbTasksGetById as getById,
  dbTasksSetById as setById,
  dbTasksRemoveById as removeById,
  dbTasksUpdate as update,
  dbTasksCheckAndOverwrite as checkAndOverwrite,
};
