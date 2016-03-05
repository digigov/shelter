'use strict';

const charNum = {A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34, J: 18, K: 19, L: 20, M: 21, N: 22, O: 35, P: 23, Q: 24, R: 25, S: 26, T: 27, U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33};

module.exports = {
  verifyVictimId: function (value) {
    value = /^\+?(\d{3})([A-Z]{3})(\d{6})$/gi.exec(value);

    if (!value) return false;

    const total = charNum[value[2][0]] * 9 +
                  charNum[value[2][1]] * 8 + 
                  charNum[value[2][2]] * 7 +
                  parseInt(value[3][0], 10) * 6 +
                  parseInt(value[3][1], 10) * 5 +
                  parseInt(value[3][2], 10) * 4 +
                  parseInt(value[3][3], 10) * 3 +
                  parseInt(value[3][4], 10) * 2 +
                  parseInt(value[3][5], 10);

    return total % 10 === 0 ? `+${value[1]}${value[2]}${value[3]}` : false;
  },
  verifyTaiwanId: function (value) {
    value = /^([A-Z])([12])(\d{8})$/gi.exec(value);

    if (!value) return false;

    const total = parseInt(charNum[value[1][0]] / 10, 10) * 1 +
                  (charNum[value[1][0]] % 10) * 9 +
                  parseInt(value[2][0], 10) * 8 +
                  parseInt(value[3][0], 10) * 7 +
                  parseInt(value[3][1], 10) * 6 +
                  parseInt(value[3][2], 10) * 5 +
                  parseInt(value[3][3], 10) * 4 +
                  parseInt(value[3][4], 10) * 3 +
                  parseInt(value[3][5], 10) * 2 +
                  parseInt(value[3][6], 10) * 1 +
                  parseInt(value[3][7], 10) * 1;

    return total % 10 === 0 ? value : false;
  }
};