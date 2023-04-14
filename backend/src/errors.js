export class UserError extends Error {
  status = 400;
}
export class NotFound extends UserError {
  status = 404;
  message = 'Not Found';
}
export class Unauthorized extends UserError {
  status = 401;
}
export class Forbidden extends UserError {
  status = 403;
}
export class Conflict extends UserError {
  status = 409;
}
