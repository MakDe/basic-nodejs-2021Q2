import bcrypt from 'bcrypt';
import * as usersRepo from './user.repository';
import * as tasksRepo from '../tasks/task.repository';
import { IUser } from './user.types';

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

/**
 * Get all users.
 * @return {Promise<Array<IUser>>} - Get all users
 */
const getUsers = (): Promise<Array<IUser>> => usersRepo.getAll();

/** Get user by id.
 * @param {string} id - User id
 * @return {Promise<IUser | null>} - User
 */
const getUser = (id: string): Promise<IUser | null> => usersRepo.getById(id);

/**
 * Add user.
 * @param {IUser} user - Addable user
 * @return {Promise<IUser>} - Added user
 */
const setUser = async (user: IUser): Promise<IUser> => {
  const { password } = user;

  if (password) {
    user.password = await hashPassword(password);
  }

  return usersRepo.set(user);
};

/**
 * Delete user.
 * @param {string} id - User id
 * @return {Promise<IUser | null>} - Removed user
 */
const removeUser = (id: string): Promise<IUser | null> => {
  tasksRepo.checkAndOverwrite(id);

  return usersRepo.removeById(id);
};

/**
 * Update user.
 * @param {string} id - User id
 * @param {IUser} data - Updatable user
 * @return {Promise<IUser | null>} - Updated user
 */
const updateUser = async (id: string, data: IUser): Promise<IUser | null> => {
  const { password } = data;

  if (password) {
    data.password = await hashPassword(password);
  }

  return usersRepo.updateById(id, data) || null;
};

export { getUsers, getUser, setUser, removeUser, updateUser };
