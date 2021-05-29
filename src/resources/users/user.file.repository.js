const { TABLE_NAME_USERS } = require('../../common/constants');

const db = require('../../db');
const { findBy, merge, removeBy, replaceBy } = require('../../helpers');

/** Get all users from db.
 * @return {Array<IUserHidden>} - Users
 */
const dbUsersGetAll = async () => db.get(TABLE_NAME_USERS);

/** Get user by id from db.
 * @param {string} value - User id
 * @return {IUserHidden} - User
 */
const dbUsersGetById = async (value) =>
  findBy('id', value, db.get(TABLE_NAME_USERS));

/** Add user to db.
 * @param {IUser} data - Addable user
 * @return {IUserHidden} - Added user
 */
const dbUsersSet = async (data) => {
  db.set(TABLE_NAME_USERS, merge(data, db.get(TABLE_NAME_USERS)));

  return data;
};

/** Delete user from db.
 * @param {string} value - User id
 * @return {IUserHidden} - Removed user
 */
const dbUsersRemoveById = async (value) => {
  const removed = dbUsersGetById(value);

  db.set(TABLE_NAME_USERS, removeBy('id', value, db.get(TABLE_NAME_USERS)));

  return removed;
};

/** Update user in db.
 * @param {string} value - User id
 * @param {IUser} newData - New user data
 * @return {IUserHidden} - Updated User
 */
const dbUsersUpdateById = async (value, newData) => {
  const data = replaceBy('id', value, newData, db.get(TABLE_NAME_USERS));

  if (data) {
    db.set(TABLE_NAME_USERS, data);
  }

  return dbUsersGetById(value);
};

module.exports = {
  getAll: dbUsersGetAll,
  getById: dbUsersGetById,
  set: dbUsersSet,
  removeById: dbUsersRemoveById,
  updateById: dbUsersUpdateById,
};
