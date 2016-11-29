import _ from 'lodash';
import faker from 'faker';
import { Kind } from 'graphql';
import GraphQLMobile from '../GraphQLMobile';

const mobile = faker.phone.phoneNumber('9########');
const badMobile = faker.phone.phoneNumber('########');

describe('GraphQLMobile Type', () => {
  it('serialize', async () => {
    expect(GraphQLMobile.serialize(mobile)).toBe(`0${mobile}`);
    expect(GraphQLMobile.serialize(`0${mobile} `)).toBe(`0${mobile}`);
    expect(() => GraphQLMobile.parseValue(badMobile)).toThrowError(TypeError);
  });

  it('parseValue', async () => {
    expect(GraphQLMobile.parseValue(`0${mobile} `)).toBe(mobile);
    expect(GraphQLMobile.parseValue(mobile)).toBe(mobile);
    expect(() => GraphQLMobile.parseValue(badMobile)).toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    expect(GraphQLMobile.parseLiteral({
      kind: Kind.STRING,
      value: ` 0${mobile} `,
      loc: { start: 0, end: 10 },
    })).toBe(mobile);

    expect(GraphQLMobile.parseLiteral({
      kind: Kind.INT,
      value: _.parseInt(mobile),
      loc: { start: 0, end: 10 },
    })).toBe(mobile);

    const kind = faker.random.objectElement(_.omit(Kind, ['STRING', 'INT']));
    expect(GraphQLMobile.parseLiteral({
      kind,
      value: mobile,
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLMobile.parseLiteral({
      kind: Kind.STRING,
      value: badMobile,
      loc: { start: 0, end: 10 },
    })).toBeNull();
  });
});
