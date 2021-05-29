const usersRepo = require('./user.file.repository');
const tasksRepo = require('../tasks/task.file.repository');

/**
 * Get all users.
 * @return {Promise<Array<IUser>>} - Get all users
 */
const getUsers = () => usersRepo.getAll();

/** Get user by id.
 * @param {string} id - User id
 * @return {Promise<IUser>} - User
 */
const getUser = (id) => usersRepo.getById(id);

/**
 * Add user.
 * @param {IUser} user - Addable user
 * @return {Promise<IUser>} - Added user
 */
const setUser = (user) => usersRepo.set(user);

/**
 * Delete user.
 * @param {string} id - User id
 * @return {Promise<IUser>} - Removed user
 */
const removeUser = (id) => {
  tasksRepo.checkAndOverwrite(id);

  return usersRepo.removeById(id);
};

/**
 * Update user.
 * @param {string} id - User id
 * @param {IUser} data - Updatable user
 * @return {Promise<IUser>} - Updated user
 */
const updateUser = (id, data) => usersRepo.updateById(id, data);

module.exports = { getUsers, getUser, setUser, removeUser, updateUser };
