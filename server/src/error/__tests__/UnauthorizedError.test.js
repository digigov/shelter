import faker from 'faker';
import UnauthorizedError from '../UnauthorizedError';

describe('UnauthorizedError error', () => {
  it('constructor', async () => {
    const error1 = new UnauthorizedError();
    expect(error1.name).toBe('UnauthorizedError');
    expect(error1.message).toBe('請先進行簡訊驗證');
    const message = faker.lorem.sentence();
    const error2 = new UnauthorizedError(message);
    expect(error2.name).toBe('UnauthorizedError');
    expect(error2.message).toBe(message);
  });
});
