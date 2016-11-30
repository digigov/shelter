import { Model } from './Database';
import NotFoundError from '../error/NotFoundError';

export default Model.extend({
  tableName: 'logger',
  hasTimestamps: true,
  softDelete: true,
  json: ['rule'],
}, {
  fetch: async function fetch(id) {
    const reply = await new this({ id }).fetch();
    if (!reply) throw new NotFoundError('找不到記錄資料');

    return reply;
  },
});
