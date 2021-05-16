const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(
  async (req, res) => {
    const tasks = await taskService.getTasks(req.params.boardId);

    res.status(200).send(tasks);
  }
);

router.route('/:id').get(
  async (req, res) => {
    const task = await taskService.getTask(req.params.boardId, req.params.id);

    res.status(200).send(task);
  }
);

router.route('/').post(
  async (req, res) => {
    const task = await taskService.setTask(
      req.params.boardId,
      Task.fromRequest(req.body)
    );

    res.status(201).send(task);
  }
);

router.route('/:id').delete(
  async (req, res) => {
    await taskService.removeTask(req.params.boardId, req.params.id);

    res.sendStatus(204);
  }
);

router.route('/:id').put(
  async (req, res) => {
    const task = await taskService.updateTask(
      req.params.boardId,
      req.params.id,
      Task.fromRequest(req.body)
    );

    res.status(200).send(task);
  }
);

module.exports = router;
