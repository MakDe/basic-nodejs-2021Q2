import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as usersRepo from '../users/user.repository';
import { JWT_SECRET_KEY } from '../../common/config';

export default async function getToken(
  login: string,
  password: string
): Promise<string | null> {
  if (!JWT_SECRET_KEY) {
    return null;
  }

  const user = await usersRepo.getByLogin(login);
  let token = null;

  if (!user) {
    return token;
  }

  const isPassMatch = await bcrypt.compare(password, user.password || '');

  if (isPassMatch) {
    token = jwt.sign({ userId: user.id, login }, JWT_SECRET_KEY);
  }

  return token;
}
