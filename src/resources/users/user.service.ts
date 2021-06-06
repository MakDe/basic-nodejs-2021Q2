import * as usersRepo from './user.file.repository';
import * as tasksRepo from '../tasks/task.file.repository';
import { IUser } from './user.types';

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
const setUser = (user: IUser): Promise<IUser> => usersRepo.set(user);

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
const updateUser = (id: string, data: IUser): Promise<IUser | null> =>
  usersRepo.updateById(id, data) || null;

export { getUsers, getUser, setUser, removeUser, updateUser };
