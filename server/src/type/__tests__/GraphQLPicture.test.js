import _ from 'lodash';
import faker from 'faker';
import { Kind } from 'graphql';
import GraphQLPicture from '../GraphQLPicture';

const avatarJPG = '/uifaces/faces/twitter/adityasutomo/128.jpg';
const avatarPNG = '/uifaces/faces/twitter/adityasutomo/128.png';
const avatarGIF = '/uifaces/faces/twitter/adityasutomo/128.gif';

describe('GraphQLPicture Type', () => {
  it('serialize', async () => {
    expect(GraphQLPicture.serialize(avatarJPG)).toBe(avatarJPG);
    expect(GraphQLPicture.serialize(avatarPNG)).toBe(avatarPNG);
    expect(() => GraphQLPicture.serialize(avatarGIF)).toThrowError(TypeError);
    expect(() => GraphQLPicture.serialize(123)).toThrowError(TypeError);
  });

  it('parseValue', async () => {
    expect(GraphQLPicture.parseValue(avatarJPG)).toBe(avatarJPG);
    expect(GraphQLPicture.parseValue(avatarPNG)).toBe(avatarPNG);
    expect(() => GraphQLPicture.parseValue(avatarGIF)).toThrowError(TypeError);
    expect(() => GraphQLPicture.parseValue(123)).toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    expect(GraphQLPicture.parseLiteral({
      kind: Kind.STRING,
      value: avatarJPG,
      loc: { start: 0, end: 10 },
    })).toBe(avatarJPG);

    expect(GraphQLPicture.parseLiteral({
      kind: Kind.STRING,
      value: avatarPNG,
      loc: { start: 0, end: 10 },
    })).toBe(avatarPNG);

    expect(GraphQLPicture.parseLiteral({
      kind: faker.random.objectElement(_.omit(Kind, ['STRING'])),
      value: avatarJPG,
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(GraphQLPicture.parseLiteral({
      kind: Kind.STRING,
      value: avatarGIF,
      loc: { start: 0, end: 10 },
    })).toBeNull();
  });
});
