import { Model } from './Database';
import NotFoundError from '../error/NotFoundError';

export default Model.extend({
  tableName: 'victim',
  hasTimestamps: true,
  softDelete: true,
  archive: ['phoneNumber'],
}, {
  fetch: async function fetch(id) {
    const reply = await new this({ id }).fetch();
    if (!reply) throw new NotFoundError('找不到災民資料');

    return reply;
  },
});
