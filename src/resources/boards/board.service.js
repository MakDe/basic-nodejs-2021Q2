const boardRepo = require('./board.file.repository');
const tasksRepo = require('../tasks/task.file.repository');

const getBoards = () => boardRepo.getAll();

const getBoard = (id) => boardRepo.getById(id);

const setBoard = (board) => boardRepo.set(board);

const removeBoard = (id) => {
  tasksRepo.removeById(id);

  return boardRepo.removeById(id)
};
const updateBoard = (board) => boardRepo.updateById(board.id, board);

module.exports = { getBoards, getBoard, setBoard, removeBoard, updateBoard };
