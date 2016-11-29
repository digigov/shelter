export default function PaymentRequiredError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'PaymentRequiredError';
  this.message = message || '需要升級方案';
}

PaymentRequiredError.prototype = Object.create(Error.prototype);
PaymentRequiredError.prototype.constructor = PaymentRequiredError;
