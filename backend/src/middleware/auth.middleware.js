import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import config from '../config/auth.config.js';
import User from '../routes/users/user.model.js';
import { Unauthorized, InternalError, AccessTokenExpired } from '../errors/errors.js';
import { AsyncLocalStorage } from 'async_hooks';
import { roles } from '../roles.js';

export const authContext = new AsyncLocalStorage();
const { TokenExpiredError } = jwt;
const jwtVerify = promisify(jwt.verify);

export async function addPermissions(req, _, next) {
  let token = req.headers['x-access-token'];

  let user, accessTokenExpired;
  try {
    user = token && (await jwtVerify(token, config.secret)).user;
  } catch (error) {
    if (error instanceof TokenExpiredError) accessTokenExpired = true;
    else throw error;
  }
  const role = roles[user?.role ?? "unauthenticated"];
  authContext.run({
    user,
    role,
    accessTokenExpired
  }, () => {
    next();
  })
}
