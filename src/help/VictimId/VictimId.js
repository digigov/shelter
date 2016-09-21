/**
 * @providesModule VictimId
 */
import parseInt from 'lodash/parseInt';
import filter from 'lodash/filter';

const charNum = [
  { key: 'A', code: 10 },
  { key: 'B', code: 11 },
  { key: 'C', code: 12 },
  { key: 'D', code: 13 },
  { key: 'E', code: 14 },
  { key: 'F', code: 15 },
  { key: 'G', code: 16 },
  { key: 'H', code: 17 },
  { key: 'I', code: 34 },
  { key: 'J', code: 18 },
  { key: 'K', code: 19 },
  { key: 'L', code: 20 },
  { key: 'M', code: 21 },
  { key: 'N', code: 22 },
  { key: 'O', code: 35 },
  { key: 'P', code: 23 },
  { key: 'Q', code: 24 },
  { key: 'R', code: 25 },
  { key: 'S', code: 26 },
  { key: 'T', code: 27 },
  { key: 'U', code: 28 },
  { key: 'V', code: 29 },
  { key: 'W', code: 32 },
  { key: 'X', code: 30 },
  { key: 'Y', code: 31 },
  { key: 'Z', code: 33 },
];

export function verifyVictimId(value) {
  const id = /^\+?(\d{3})([A-Z]{3})(\d{6})$/gi.exec(value);

  if (!id) return false;

  const total = charNum[id[2][0]] * 9 +
                charNum[id[2][1]] * 8 +
                charNum[id[2][2]] * 7 +
                parseInt(id[3][0], 10) * 6 +
                parseInt(id[3][1], 10) * 5 +
                parseInt(id[3][2], 10) * 4 +
                parseInt(id[3][3], 10) * 3 +
                parseInt(id[3][4], 10) * 2 +
                parseInt(id[3][5], 10);

  return total % 10 === 0 ? `+${id[1]}${id[2]}${id[3]}` : false;
}

export function verifyTaiwanId(value) {
  const id = /^([A-Z])([12])(\d{8})$/gi.exec(value);

  if (!id) return false;

  const total = parseInt(charNum[id[1][0]] / 10, 10) * 1 +
                (charNum[id[1][0]] % 10) * 9 +
                parseInt(id[2][0], 10) * 8 +
                parseInt(id[3][0], 10) * 7 +
                parseInt(id[3][1], 10) * 6 +
                parseInt(id[3][2], 10) * 5 +
                parseInt(id[3][3], 10) * 4 +
                parseInt(id[3][4], 10) * 3 +
                parseInt(id[3][5], 10) * 2 +
                parseInt(id[3][6], 10) * 1 +
                parseInt(id[3][7], 10) * 1;

  return total % 10 === 0 ? id : false;
}

export function getPrefix(value) {
  const id = /^([12])(\d{8})$/gi.exec(value);

  if (!id) return false;

  const total = parseInt(id[1][0]) * 8 +
                parseInt(id[2][0]) * 7 +
                parseInt(id[2][1]) * 6 +
                parseInt(id[2][2]) * 5 +
                parseInt(id[2][3]) * 4 +
                parseInt(id[2][4]) * 3 +
                parseInt(id[2][5]) * 2 +
                parseInt(id[2][6]) * 1 +
                parseInt(id[2][7]) * 1;

  return filter(charNum, ({ code }) => (
    ((Math.floor(code / 10) * 1) + (code % 10 * 9) + total) % 10 === 0
  ));
}
