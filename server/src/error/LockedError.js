export default function LockedError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'LockedError';
  this.message = message || '此項目已關閉';
}

LockedError.prototype = Object.create(Error.prototype);
LockedError.prototype.constructor = LockedError;
