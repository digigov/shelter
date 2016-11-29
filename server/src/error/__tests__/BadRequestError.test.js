import faker from 'faker';
import BadRequestError from '../BadRequestError';

describe('BadRequestError error', () => {
  it('constructor', async () => {
    const error1 = new BadRequestError();
    expect(error1.name).toBe('BadRequestError');
    expect(error1.message).toBe('資料格式有誤');
    const message = faker.lorem.sentence();
    const error2 = new BadRequestError(message);
    expect(error2.name).toBe('BadRequestError');
    expect(error2.message).toBe(message);
  });
});
