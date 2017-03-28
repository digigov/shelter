import { Model } from './Database';

export default Model.extend({
  tableName: 'citizen',
  hasTimestamps: true,
  softDelete: false,
  archive: [],
});
