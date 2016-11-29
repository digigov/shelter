import _ from 'lodash';

export default function ider(id: number, prefix = 0, date = new Date()): string {
  const year = date.getFullYear() % 100;
  const month = date.getMonth() + 1;
  const value = ((year * 12) + month) - (15 * 12);

  return [
    String.fromCharCode(65 + _.floor(value / 26)),
    String.fromCharCode(65 + (value % 26)),
    prefix,
    _.padStart(id % 10000000, 7, 0),
  ].join('');
}
