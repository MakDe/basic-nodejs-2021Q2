import { IBoard } from 'src/resources/boards/board.types';
import * as boardRepo from './board.repository';
import * as tasksRepo from '../tasks/task.repository';

/**
 * Get all boards.
 * @return {Promise<Array<IBoard>>} - Get all boards
 */
const getBoards = (): Promise<Array<IBoard>> => boardRepo.getAll();

/** Get board by id.
 * @param {string} id - Board id
 * @return {Promise<IBoard | null>} - Board
 */
const getBoard = (id: string): Promise<IBoard | null> => boardRepo.getById(id);

/**
 * Add board.
 * @param {IBoard} board - Addable board
 * @return {Promise<IBoard>} - Added board
 */
const setBoard = (board: IBoard): Promise<IBoard> => boardRepo.set(board);

/**
 * Delete board.
 * @param {string} id - Board id
 * @return {Promise<IBoard | null>} - Removed board
 */
const removeBoard = async (id: string): Promise<IBoard | null> => {
  await tasksRepo.removeById(id);

  return boardRepo.removeById(id);
};

/**
 * Update board.
 * @param {IBoard} board - Updatable board
 * @return {Promise<IBoard>} - Updated board
 */
const updateBoard = (board: IBoard): Promise<IBoard | null> =>
  boardRepo.updateById(board.id, board);

export { getBoards, getBoard, setBoard, removeBoard, updateBoard };
