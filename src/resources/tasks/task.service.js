const tasksRepo = require('./task.file.repository');

const getTasks = (boardId) => tasksRepo.getAll(boardId);

const getTask = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const setTask = (task) => tasksRepo.setById(task.boardId, task);

const removeTask = (boardId, taskId) => tasksRepo.removeById(boardId, taskId);

const updateTask = (task) => tasksRepo.update(task.boardId, task.id, task);

module.exports = { getTasks, getTask, setTask, removeTask, updateTask };