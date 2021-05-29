const { TABLE_NAME_BOARDS } = require('../../common/constants');
const db = require('../../db');
const { findBy, merge, removeBy, replaceBy } = require('../../helpers');

/** Get all boards from db.
 * @return {Array<IBoard>} - Boards
 */
const dbBoardsGetAll = async () => db.get(TABLE_NAME_BOARDS);

/** Get board by id from db.
 * @param {string} value - Board id
 * @return {IBoard} - Board
 */
const dbBoardsGetById = async (value) =>
  findBy('id', value, db.get(TABLE_NAME_BOARDS));

/** Add board to db.
 * @param {IBoard} data - Addable board
 * @return {IBoard} - Added board
 */
const dbBoardsSet = async (data) => {
  db.set(TABLE_NAME_BOARDS, merge(data, db.get(TABLE_NAME_BOARDS)));

  return data;
};

/** Delete board from db.
 * @param {string} value - Board id
 * @return {IBoard} - Removed board
 */
const dbBoardsRemoveById = async (value) => {
  const removed = dbBoardsGetById(value);

  db.set(TABLE_NAME_BOARDS, removeBy('id', value, db.get(TABLE_NAME_BOARDS)));

  return removed;
};

/** Update board in db.
 * @param {string} value - Board id
 * @param {IBoard} newData - New board data
 * @return {IBoard} - Updated Board
 */
const dbBoardsUpdateById = async (value, newData) => {
  const data = replaceBy('id', value, newData, db.get(TABLE_NAME_BOARDS));

  if (data) {
    db.set(TABLE_NAME_BOARDS, data);
  }

  return dbBoardsGetById(value);
};

module.exports = {
  getAll: dbBoardsGetAll,
  getById: dbBoardsGetById,
  set: dbBoardsSet,
  removeById: dbBoardsRemoveById,
  updateById: dbBoardsUpdateById,
};
