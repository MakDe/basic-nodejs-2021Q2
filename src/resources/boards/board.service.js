const boardRepo = require('./board.file.repository');
const tasksRepo = require('../tasks/task.file.repository');

/**
 * Get all boards.
 * @return {Promise<Array<IBoard>>} - Get all boards
 */
const getBoards = () => boardRepo.getAll();

/** Get board by id.
 * @param {string} id - Board id
 * @return {Promise<IBoard>} - Board
 */
const getBoard = (id) => boardRepo.getById(id);

/**
 * Add board.
 * @param {IBoard} board - Addable board
 * @return {Promise<IBoard>} - Added board
 */
const setBoard = (board) => boardRepo.set(board);

/**
 * Delete board.
 * @param {string} id - Board id
 * @return {Promise<IBoard>} - Removed board
 */
const removeBoard = (id) => {
  tasksRepo.removeById(id);

  return boardRepo.removeById(id);
};

/**
 * Update board.
 * @param {IBoard} board - Updatable board
 * @return {Promise<IBoard>} - Updated board
 */
const updateBoard = (board) => boardRepo.updateById(board.id, board);

module.exports = { getBoards, getBoard, setBoard, removeBoard, updateBoard };
