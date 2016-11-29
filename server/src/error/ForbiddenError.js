export default function ForbiddenError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'ForbiddenError';
  this.message = message || '權限不足';
}

ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;
