import faker from 'faker';
import crypter from '../crypter';

describe('crypter help', () => {
  it('hash & verify', async () => {
    const password = faker.lorem.sentence();
    const badPassword = `bad ${faker.lorem.sentence()}`;
    const hash = await crypter.hash(password);
    expect(await crypter.verify(password, hash)).toBe(true);
    expect(await crypter.verify(badPassword, hash)).toBe(false);
  });
});
