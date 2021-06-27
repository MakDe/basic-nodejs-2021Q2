import { getManager } from 'typeorm';
import { IBoard } from './board.types';
import Board from './board.model';

/** Get all boards from db.
 * @return {Array<IBoard>} - Boards
 */
const dbBoardsGetAll = async (): Promise<Array<IBoard>> => {
  const repo = getManager().getRepository(Board);
  const result = await repo.find();

  return result;
};

/** Get board by id from db.
 * @param {string | number | null} value - Board id
 * @return {IBoard | null} - Board
 */
const dbBoardsGetById = async (value: string): Promise<IBoard | null> => {
  const repo = getManager().getRepository(Board);
  const result = await repo.findOne({ id: value });

  return result || null;
};

/** Add board to db.
 * @param {IBoard} data - Addable board
 * @return {IBoard} - Added board
 */
const dbBoardsSet = async (data: IBoard): Promise<IBoard> => {
  const repo = getManager().getRepository(Board);
  const board = await repo.create(data);

  return repo.save(board);
};

/** Delete board from db.
 * @param {string} value - Board id
 * @return {IBoard | null} - Removed board
 */
const dbBoardsRemoveById = async (value: string): Promise<IBoard | null> => {
  const repo = getManager().getRepository(Board);
  const removable = await repo.findOne({ id: value });

  await repo.delete({ id: value });

  return removable || null;
};

/** Update board in db.
 * @param {string} value - Board id
 * @param {IBoard} newData - New board data
 * @return {IBoard | null} - Updated Board
 */
const dbBoardsUpdateById = async (
  value: string,
  newData: IBoard
): Promise<IBoard | null> => {
  const repo = getManager().getRepository(Board);
  const found = await repo.findOne({ id: value });

  if (found) {
    await repo.save({ ...found, ...newData });
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
