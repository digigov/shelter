import _ from 'lodash';
import ider from '../ider';

describe('ider help', () => {
  it('get id', async () => {
    expect(ider(_.random(1, 9999999))).toMatch(/^[A-Z][A-Z]0[0-9]{7}$/i);
    expect(ider(19999999)).toMatch(/^[A-Z][A-Z]09999999$/i);
    expect(ider(99)).toMatch(/^[A-Z][A-Z]00000099$/i);
    expect(ider(99, 'X')).toMatch(/^[A-Z][A-Z]X0000099$/i);
    expect(ider(3499, 'M', new Date('2020-09-19'))).toBe('CRM0003499');
  });
});
