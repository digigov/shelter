import moment from 'moment-timezone';

const timezone = new Map([
  ['TW', 'Asia/Taipei'],
  ['JP', 'Asia/Tokyo'],
  ['HK', 'Asia/Hong_Kong'],
  ['KR', 'Asia/Seoul'],
  ['SG', 'Asia/Singapore'],
]);

moment.tz.setDefault('Asia/Taipei');

export default function (...args) {
  const cc = args[args.length - 1];
  const tz = timezone.get(cc);
  if (tz) {
    args.pop();
    return moment(...args).tz(tz);
  }

  return moment(...args);
}
