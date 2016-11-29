import faker from 'faker';
import NotFoundError from '../NotFoundError';

describe('NotFoundError error', () => {
  it('constructor', async () => {
    const error1 = new NotFoundError();
    expect(error1.name).toBe('NotFoundError');
    expect(error1.message).toBe('查無資料');
    const message = faker.lorem.sentence();
    const error2 = new NotFoundError(message);
    expect(error2.name).toBe('NotFoundError');
    expect(error2.message).toBe(message);
  });
});
