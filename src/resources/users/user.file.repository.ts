import { TABLE_NAME_USERS } from '../../common/constants';
import db from '../../db';
import { findBy, merge, removeBy, replaceBy } from '../../helpers';
import { IUser } from './user.types';

/** Get all users from db.
 * @return {Array<IUser>} - Users
 */
const dbUsersGetAll = async (): Promise<Array<IUser>> =>
  <Array<IUser>>db.get(TABLE_NAME_USERS);

/** Get user by id from db.
 * @param {string} value - User id
 * @return {IUser} - User
 */
const dbUsersGetById = async (value: string): Promise<IUser> =>
  findBy('id', value, <Array<IUser>>db.get(TABLE_NAME_USERS));

/** Add user to db.
 * @param {IUser} data - Addable user
 * @return {IUser} - Added user
 */
const dbUsersSet = async (data: IUser): Promise<IUser> => {
  db.set(TABLE_NAME_USERS, merge(data, <Array<IUser>>db.get(TABLE_NAME_USERS)));

  return data;
};

/** Delete user from db.
 * @param {string} value - User id
 * @return {IUser} - Removed user
 */
const dbUsersRemoveById = async (value: string): Promise<IUser> => {
  const removed = dbUsersGetById(value);

  db.set(
    TABLE_NAME_USERS,
    removeBy('id', value, <Array<IUser>>db.get(TABLE_NAME_USERS))
  );

  return removed;
};

/** Update user in db.
 * @param {string} value - User id
 * @param {IUser} newData - New user data
 * @return {IUser} - Updated User
 */
const dbUsersUpdateById = async (
  value: string,
  newData: IUser
): Promise<IUser> => {
  const data = replaceBy(
    'id',
    value,
    newData,
    <Array<IUser>>db.get(TABLE_NAME_USERS)
  );

  if (data) {
    db.set(TABLE_NAME_USERS, data);
  }

  return dbUsersGetById(value);
};

export {
  dbUsersGetAll as getAll,
  dbUsersGetById as getById,
  dbUsersSet as set,
  dbUsersRemoveById as removeById,
  dbUsersUpdateById as updateById,
};
