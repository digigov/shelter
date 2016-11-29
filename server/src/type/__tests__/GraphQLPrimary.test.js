import _ from 'lodash';
import faker from 'faker';
import { Kind } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import GraphQLPrimary, { PrimaryKey } from '../GraphQLPrimary';

const max = 99999999999999;

const key = _.random(1, 999);

const primaryKey = new PrimaryKey(key, 'node');

const globalId = toGlobalId('node', key);

describe('GraphQLPrimary Type', () => {
  it('PrimaryKey', async() => {
    expect(new PrimaryKey(key)).toEqual({ key, type: '' });
    expect(primaryKey).toEqual({ key, type: 'node' });
    expect(primaryKey.getKey()).toEqual(key);
    expect(primaryKey.getType()).toEqual('node');
    expect(() => new PrimaryKey('', 'node')).toThrowError(TypeError);
    expect(() => new PrimaryKey(0, 'node')).toThrowError(TypeError);
    expect(() => new PrimaryKey(max + 1, 'node')).toThrowError(TypeError);
  });

  it('serialize', async () => {
    expect(GraphQLPrimary.serialize(primaryKey)).toBe(globalId);
  });

  it('parseValue', async () => {
    expect(GraphQLPrimary.parseValue(globalId)).toEqual({ key, type: 'node' });
    expect(() => GraphQLPrimary.parseValue(toGlobalId({ type: 'Node', id: '' })))
      .toThrowError(TypeError);
    expect(() => GraphQLPrimary.parseValue(toGlobalId({ type: 'Node', id: 0 })))
      .toThrowError(TypeError);
    expect(() => GraphQLPrimary.parseValue(toGlobalId({ type: 'Node', id: max + 1 })))
      .toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    expect(GraphQLPrimary.parseLiteral({
      kind: Kind.STRING,
      value: globalId,
      loc: { start: 0, end: 10 },
    })).toEqual({ key, type: 'node' });

    expect(GraphQLPrimary.parseLiteral({
      kind: faker.random.objectElement(_.omit(Kind, ['STRING'])),
      value: globalId,
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLPrimary.parseLiteral({
      kind: Kind.STRING,
      value: toGlobalId({ type: 'node', id: '' }),
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLPrimary.parseLiteral({
      kind: Kind.INT,
      value: toGlobalId({ type: 'node', id: max + 1 }),
      loc: { start: 0, end: 10 },
    })).toBeNull();
  });
});
