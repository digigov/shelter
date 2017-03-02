import faker from 'faker';
import { Kind } from 'graphql';
import GraphQLPhoneNumber from '../GraphQLPhoneNumber';

const mobile = faker.phone.phoneNumber('+###-6########');

describe('GraphQLPhoneNumber Type', () => {
  it('serialize', async () => {
    expect(GraphQLPhoneNumber.serialize(mobile)).toBe(`${mobile}`);
  });

  it('parseValue', async () => {
    expect(GraphQLPhoneNumber.parseValue(mobile)).toBe(mobile);
    expect(GraphQLPhoneNumber.parseValue(` ${mobile} `)).toBe(mobile);
    expect(() => GraphQLPhoneNumber.parseValue(
      faker.phone.phoneNumber('+###-0######')
    )).toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    expect(GraphQLPhoneNumber.parseLiteral({
      kind: Kind.STRING,
      value: ` ${mobile} `,
      loc: { start: 0, end: 10 },
    })).toBe(mobile);

    expect(() => GraphQLPhoneNumber.parseLiteral({
      kind: Kind.STRING,
      value: faker.phone.phoneNumber('+###-0######'),
      loc: { start: 0, end: 10 },
    })).toThrowError(TypeError);
  });
});
