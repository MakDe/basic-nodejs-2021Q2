const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getUsers();

  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);

  res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const createdUser = await usersService.setUser(User.fromRequest(req.body));

  res.status(201).json(User.toResponse(createdUser));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.removeUser(req.params.id);

  res.status(204).json({});
});

router.route('/:id').put(async (req, res) => {
  const updatedUser = await usersService.updateUser(
    req.params.id,
    User.fromRequest(req.body)
  );

  res.status(200).json(User.toResponse(updatedUser));
});

module.exports = router;
