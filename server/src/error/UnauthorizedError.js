export default function UnauthorizedError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'UnauthorizedError';
  this.message = message || '請先進行簡訊驗證';
}

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;
