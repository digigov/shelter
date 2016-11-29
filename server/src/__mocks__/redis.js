import _ from 'lodash';

const redis = jest.genMockFromModule('redis');

export const client = _.mapValues({
  set: null,
  get: null,
  del: null,
  exists: null,
  lpush: null,
  rpop: null,
  smembers: null,
  srem: null,
  sadd: null,
}, () => {
  const mock = jest.fn((...args) => {
    const callback = args[args.length - 1];
    return _.isFunction(callback) && callback();
  });

  mock.mockReturnOnce = (error, reply) => {
    mock.mockImplementationOnce((...args) => {
      const cb = args[args.length - 1];
      return _.isFunction(cb) && cb(error, reply);
    });
  };

  return mock;
});

redis.createClient.mockReturnValue(client);

export default redis;
