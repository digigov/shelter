import faker from 'faker';
import LockedError from '../LockedError';

describe('LockedError error', () => {
  it('constructor', async () => {
    const error1 = new LockedError();
    expect(error1.name).toBe('LockedError');
    expect(error1.message).toBe('此項目已關閉');
    const message = faker.lorem.sentence();
    const error2 = new LockedError(message);
    expect(error2.name).toBe('LockedError');
    expect(error2.message).toBe(message);
  });
});
