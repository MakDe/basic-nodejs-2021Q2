const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getUsers();

  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);

  console.log(user)

  res.status(user ? 200 : 404).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.setUser(User.fromRequest(req.body));

  res.status(201).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.removeUserById(req.params.id);

  res.status(204).json({});
});

router.route('/:id').put(async (req, res) => {
  const updatedUser = await usersService.updateUserById(req.body, req.params);

  res.status(updatedUser ? 200 : 400).json(User.toResponse(updatedUser));
});

module.exports = router;
