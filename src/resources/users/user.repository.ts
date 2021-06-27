import { getManager } from 'typeorm';
import { IUser } from './user.types';
import User from './user.model';

/** Get all users from db.
 * @return {Array<IUser>} - Users
 */
const dbUsersGetAll = async (): Promise<Array<IUser>> => {
  const repo = getManager().getRepository(User);
  const result = await repo.find();

  return result;
};

/** Get user by id from db.
 * @param {string} value - User id
 * @return {IUser | null} - User
 */
const dbUsersGetById = async (value: string): Promise<IUser | null> => {
  const repo = getManager().getRepository(User);
  const result = await repo.findOne({ id: value });

  return result || null;
};

/** Add user to db.
 * @param {IUser} data - Addable user
 * @return {IUser} - Added user
 */
const dbUsersSet = async (data: IUser): Promise<IUser> => {
  const repo = getManager().getRepository(User);
  const user = await repo.create(data);

  const result = await repo.save(user);

  return result;
};

/** Delete user from db.
 * @param {string} value - User id
 * @return {IUser | null} - Removed user
 */
const dbUsersRemoveById = async (value: string): Promise<IUser | null> => {
  const repo = getManager().getRepository(User);
  const removable = await repo.findOne({ id: value });

  await repo.delete({ id: value });

  return removable || null;
};

/** Update user in db.
 * @param {string} value - User id
 * @param {IUser} newData - New user data
 * @return {IUser | null} - Updated User
 */
const dbUsersUpdateById = async (
  value: string,
  newData: IUser
): Promise<IUser | null> => {
  const repo = getManager().getRepository(User);
  const found = await repo.findOne({ id: value });

  if (found) {
    await repo.save({ ...found, ...newData });
  }

  return dbUsersGetById(value);
};

const dbUsersGetByLogin = async (value: string): Promise<IUser | null> => {
  const repo = getManager().getRepository(User);
  const result = await repo.findOne({ login: value });

  return result || null;
};

export {
  dbUsersGetAll as getAll,
  dbUsersGetById as getById,
  dbUsersSet as set,
  dbUsersRemoveById as removeById,
  dbUsersUpdateById as updateById,
  dbUsersGetByLogin as getByLogin,
};
