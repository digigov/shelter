import _ from 'lodash';
import faker from 'faker';
import { Kind } from 'graphql';
import { prefix, generate } from 'taiwanid';
import GraphQLVictimId from '../GraphQLVictimId';

const victimId = generate();
const victimNum = _.parseInt(`${prefix[victimId[0]]}${victimId.substr(1)}`);

describe('GraphQLVictimId Type', () => {
  it('serialize', async () => {
    expect(GraphQLVictimId.serialize(victimNum)).toBe(victimId);
  });

  it('parseValue', async () => {
    expect(GraphQLVictimId.parseValue(victimId)).toBe(victimNum);
    expect(() => GraphQLVictimId.parseValue(victimId.substr(1))).toThrowError(TypeError);
    expect(() => GraphQLVictimId.parseValue(`${victimId}${faker.random.number(9)}`)).toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    expect(GraphQLVictimId.parseLiteral({
      kind: Kind.STRING,
      value: victimId,
      loc: { start: 0, end: 10 },
    })).toBe(victimNum);

    expect(() => GraphQLVictimId.parseLiteral({
      kind: Kind.STRING,
      value: victimId.substr(1),
      loc: { start: 0, end: 10 },
    })).toThrowError(TypeError);

    expect(() => GraphQLVictimId.parseLiteral({
      kind: Kind.STRING,
      value: `${victimId}${faker.random.number(9)}`,
      loc: { start: 0, end: 10 },
    })).toThrowError(TypeError);
  });
});
