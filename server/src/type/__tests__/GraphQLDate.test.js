import _ from 'lodash';
import faker from 'faker';
import { Kind } from 'graphql';
import GraphQLDate from '../GraphQLDate';

const date = new Date();
const iso8601 = date.toJSON();
const timestamp = date.getTime();

describe('GraphQLDate Type', () => {
  it('serialize', async () => {
    expect(GraphQLDate.serialize(iso8601)).toBe(iso8601);
    expect(GraphQLDate.serialize(timestamp)).toBe(iso8601);
  });

  it('parseValue', async () => {
    expect(GraphQLDate.parseValue(iso8601).toJSON()).toBe(iso8601);
    expect(GraphQLDate.parseValue(timestamp).toJSON()).toBe(iso8601);

    const value = faker.lorem.word();
    expect(() => GraphQLDate.parseValue(value)).toThrowError(TypeError);
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

    const value = faker.lorem.word();
    expect(() => GraphQLDate.parseLiteral({
      kind: Kind.STRING,
      value,
      loc: { start: 0, end: 10 },
    })).toThrowError(TypeError);

    expect(() => GraphQLDate.parseLiteral({
      kind: Kind.STRING,
      value: `2016-${_.random(13, 99)}-${_.random(32, 99)}`,
      loc: { start: 0, end: 10 },
    })).toThrowError(TypeError);
  });
});
