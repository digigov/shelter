import _ from 'lodash';
import faker from 'faker';
import { Kind } from 'graphql';
import GraphQLPassword from '../GraphQLPassword';

const password = faker.internet.password();

describe('GraphQLPassword Type', () => {
  it('serialize', async () => {
    expect(GraphQLPassword.serialize(password)).toBe(true);
    expect(GraphQLPassword.serialize()).toBe(false);
  });

  it('parseValue', async () => {
    expect(GraphQLPassword.parseValue(password)).toBe(password);
    expect(() => GraphQLPassword.parseValue(`${_.random(1, 99999)}`))
      .toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    expect(GraphQLPassword.parseLiteral({
      kind: Kind.STRING,
      value: password,
      loc: { start: 0, end: 10 },
    })).toBe(password);

    expect(GraphQLPassword.parseLiteral({
      kind: faker.random.objectElement(_.omit(Kind, ['STRING'])),
      value: password,
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLPassword.parseLiteral({
      kind: Kind.STRING,
      value: `${_.random(1, 99999)}`,
      loc: { start: 0, end: 10 },
    })).toBeNull();
  });
});
