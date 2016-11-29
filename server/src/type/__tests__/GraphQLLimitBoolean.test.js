import _ from 'lodash';
import faker from 'faker';
import { Kind } from 'graphql';
import GraphQLLimitBoolean from '../GraphQLLimitBoolean';

const past = faker.date.past();
const future = faker.date.future();

const date = new Date();
const iso8601 = date.toJSON();
const timestamp = date.getTime();

describe('GraphQLLimitBoolean Type', () => {
  it('serialize', async () => {
    expect(GraphQLLimitBoolean.serialize(past)).toBe(false);
    expect(GraphQLLimitBoolean.serialize(future)).toBe(true);
    expect(GraphQLLimitBoolean.serialize(true)).toBe(true);
    expect(GraphQLLimitBoolean.serialize(false)).toBe(false);
    expect(() => GraphQLLimitBoolean.serialize('xyz')).toThrowError(TypeError);
  });

  it('parseValue', async () => {
    expect(GraphQLLimitBoolean.parseValue(iso8601).toJSON()).toBe(iso8601);
    expect(GraphQLLimitBoolean.parseValue(timestamp).toJSON()).toBe(iso8601);
    expect(() => GraphQLLimitBoolean.parseValue('xyz')).toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    expect(GraphQLLimitBoolean.parseLiteral({
      kind: Kind.STRING,
      value: iso8601,
      loc: { start: 0, end: 10 },
    }).toJSON()).toBe(iso8601);

    expect(GraphQLLimitBoolean.parseLiteral({
      kind: Kind.INT,
      value: timestamp,
      loc: { start: 0, end: 10 },
    }).toJSON()).toBe(iso8601);

    expect(GraphQLLimitBoolean.parseLiteral({
      kind: _.sample(_.omit(Kind, ['STRING', 'INT'])),
      value: timestamp,
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLLimitBoolean.parseLiteral({
      kind: Kind.STRING,
      value: 'xyz',
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLLimitBoolean.parseLiteral({
      kind: Kind.STRING,
      value: `2016-${_.random(13, 99)}-${_.random(32, 99)}`,
      loc: { start: 0, end: 10 },
    })).toBeNull();
  });
});
