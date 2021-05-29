const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

/**
 * Get boards
 */
router.route('/').get(async (req, res) => {
  const boards = await boardService.getBoards();

  await res.json(boards);
});

/**
 * Get board by id
 */
router.route('/:id').get(async (req, res) => {
  const board = await boardService.getBoard(req.params.id);

  res.status(board ? 200 : 404).send(board);
});

/**
 *  Create board
 */
router.route('/').post(async (req, res) => {
  const board = await boardService.setBoard(Board.fromRequest(req.body));

  res.status(201).send(board);
});

/**
 *  Delete board by id
 */
router.route('/:id').delete(async (req, res) => {
  const board = await boardService.removeBoard(req.params.id);

  res.status(204).send(board);
});

/**
 * Update board
 */
router.route('/:id').put(async (req, res) => {
  const board = await boardService.updateBoard(Board.fromRequest(req.body));

  res.status(200).send(board);
});

module.exports = router;
