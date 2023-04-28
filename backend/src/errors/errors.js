export class UserError extends Error {
  status = 400;
}
export class InternalError extends Error {
  status = 500;
}
export class NotFound extends UserError {
  status = 404;
  message = 'Not Found';
}
export class Unauthorized extends UserError {
  status = 401;
}
export class AccessTokenExpired extends Unauthorized {
  accessTokenExpired = true;
  message = 'Access Token Expired'
}
export class Forbidden extends UserError {
  status = 403;
  message = 'Forbidden'
}
export class Conflict extends UserError {
  status = 409;
}
