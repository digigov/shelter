/* eslint import/imports-first: 0 */

jest.unmock('../Queue');

import faker from 'faker';
import Queue from '../Queue';
import { redis } from '../Redis';

describe('Queue model', () => {
  it('push method', async () => {
    const key = faker.hacker.noun();
    const value = faker.lorem.words().split(' ').map((name) => `${name}=${faker.random.number()}`).join('&');

    redis.lpush.mockClear();
    await Queue.push(key, value);
    expect(redis.lpush).toHaveBeenCalledTimes(1);
    expect(redis.lpush).lastCalledWith(`QUEUE::${key}`, value);

    const errorMessage = faker.lorem.sentence();
    redis.lpush.mockClear();
    redis.lpush.mockImplementation(() => Promise.reject(new Error(errorMessage)));


    let error: Error;
    try { await Queue.push(key, value); } catch (e) { error = e; }
    expect(() => { throw error; }).toThrowError(errorMessage);
  });
});
