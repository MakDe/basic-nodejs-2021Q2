import express from 'express';
import Board from './board.model';
import * as boardService from './board.service';

const router = express.Router();

/**
 * Get boards
 */
router.route('/').get(async (_, res, next) => {
  try {
    const boards = await boardService.getBoards();

    await res.json(boards);
  } catch (e) {
    next(e);
  }
});

/**
 * Get board by id
 */
router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getBoard(req.params.id);

    res.status(board ? 200 : 404).send(board);
  } catch (e) {
    next(e);
  }
});

/**
 *  Create board
 */
router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardService.setBoard(Board.fromRequest(req.body));

    res.status(201).send(board);
  } catch (e) {
    next(e);
  }
});

/**
 *  Delete board by id
 */
router.route('/:id').delete(async (req, res, next) => {
  try {
    const board = await boardService.removeBoard(req.params.id);

    res.status(204).send(board);
  } catch (e) {
    next(e);
  }
});

/**
 * Update board
 */
router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(Board.fromRequest(req.body));

    res.status(200).send(board);
  } catch (e) {
    next(e);
  }
});

export default router;
