/**
 * @providesModule VictimId
 */
import parseInt from 'lodash/parseInt';
import filter from 'lodash/filter';
import findKey from 'lodash/findKey';
import random from 'lodash/random';

const charNum = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
  16: 'G',
  17: 'H',
  34: 'I',
  18: 'J',
  19: 'K',
  20: 'L',
  21: 'M',
  22: 'N',
  35: 'O',
  23: 'P',
  24: 'Q',
  25: 'R',
  26: 'S',
  27: 'T',
  28: 'U',
  29: 'V',
  32: 'W',
  30: 'X',
  31: 'Y',
  33: 'Z',
};

export function verify(value) {
  const id = /^([A-Z])([123])(\d{8})$/gi.exec(value);

  if (!id) return false;

  const num = parseInt(findKey(charNum, (char) => char === id[1][0]));

  const total = Math.floor(num / 10) * 1 +
                (num % 10) * 9 +
                parseInt(id[2][0]) * 8 +
                parseInt(id[3][0]) * 7 +
                parseInt(id[3][1]) * 6 +
                parseInt(id[3][2]) * 5 +
                parseInt(id[3][3]) * 4 +
                parseInt(id[3][4]) * 3 +
                parseInt(id[3][5]) * 2 +
                parseInt(id[3][6]) * 1 +
                parseInt(id[3][7]) * 1;

  return total % 10 === 0 ? id : false;
}

export function generate() {
  const id = ['A', 3, random(9), random(9), random(9), random(9), random(9), random(9), random(9)];

  const num = parseInt(findKey(charNum, (char) => char === id[0]));

  const total = Math.floor(num / 10) * 1 +
                (num % 10) * 9 +
                parseInt(id[1], 10) * 8 +
                parseInt(id[2], 10) * 7 +
                parseInt(id[3], 10) * 6 +
                parseInt(id[4], 10) * 5 +
                parseInt(id[5], 10) * 4 +
                parseInt(id[6], 10) * 3 +
                parseInt(id[7], 10) * 2 +
                parseInt(id[8], 10) * 1;

  id.push(10 - (total % 10) % 10);

  return id.join('');
}

export function prefix(value) {
  const id = /^([123])(\d{8})$/gi.exec(value);

  if (!id) return [];

  const total = parseInt(id[1][0]) * 8 +
                parseInt(id[2][0]) * 7 +
                parseInt(id[2][1]) * 6 +
                parseInt(id[2][2]) * 5 +
                parseInt(id[2][3]) * 4 +
                parseInt(id[2][4]) * 3 +
                parseInt(id[2][5]) * 2 +
                parseInt(id[2][6]) * 1 +
                parseInt(id[2][7]) * 1;

  return filter(charNum, (key, num) =>
    ((Math.floor(num / 10) * 1) + (num % 10 * 9) + total) % 10 === 0
  );
}
