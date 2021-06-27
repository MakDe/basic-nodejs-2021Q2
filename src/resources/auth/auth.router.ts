import express from 'express';
import getToken from './auth.service';

const router = express.Router();

export default router.post('/', async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const token = await getToken(login, password);

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(403).send('Login or password error');
    }
  } catch (err) {
    next(err);
  }
});
