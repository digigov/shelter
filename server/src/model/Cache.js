import _ from 'lodash';
import Redis from './Redis';

const redis = new Redis({ db: 2 });

const PREFIX = 'CACHE';

export default {
  put: async (name: string | Array<string>, value: string, expire = 60 /* minute */) => (
    !!(await redis.set(_.concat(PREFIX, name).join('::'), value, 'EX', expire * 60))
  ),
  get: async (name: string | Array<string>) => {
    const key = _.concat(PREFIX, name).join('::');
    return await redis.get(key);
  },
  pull: async (name: string | Array<string>) => {
    const key = _.concat(PREFIX, name).join('::');
    const reply = await redis.get(key);
    try { await redis.del(key); } catch (e) { /* empty */ }
    return reply;
  },
  has: async (name: string | Array<string>) => (
    !!(await redis.exists(_.concat(PREFIX, name).join('::')))
  ),
  forget: async (name: string | Array<string>) => (
    !!(await redis.del(_.concat(PREFIX, name).join('::')))
  ),
};

type ZipperConfig = {
  name: string,
  type: Function,
}

export class Zipper {

  keys = [];

  constructor(keys: Array<string | ZipperConfig> = []) {
    this.keys = _.map(keys, (config) => (config && {
      name: config.name || config,
      type: config.type || String,
    }));
  }

  parse(data: string): Object {
    const reply = {};

    if (_.isNil(data)) return reply;

    const block = data.split('::');
    _.forEach(this.keys, (config, index) => {
      if (_.isNil(config)) return;

      const { name, type } = config;
      if (type === Boolean) {
        reply[name] = !!_.parseInt(block[index]);
      } else {
        reply[name] = type(block[index]);
      }
    });

    return reply;
  }

  stringify(data: Object): string {
    return _.map(this.keys, (config) => {
      if (_.isNil(config)) return '';

      const { name, type } = config;
      const value = _.get(data, name, '');
      if (type === Boolean) return value ? 1 : 0;

      return value;
    }).join('::');
  }
}
