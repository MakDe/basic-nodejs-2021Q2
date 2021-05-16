const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getBoards();

  res.status(200).send(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.getBoard(req.params.id);

  res.status(200).send(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardService.setBoard(Board.fromRequest(req.body));

  res.status(201).send(board);
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardService.removeBoard(req.params.id);

  res.status(204).send(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.updateBoard(req.params.id, Board.fromRequest(req.body));

  res.status(200).send(board);
});

module.exports = router;