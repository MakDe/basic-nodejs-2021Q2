const usersRepo = require('./user.memory.repository');

const getUsers = () => usersRepo.getAll();

const getUserById = (id) => usersRepo.getById(id);

const setUser = (user) => usersRepo.set(user);

const removeUserById = (id) => usersRepo.removeById(id);

const updateUserById = (id, data) => usersRepo.update(id, data);

module.exports = { getUsers, getUserById, setUser, removeUserById, updateUserById };
