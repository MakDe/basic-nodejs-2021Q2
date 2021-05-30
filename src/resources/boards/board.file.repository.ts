import { TABLE_NAME_BOARDS } from '../../common/constants';
import db from '../../db';
import { findBy, merge, removeBy, replaceBy } from '../../helpers';
import { IBoard } from './board.types';

/** Get all boards from db.
 * @return {Array<IBoard>} - Boards
 */
const dbBoardsGetAll = async (): Promise<Array<IBoard>> =>
  <Array<IBoard>>db.get(TABLE_NAME_BOARDS);

/** Get board by id from db.
 * @param {string | number | null | undefined} value - Board id
 * @return {IBoard | null} - Board
 */
const dbBoardsGetById = async (
  value: string | number | null | undefined
): Promise<IBoard | null> =>
  findBy('id', value, <Array<IBoard>>db.get(TABLE_NAME_BOARDS));

/** Add board to db.
 * @param {IBoard} data - Addable board
 * @return {IBoard} - Added board
 */
const dbBoardsSet = async (data: IBoard): Promise<IBoard> => {
  db.set(
    TABLE_NAME_BOARDS,
    merge(data, <Array<IBoard>>db.get(TABLE_NAME_BOARDS))
  );

  return data;
};

/** Delete board from db.
 * @param {string} value - Board id
 * @return {IBoard | null} - Removed board
 */
const dbBoardsRemoveById = async (value: string): Promise<IBoard | null> => {
  const removed = dbBoardsGetById(value);

  db.set(
    TABLE_NAME_BOARDS,
    removeBy('id', value, <Array<IBoard>>db.get(TABLE_NAME_BOARDS))
  );

  return removed;
};

/** Update board in db.
 * @param {string} value - Board id
 * @param {IBoard} newData - New board data
 * @return {IBoard | null} - Updated Board
 */
const dbBoardsUpdateById = async (
  value: string | number | null | undefined,
  newData: IBoard
): Promise<IBoard | null> => {
  const data = replaceBy(
    'id',
    value,
    newData,
    <Array<IBoard>>db.get(TABLE_NAME_BOARDS)
  );

  if (data) {
    db.set(TABLE_NAME_BOARDS, data);
  }

  return dbBoardsGetById(value);
};

export {
  dbBoardsGetAll as getAll,
  dbBoardsGetById as getById,
  dbBoardsSet as set,
  dbBoardsRemoveById as removeById,
  dbBoardsUpdateById as updateById,
};
