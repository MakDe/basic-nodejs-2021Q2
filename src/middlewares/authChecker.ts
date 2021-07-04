/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';

// const excludedRoutes = ['/doc', '/login'];

const authCheck: RequestHandler = (req, res, next): void => {
  // if (excludedRoutes.includes(req.path)) {
  //   return next();
  // }

  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token || !JWT_SECRET_KEY) {
      res.status(401).send('Broken token');

      return;
    }
    try {
      jwt.verify(token, JWT_SECRET_KEY);

      return next();
    } catch (e) {
      res.status(401).send('Unauthorized.');

      return;
    }
  }
  res.status(401).send('Unauthorized.');
};

export default authCheck;
