import _ from 'lodash';
import Redis from './Redis';

const redis = new Redis({ db: 3 });

const PREFIX = 'QUEUE';

export default {
  push: async (name, value) => (
    await redis.lpush(_.concat(PREFIX, name).join('::'), value)
  ),
};
