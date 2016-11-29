import _ from 'lodash';
import { Kind } from 'graphql';
import GraphQLDate from '../GraphQLDate';

const date = new Date();
const iso8601 = date.toJSON();
const timestamp = date.getTime();

describe('GraphQLDate Type', () => {
  it('serialize', async () => {
    expect(GraphQLDate.serialize(iso8601)).toBe(iso8601);
    expect(GraphQLDate.serialize(timestamp)).toBe(iso8601);
    expect(() => GraphQLDate.serialize('xyz')).toThrowError(TypeError);
  });

  it('parseValue', async () => {
    expect(GraphQLDate.parseValue(iso8601).toJSON()).toBe(iso8601);
    expect(GraphQLDate.parseValue(timestamp).toJSON()).toBe(iso8601);
    expect(() => GraphQLDate.parseValue('xyz')).toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    expect(GraphQLDate.parseLiteral({
      kind: Kind.STRING,
      value: iso8601,
      loc: { start: 0, end: 10 },
    }).toJSON()).toBe(iso8601);

    expect(GraphQLDate.parseLiteral({
      kind: Kind.INT,
      value: timestamp,
      loc: { start: 0, end: 10 },
    }).toJSON()).toBe(iso8601);

    expect(GraphQLDate.parseLiteral({
      kind: _.sample(_.omit(Kind, ['STRING', 'INT'])),
      value: timestamp,
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLDate.parseLiteral({
      kind: Kind.STRING,
      value: 'xyz',
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLDate.parseLiteral({
      kind: Kind.STRING,
      value: `2016-${_.random(13, 99)}-${_.random(32, 99)}`,
      loc: { start: 0, end: 10 },
    })).toBeNull();
  });
});
