export class UserError extends Error { status = 400; }
export class NotFound extends UserError { status = 404; }
