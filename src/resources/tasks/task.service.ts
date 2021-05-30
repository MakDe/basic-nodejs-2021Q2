import { ITask } from 'src/resources/tasks/task.types';
import * as tasksRepo from './task.file.repository';

/**
 * Get all tasks.
 * @param {string} boardId - Board id
 * @return {Promise<Array<ITask>>} - Get all tasks
 */
const getTasks = (boardId: string): Promise<Array<ITask>> =>
  tasksRepo.getAll(boardId);

/** Get task by id.
 * @param {string} boardId - Board id
 * @param {string} taskId - Task id
 * @return {Promise<ITask | null | undefined>} - Task
 */
const getTask = (
  boardId: string,
  taskId: string
): Promise<ITask | null | undefined> => tasksRepo.getById(boardId, taskId);

/**
 * Add task.
 * @param {ITask} task - Addable task
 * @return {Promise<ITask>} - Added task
 */
const setTask = (task: ITask): Promise<ITask> => tasksRepo.setById(task);

/**
 * Delete task.
 * @param {string} boardId - Board id
 * @param {string} taskId - Task id
 * @return {Promise<ITask | null | undefined>} - Removed task
 */
const removeTask = (
  boardId: string,
  taskId: string
): Promise<ITask | null | undefined> => tasksRepo.removeById(boardId, taskId);

/**
 * Update task.
 * @param {ITask} task - Updatable task
 * @return {Promise<ITask>} - Updated task
 */
const updateTask = (task: ITask): Promise<ITask | null | undefined> =>
  tasksRepo.update(task.boardId, task.id, task);

export { getTasks, getTask, setTask, removeTask, updateTask };
