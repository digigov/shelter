import _ from 'lodash';
import faker from 'faker';
import { Kind } from 'graphql';
import GraphQLEmail from '../GraphQLEmail';

const email = faker.internet.email();

describe('GraphQLEmail Type', () => {
  it('serialize', async () => {
    expect(GraphQLEmail.serialize(email)).toBe(email);
    expect(() => GraphQLEmail.serialize(email.replace('@', '')))
      .toThrowError(TypeError);
  });

  it('parseValue', async () => {
    expect(GraphQLEmail.parseValue(email)).toBe(email);
    expect(() => GraphQLEmail.parseValue(email.replace('@', '')))
      .toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    expect(GraphQLEmail.parseLiteral({
      kind: Kind.STRING,
      value: email,
      loc: { start: 0, end: 10 },
    })).toBe(email);

    expect(GraphQLEmail.parseLiteral({
      kind: faker.random.objectElement(_.omit(Kind, ['STRING'])),
      value: email,
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLEmail.parseLiteral({
      kind: Kind.STRING,
      value: email.replace('@', ''),
      loc: { start: 0, end: 10 },
    })).toBeNull();
  });
});
