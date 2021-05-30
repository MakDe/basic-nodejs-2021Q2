import express from 'express';
import User from './user.model';

import * as usersService from './user.service';

const router = express.Router();

/**
 * Get users
 */
router.route('/').get(async (_, res) => {
  const users = await usersService.getUsers();

  res.status(200).json(users.map(User.toResponse));
});

/**
 * Get user by id
 */
router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);

  if (user) {
    res.status(200).json(User.toResponse(user));

    return;
  }

  res.sendStatus(404);
});

/**
 *  Create user
 */
router.route('/').post(async (req, res) => {
  const createdUser = await usersService.setUser(User.fromRequest(req.body));

  res.status(201).json(User.toResponse(createdUser));
});

/**
 * Delete user by id
 */
router.route('/:id').delete(async (req, res) => {
  await usersService.removeUser(req.params.id);

  res.status(204).json({});
});

/**
 * Update user
 */
router.route('/:id').put(async (req, res) => {
  const updatedUser = await usersService.updateUser(
    req.params.id,
    User.fromRequest(req.body)
  );

  if (updatedUser) {
    res.status(200).json(User.toResponse(updatedUser));

    return;
  }

  res.sendStatus(404);
});

export default router;
