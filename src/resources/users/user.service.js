const usersRepo = require('./user.file.repository');
const tasksRepo = require('../tasks/task.file.repository');

const getUsers = () => usersRepo.getAll();

const getUser = (id) => usersRepo.getById(id);

const setUser = (user) => usersRepo.set(user);

const removeUser = (id) => {
  tasksRepo.checkAndOverwrite(id);
  usersRepo.removeById(id);
};

const updateUser = (id, data) => usersRepo.updateById(id, data);

module.exports = { getUsers, getUser, setUser, removeUser, updateUser };
