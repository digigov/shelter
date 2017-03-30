import { Model } from './Database';

export default Model.extend({
  tableName: 'action',
  hasTimestamps: true,
  softDelete: true,
  archive: ['detail'],
});
