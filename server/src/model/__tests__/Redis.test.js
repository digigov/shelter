import _ from 'lodash';
import faker from 'faker';
import redis, { client } from 'redis';
import Redis from '../Redis';

const db = _.random(1, 5);
const connector = new Redis({ db });

describe('Redis model', () => {
  it('constructor method', async () => {
    expect(connector.client).not.toBeUndefined();
    expect(redis.createClient).toHaveBeenLastCalledWith({ db, host: '127.0.0.1', port: 63790 });
  });

  it('call method', async () => {
    const setArgs = faker.lorem.words(3).split(' ');

    const reply = _.random(0, 1);
    client.set.mockClear();
    client.set.mockReturnOnce(null, reply);
    expect(await connector.call('set', setArgs)).toBe(reply);
    client.set.mock.calls[0].pop();
    expect(client.set.mock.calls[0]).toEqual(setArgs);

    const error = faker.lorem.lines();
    client.set.mockClear();
    client.set.mockReturnOnce(new Error(error));

    try {
      await connector.call('set', setArgs);
      throw new Error();
    } catch (e) {
      expect(e.message).toBe(error);
    }
    client.set.mock.calls[0].pop();
    expect(client.set.mock.calls[0]).toEqual(setArgs);
  });

  _.forEach([
    'set',
    'get',
    'del',
    'exists',
    'lpush',
    'rpop',
    'smembers',
    'srem',
    'sadd',
  ], (method) => {
    it(`${method} method`, async () => {
      const key = faker.lorem.words(3).split(' ').join('::');
      const value = faker.lorem.word();

      const reply = _.random(0, 1);
      client[method].mockClear();
      client[method].mockReturnOnce(null, reply);
      expect(await connector[method](key, value)).toBe(reply);
      client[method].mock.calls[0].pop();
      expect(client[method].mock.calls[0]).toEqual([key, value]);

      const error = faker.lorem.lines();
      client[method].mockClear();
      client[method].mockReturnOnce(new Error(error));

      try {
        await connector[method](key, value);
        throw new Error();
      } catch (e) {
        expect(e.message).toBe(error);
      }
      client[method].mock.calls[0].pop();
      expect(client[method].mock.calls[0]).toEqual([key, value]);
    });
  });
});
