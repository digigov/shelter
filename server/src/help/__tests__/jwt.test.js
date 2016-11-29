/* eslint import/imports-first: 0 */

import _ from 'lodash';
import faker from 'faker';
import jsonwebtoken from 'jsonwebtoken';
import jwt from '../jwt';
import JsonWebTokenError from '../../error/JsonWebTokenError';

describe('jwt help', () => {
  it('sign method', async () => {
    const maxStudio = _.random(5, 20);
    const member = {
      id: _.random(1, 999),
      isAdmin: faker.date.future(),
      enabled_studio: faker.date.past(),
      rule: JSON.stringify({ maxStudio }),
    };

    expect(
      _.omit(jsonwebtoken.decode(jwt.sign(member)), ['aud', 'exp', 'iat', 'iss'])
    ).toEqual({
      id: member.id,
      isAdmin: true,
      enabledStudio: member.enabled_studio.toJSON(),
      rule: { maxStudio },
    });

    expect(
      _.omit(jsonwebtoken.decode(jwt.sign({
        ...member,
        isAdmin: faker.date.past(),
        rule: { maxStudio },
      })), ['aud', 'exp', 'iat', 'iss'])
    ).toEqual({
      id: member.id,
      isAdmin: false,
      enabledStudio: member.enabled_studio.toJSON(),
      rule: { maxStudio },
    });
  });

  it('compile method', async () => {
    const user = faker.helpers.userCard();
    const audience = `${_.random(1, 999)}`;

    const clientToken = jwt.compile(user);
    expect(jsonwebtoken.decode(clientToken).aud).toBe('client');

    const token = jwt.compile(user, audience);
    const payload = jsonwebtoken.decode(token);
    expect(_.omit(payload, ['aud', 'exp', 'iat', 'iss'])).toEqual(user);
    expect(payload.iss).toBe('victim');
    expect(payload.aud).toBe(audience);
    expect(payload.exp).toBeGreaterThan((Date.now() / 1000) + (60 * 60 * 24 * 4));
  });

  it('verify method', async () => {
    const user = faker.helpers.userCard();
    const audience = `${_.random(1, 999)}`;
    const token = jwt.compile(user, audience);
    const payload = jwt.verify(token, audience);
    expect(_.omit(payload, ['aud', 'exp', 'iat', 'iss'])).toEqual(user);
    expect(() => jwt.verify(token)).toThrowError(JsonWebTokenError);
  });
});
