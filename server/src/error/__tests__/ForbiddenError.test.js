import faker from 'faker';
import ForbiddenError from '../ForbiddenError';

describe('ForbiddenError error', () => {
  it('constructor', async () => {
    const error1 = new ForbiddenError();
    expect(error1.name).toBe('ForbiddenError');
    expect(error1.message).toBe('權限不足');
    const message = faker.lorem.sentence();
    const error2 = new ForbiddenError(message);
    expect(error2.name).toBe('ForbiddenError');
    expect(error2.message).toBe(message);
  });
});
