const tasksRepo = require('./task.file.repository');

const getTasks = (boardId) => tasksRepo.getAll(boardId);

const getTask = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const setTask = (boardId, task) => tasksRepo.setById(boardId, task);

const removeTask = (boardId, taskId) => tasksRepo.removeById(boardId, taskId);

const updateTask = (boardId, taskId, data) => tasksRepo.update(boardId, taskId, data);

module.exports = { getTasks, getTask, setTask, removeTask, updateTask };