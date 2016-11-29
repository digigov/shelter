import _ from 'lodash';
import { Kind } from 'graphql';
import GraphQLMapType from '../GraphQLMapType';

const arrayData = ['circuit', 'bus', 'microchip', 'protocol', 'monitor'];
const objectData = _.mapKeys(arrayData, (value) => `${value}Key`);

const arrayMap = new GraphQLMapType({ name: 'MapTypeTest', values: arrayData });
const objectMap = new GraphQLMapType({ name: 'MapTypeTest', values: objectData });

describe('GraphQLMapType Type', () => {
  it('serialize', async () => {
    const idx = _.random(arrayData.length - 1);
    expect(arrayMap.serialize(idx)).toBe(arrayData[idx]);
    expect(() => arrayMap.serialize(_.random(arrayData.length, 999)))
      .toThrowError(TypeError);

    const key = _.sample(objectData);
    expect(objectMap.serialize(`${key}Key`)).toBe(key);
    expect(() => objectMap.serialize('driveKey'))
      .toThrowError(TypeError);
  });

  it('parseValue', async () => {
    const idx = _.random(arrayData.length - 1);
    expect(arrayMap.parseValue(arrayData[idx])).toBe(idx);
    expect(() => arrayMap.parseValue('drive'))
      .toThrowError(TypeError);

    const value = _.sample(objectData);
    expect(objectMap.parseValue(value)).toBe(`${value}Key`);
    expect(() => objectMap.parseValue('drive'))
      .toThrowError(TypeError);
  });

  it('parseLiteral', async () => {
    const idx = _.random(arrayData.length - 1);
    expect(arrayMap.parseLiteral({
      kind: Kind.INT,
      value: arrayData[idx],
      loc: { start: 0, end: 10 },
    })).toBe(idx);

    const value = _.sample(objectData);
    expect(objectMap.parseLiteral({
      kind: Kind.STRING,
      value,
      loc: { start: 0, end: 10 },
    })).toBe(`${value}Key`);

    expect(arrayMap.parseLiteral({
      kind: _.sample(_.omit(Kind, ['STRING', 'INT'])),
      value: _.sample(objectData),
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(arrayMap.parseLiteral({
      kind: Kind.INT,
      value: 'drive',
      loc: { start: 0, end: 10 },
    })).toBeNull();

    expect(objectMap.parseLiteral({
      kind: Kind.STRING,
      value: 'drive',
      loc: { start: 0, end: 10 },
    })).toBeNull();
  });
});
