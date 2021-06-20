import { ITask } from 'src/resources/tasks/task.types';
import { getManager } from 'typeorm';
import Task from './task.model';

/** Get all tasks from db.
 * @return {Array<ITask>} - Tasks
 */
const dbTasksGetAll = async (): Promise<Array<ITask>> => {
  const repo = getManager().getRepository(Task);

  return repo.find();
};

/** Get task by ids from db.
 * @param {string} taskValue - Task id
 * @return {ITask | null | undefined} - Task
 */
const dbTasksGetById = async (
  taskValue: string
): Promise<ITask | null | undefined> => {
  const repo = getManager().getRepository(Task);
  const result = await repo.findOne({ id: taskValue });

  return result;
};

/** Add task to db.
 * @param {ITask} data - Addable task
 * @return {ITask} - Added task
 */
const dbTasksSetById = async (data: ITask): Promise<ITask> => {
  const repo = getManager().getRepository(Task);
  const created = await repo.create(data);

  return repo.save(created);
};

/** Delete task from db.
 * @param {string} boardValue - Board id
 * @param {string | number} taskValue - Task id
 * @return {ITask | null | undefined} - Removed task
 */
const dbTasksRemoveById = async (
  boardValue: string,
  taskValue?: string
): Promise<ITask | null | undefined> => {
  const repo = getManager().getRepository(Task);
  let removable;

  if (taskValue) {
    removable = await repo.findOne({ id: taskValue });
    await repo.delete({ id: taskValue });
  } else if (boardValue) {
    const tasks = await repo.find({ boardId: boardValue });

    tasks.forEach(async (item) => {
      await repo.delete({ id: item.id });
    });
  }

  return removable || null;
};

/** Update task in db.
 * @param {string | number | null} boardValue - Board id
 * @param {string} taskValue - Task id
 * @param {ITask} newData - New task data
 * @return {ITask | null | undefined} - Updated Task
 */
const dbTasksUpdate = async (
  _boardValue: string | number | null,
  taskValue: string,
  newData: ITask
): Promise<ITask | null> => {
  const repo = getManager().getRepository(Task);
  const found = await repo.findOne({ id: taskValue });

  if (found) {
    const result = await repo.save({ ...found, ...newData });

    return result;
  }

  return null;
};

/** Check and nullify userId values in db.
 * @param {string} userId - User id
 * @return {void}
 */
const dbTasksCheckAndOverwrite = async (
  userId: string | null | undefined
): Promise<void> => {
  const repo = getManager().getRepository(Task);

  await repo
    .createQueryBuilder()
    .update()
    .set({ userId: null })
    .where('userId = :userId', { userId })
    .execute()
    .catch(() => ({}));
};

export {
  dbTasksGetAll as getAll,
  dbTasksGetById as getById,
  dbTasksSetById as setById,
  dbTasksRemoveById as removeById,
  dbTasksUpdate as update,
  dbTasksCheckAndOverwrite as checkAndOverwrite,
};
