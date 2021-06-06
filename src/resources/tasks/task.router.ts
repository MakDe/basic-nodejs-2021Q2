import express from 'express';
import Task from './task.model';
import * as taskService from './task.service';

const router = express.Router({ mergeParams: true });

/**
 * Get tasks
 */
router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.params.boardId);

    await res.json(tasks);
  } catch (e) {
    next(e);
  }
});

/**
 * Get task by id
 */
router.route('/:boardId/tasks/:id').get(async (req, res, next) => {
  try {
    const task = await taskService.getTask(req.params.boardId, req.params.id);

    res.status(task ? 200 : 404).send(task);
  } catch (e) {
    next(e);
  }
});

/**
 *  Create task
 */
router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
    const task = await taskService.setTask(
      Task.fromRequest({ ...req.body, boardId: req.params.boardId })
    );

    res.status(201).send(task);
  } catch (e) {
    next(e);
  }
});

/**
 *  Delete task by id
 */
router.route('/:boardId/tasks/:id').delete(async (req, res, next) => {
  try {
    await taskService.removeTask(req.params.boardId, req.params.id);

    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

/**
 * Update task
 */
router.route('/:boardId/tasks/:id').put(async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      Task.fromRequest({
        ...req.body,
        id: req.params.id,
        boardId: req.params.boardId,
      })
    );

    res.status(200).send(task);
  } catch (e) {
    next(e);
  }
});

export default router;
