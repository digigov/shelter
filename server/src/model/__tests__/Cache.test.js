/* eslint import/imports-first: 0 */

jest.unmock('../Cache');

import _ from 'lodash';
import faker from 'faker';
import Cache, { Zipper } from '../Cache';
import { redis } from '../Redis';

describe('Cache model', () => {
  it('put method', async () => {
    const key = faker.hacker.noun();
    const value = faker.lorem.sentence();

    redis.set.mockClear();
    await Cache.put(key, value);
    expect(redis.set).toHaveBeenCalledTimes(1);
    expect(redis.set).lastCalledWith(`CACHE::${key}`, value, 'EX', 60 * 60);

    redis.set.mockClear();
    await Cache.put(key, value, 20);
    expect(redis.set).toHaveBeenCalledTimes(1);
    expect(redis.set).lastCalledWith(`CACHE::${key}`, value, 'EX', 20 * 60);

    const errorMessage = faker.lorem.sentence();
    redis.set.mockClear();
    redis.set.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    let error: Error;
    try { await Cache.put(key, value); } catch (e) { error = e; }
    expect(() => { throw error; }).toThrowError(errorMessage);
  });

  it('get method', async () => {
    const key = faker.hacker.noun();
    const value = faker.lorem.sentence();

    redis.get.mockClear();
    redis.get.mockImplementationOnce(() => Promise.resolve(value));

    const reply = await Cache.get(key);
    expect(reply).toBe(value);
    expect(redis.get).toHaveBeenCalledTimes(1);
    expect(redis.get).lastCalledWith(`CACHE::${key}`);

    const errorMessage = faker.lorem.sentence();
    redis.get.mockClear();
    redis.set.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    let error: Error;
    try { await Cache.put(key, value); } catch (e) { error = e; }
    expect(() => { throw error; }).toThrowError(errorMessage);
  });

  it('pull method', async () => {
    const key = faker.hacker.noun();
    const value = faker.lorem.sentence();

    redis.get.mockClear();
    redis.del.mockClear();
    redis.get.mockImplementationOnce(() => Promise.resolve(value));
    redis.del.mockImplementationOnce(() => Promise.reject(new Error()));

    let error: Error;
    try {
      const reply = await Cache.pull(key, value);
      expect(reply).toBe(value);
    } catch (e) { error = e; }
    expect(() => { throw error; }).not.toThrowError(new Error());
    expect(redis.get).toHaveBeenCalledTimes(1);
    expect(redis.get).lastCalledWith(`CACHE::${key}`);
    expect(redis.del).toHaveBeenCalledTimes(1);
    expect(redis.del).lastCalledWith(`CACHE::${key}`);

    const errorMessage = faker.lorem.sentence();
    redis.get.mockClear();
    redis.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    let error2: Error;
    try { await Cache.pull(key, value); } catch (e) { error2 = e; }
    expect(() => { throw error2; }).toThrowError(errorMessage);
  });

  _.forEach([true, false], (status) => {
    it(`has method when reply is ${status}`, async () => {
      const key = faker.hacker.noun();
      redis.exists.mockClear();
      redis.exists.mockImplementationOnce(() => Promise.resolve(status));
      const reply = await Cache.has(key);
      expect(reply).toBe(status);
      expect(redis.exists).toHaveBeenCalledTimes(1);
      expect(redis.exists).lastCalledWith(`CACHE::${key}`);
    });
  });

  it('has method when throw error', async () => {
    const key = faker.hacker.noun();
    const errorMessage = faker.lorem.sentence();
    redis.exists.mockClear();
    redis.exists.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    let error: Error;
    try { await Cache.has(key); } catch (e) { error = e; }
    expect(() => { throw error; }).toThrowError(errorMessage);
  });

  it('forget method', async () => {
    const key = faker.hacker.noun();

    redis.del.mockClear();
    await Cache.forget(key);
    expect(redis.del).toHaveBeenCalledTimes(1);
    expect(redis.del).lastCalledWith(`CACHE::${key}`);

    const errorMessage = faker.lorem.sentence();
    redis.del.mockClear();
    redis.del.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    let error: Error;
    try { await Cache.forget(key); } catch (e) { error = e; }
    expect(() => { throw error; }).toThrowError(errorMessage);
  });
});

const names = _.uniq(faker.random.words(10).split(' '));
const config = [
  null,
  names[0],
  names[1],
  { name: names[2], type: Boolean },
  { name: names[3], type: Boolean },
  { name: names[4], type: Number },
  { name: names[5], type: Number },
];

const zipper = new Zipper(config);

describe('Cache Zipper model', () => {
  it('constructor', async () => {
    expect(zipper.keys).toEqual([
      null,
      { name: config[1], type: String },
      { name: config[2], type: String },
      { name: config[3].name, type: Boolean },
      { name: config[4].name, type: Boolean },
      { name: config[5].name, type: Number },
      { name: config[6].name, type: Number },
    ]);
    expect(new Zipper().keys).toEqual([]);
  });

  it('parse', async () => {
    const values = ['', '', faker.random.word(), 0, 1, 0, _.random(111, 999)];

    const data = {};
    _.set(data, config[1], '');
    _.set(data, config[2], values[2]);
    _.set(data, config[3].name, false);
    _.set(data, config[4].name, true);
    _.set(data, config[5].name, 0);
    _.set(data, config[6].name, values[6]);

    expect(zipper.parse(values.join('::'))).toEqual(data);
    expect(zipper.parse()).toEqual({});
  });

  it('stringify', async () => {
    const values = ['', '', faker.random.word(), 0, 1, 0, _.random(111, 999)];

    const data = {};
    _.set(data, config[1], '');
    _.set(data, config[2], values[2]);
    _.set(data, config[3].name, false);
    _.set(data, config[4].name, true);
    _.set(data, config[5].name, 0);
    _.set(data, config[6].name, values[6]);

    expect(zipper.stringify(data)).toEqual(values.join('::'));
  });
});
