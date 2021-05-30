import * as tasksRepo from './task.file.repository';

/**
 * Get all tasks.
 * @param {string} boardId - Board id
 * @return {Promise<Array<ITask>>} - Get all tasks
 */
const getTasks = (boardId) => tasksRepo.getAll(boardId);

/** Get task by id.
 * @param {string} boardId - Board id
 * @param {string} taskId - Task id
 * @return {Promise<ITask>} - Task
 */
const getTask = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

/**
 * Add task.
 * @param {ITask} task - Addable task
 * @return {Promise<ITask>} - Added task
 */
const setTask = (task) => tasksRepo.setById(task);

/**
 * Delete task.
 * @param {string} boardId - Board id
 * @param {string} taskId - Task id
 * @return {Promise<ITask>} - Removed task
 */
const removeTask = (boardId, taskId) => tasksRepo.removeById(boardId, taskId);

/**
 * Update task.
 * @param {ITask} task - Updatable task
 * @return {Promise<ITask>} - Updated task
 */
const updateTask = (task) => tasksRepo.update(task.boardId, task.id, task);

export { getTasks, getTask, setTask, removeTask, updateTask };
