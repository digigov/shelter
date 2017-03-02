function CustomError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'CustomError';
  this.message = message || 'custom error';
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

describe('jest-setup help', () => {
  it('toEqualError when actual is not error', () => {
    expect('not error').not.toEqualError();
    expect(new Error('error')).toEqualError();
    expect({ errors: [{ originalError: new Error('error') }] }).toEqualError();
    expect({ errors: [new Error('error')] }).toEqualError();
  });

  it('toEqualError when expected is String', () => {
    expect(new Error('new error')).toEqualError('new error');
    expect(new Error('new error')).not.toEqualError('old error');
  });

  it('toEqualError when expected is RegExp', () => {
    expect(new Error('error time')).toEqualError(/^error/);
    expect(new Error('house error')).not.toEqualError(/^error/);
  });

  it('toEqualError when expected is Function', () => {
    expect(new CustomError()).toEqualError(CustomError);
    expect(new CustomError('throw error')).toEqualError(CustomError);
    expect(new Error('custom error')).not.toEqualError(CustomError);
  });

  it('toEqualError when expected is Error', () => {
    expect(new CustomError()).toEqualError(new CustomError());
    expect(new CustomError('throw error')).toEqualError(new CustomError('throw error'));
    expect(new Error()).toEqualError(new Error());
    expect(new Error('throw error')).toEqualError(new Error('throw error'));
    expect(new Error('throw error')).not.toEqualError(new CustomError('throw error'));
    expect(new Error('throw error')).not.toEqualError(new Error('custom error'));
  });
});
