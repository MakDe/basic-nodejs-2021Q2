import express from 'express';
import Task from './task.model';
import * as taskService from './task.service';

const router = express.Router({ mergeParams: true });

/**
 * Get tasks
 */
router.route('/').get(async (req, res) => {
  const tasks = await taskService.getTasks(req.params.boardId);

  await res.json(tasks);
});

/**
 * Get task by id
 */
router.route('/:id').get(async (req, res) => {
  const task = await taskService.getTask(req.params.boardId, req.params.id);

  res.status(task ? 200 : 404).send(task);
});

/**
 *  Create task
 */
router.route('/').post(async (req, res) => {
  const task = await taskService.setTask(
    Task.fromRequest({ ...req.body, boardId: req.params.boardId })
  );

  res.status(201).send(task);
});

/**
 *  Delete task by id
 */
router.route('/:id').delete(async (req, res) => {
  await taskService.removeTask(req.params.boardId, req.params.id);

  res.sendStatus(204);
});

/**
 * Update task
 */
router.route('/:id').put(async (req, res) => {
  const task = await taskService.updateTask(
    Task.fromRequest({
      ...req.body,
      id: req.params.id,
      boardId: req.params.boardId,
    })
  );

  res.status(200).send(task);
});

export default router;
