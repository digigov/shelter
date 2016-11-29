import _ from 'lodash';
import redis, { RedisClient } from 'redis';

export default class Redis {

  cliest: RedisClient;

  constructor(config) {
    this.client = redis.createClient({
      host: '127.0.0.1',
      port: 63790,
      ...config,
    });
  }

  call = (name, args) => (
    new Promise((resolve, reject) => {
      this.client[name].apply(null, _.concat(
        args,
        (err, reply) => (err ? reject(err) : resolve(reply))
      ));
    })
  )

  async set(...args) { return await this.call('set', args); }
  async get(...args) { return await this.call('get', args); }
  async del(...args) { return await this.call('del', args); }
  async exists(...args) { return await this.call('exists', args); }
  async lpush(...args) { return await this.call('lpush', args); }
  async rpop(...args) { return await this.call('rpop', args); }
  async smembers(...args) { return await this.call('smembers', args); }
  async srem(...args) { return await this.call('srem', args); }
  async sadd(...args) { return await this.call('sadd', args); }
}
