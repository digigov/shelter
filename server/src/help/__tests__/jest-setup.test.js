/* eslint no-param-reassign: ["error", { "props": false }] */

import _ from 'lodash';
import faker from 'faker';
import { sql } from '../../model/Database';
import { matchers, toEqualError, toHaveBeenQueriedWith, toHaveBeenLastQueriedWith } from '../jest-setup';

function CustomError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'CustomError';
  this.message = message || 'custom error';
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

const table = faker.lorem.word();

const data = {
  is_house: true,
  beer: 'taiwan',
  unit: 99,
  disabed: new Date(),
  detail: JSON.stringify({ city: 'taipei' }),
  item: JSON.stringify([1, 3]),
};

const compared = {
  isHouse: true,
  beer: 'taiwan',
  unit: 99,
  disabed: new Date(),
  detail: { city: 'taipei' },
  item: [1, 3],
};

describe('jest-setup help', () => {
  it('add matchers to jest', () => {
    expect(matchers.toEqualError()).toEqual({ compare: toEqualError });
    expect(matchers.toHaveBeenQueriedWith()).toEqual({ compare: toHaveBeenQueriedWith });
    expect(matchers.toHaveBeenLastQueriedWith()).toEqual({ compare: toHaveBeenLastQueriedWith });
  });

  it('toEqualError when actual is not error', () => {
    expect(toEqualError('not error').pass).toBe(false);
    expect(toEqualError(new Error('error')).pass).toBe(true);
    expect(toEqualError({ errors: [{ originalError: new Error('error') }] }).pass).toBe(true);
    expect(toEqualError({ errors: [new Error('error')] }).pass).toBe(true);

    expect(toEqualError('not error').message()).not.toBeUndefined();
    expect(toEqualError(new Error('error')).message()).not.toBeUndefined();
  });

  it('toEqualError when expected is String', () => {
    expect(toEqualError(new Error('new error'), 'new error').pass).toBe(true);
    expect(toEqualError(new Error('new error'), 'old error').pass).toBe(false);
  });

  it('toEqualError when expected is RegExp', () => {
    expect(toEqualError(new Error('error time'), /^error/).pass).toBe(true);
    expect(toEqualError(new Error('house error'), /^error/).pass).toBe(false);
  });

  it('toEqualError when expected is Function', () => {
    expect(toEqualError(new CustomError(), CustomError).pass).toBe(true);
    expect(toEqualError(new CustomError('throw error'), CustomError).pass).toBe(true);
    expect(toEqualError(new Error('custom error'), CustomError).pass).toBe(false);
  });

  it('toEqualError when expected is Error', () => {
    expect(toEqualError(new CustomError(), new CustomError()).pass).toBe(true);
    expect(toEqualError(new CustomError('throw error'), new CustomError('throw error')).pass).toBe(true);
    expect(toEqualError(new Error(), new Error()).pass).toBe(true);
    expect(toEqualError(new Error('throw error'), new Error('throw error')).pass).toBe(true);
    expect(toEqualError(new Error('throw error'), new CustomError('throw error')).pass).toBe(false);
    expect(toEqualError(new Error('throw error'), new Error('custom error')).pass).toBe(false);
  });

  it('toHaveBeenLastQueriedWith when select', () => {
    const queried = jest.fn();
    const limit = _.random(1, 10);
    const offset = _.random(1, 10);

    queried({}, sql(table).where({ is_house: true, beer: 'japan' }).toSQL());
    queried({}, sql(table)
      .where({ ...data }).limit(limit).offset(offset)
      .toSQL()
    );

    _.forEach([
      { method: 'select', table, ...compared, limit, offset },
      { method: 'select', table, ...compared, beer: /^[a-z]+$/i, limit, offset },
      { method: 'select', table, ...compared, isHouse: () => true, limit, offset },
      { method: 'select', table, ...compared, disabed: Date, limit, offset },
    ], (expected) => {
      const reply = toHaveBeenLastQueriedWith(queried, expected);
      expect(reply.pass).toBe(true);
      expect(reply.message()).not.toBeUndefined();
    });

    _.forEach([
      { method: 'select', table, limit, offset },
      { method: 'select', table, ...compared, detail: { city: 'japan' }, limit, offset },
      { method: 'select', table, ...compared, isHouse: false, limit, offset },
      { method: 'select', table, ...compared, isHouse: () => false, limit, offset },
      { method: 'select', table, ...compared, beer: 'japan', limit, offset },
      { method: 'select', table, ...compared, beer: /^[0-1]+$/i, limit, offset },
      { method: 'select', table, ...compared, unit: 10, limit, offset },
      { method: 'select', table, ...compared, disabed: faker.date.past(), limit, offset },
    ], (expected) => {
      const reply = toHaveBeenLastQueriedWith(queried, expected);
      expect(reply.pass).toBe(false);
      expect(reply.message()).not.toBeUndefined();
    });
  });

  it('toHaveBeenLastQueriedWith when update', () => {
    const queried = jest.fn();
    const id = _.random(1, 99);

    queried({}, sql(table).where({ is_house: true, beer: 'japan' }).toSQL());
    queried({}, sql(table).where({ id }).update(data).toSQL());

    _.forEach([
      { method: 'update', id, table, ...compared },
    ], (expected) => {
      const reply = toHaveBeenLastQueriedWith(queried, expected);
      expect(reply.pass).toBe(true);
      expect(reply.message()).not.toBeUndefined();
    });

    _.forEach([
      { method: 'select', id, table, ...compared },
      { method: 'update', table, ...compared },
    ], (expected) => {
      const reply = toHaveBeenLastQueriedWith(queried, expected);
      expect(reply.pass).toBe(false);
      expect(reply.message()).not.toBeUndefined();
    });
  });

  it('toHaveBeenLastQueriedWith when insert', () => {
    const queried = jest.fn();

    queried({}, sql(table).where({ is_house: true, beer: 'japan' }).toSQL());
    queried({}, sql(table).insert(data).toSQL());

    _.forEach([
      { method: 'insert', table, ...compared },
    ], (expected) => {
      const reply = toHaveBeenLastQueriedWith(queried, expected);
      expect(reply.pass).toBe(true);
      expect(reply.message()).not.toBeUndefined();
    });

    _.forEach([
      { method: 'select', table, ...compared },
      { method: 'insert', table },
    ], (expected) => {
      const reply = toHaveBeenLastQueriedWith(queried, expected);
      expect(reply.pass).toBe(false);
      expect(reply.message()).not.toBeUndefined();
    });
  });

  it('toHaveBeenLastQueriedWith when actual json is not stringify', () => {
    const queried = jest.fn();
    queried({}, sql(table).where({ ...data, detail: compared.detail }).toSQL());

    expect(toHaveBeenLastQueriedWith(
      queried,
      { method: 'select', table, ...compared }
    ).pass).toBe(false);
  });

  it('toHaveBeenLastQueriedWith when not have call', () => {
    const queried = jest.fn();

    const reply = toHaveBeenLastQueriedWith(queried, { method: 'select' });
    expect(reply.pass).toBe(false);
    expect(reply.message()).not.toBeUndefined();
  });

  it('toHaveBeenLastQueriedWith when is not mock', () => {
    expect(() => toHaveBeenLastQueriedWith({})).toThrow();
  });

  it('toHaveBeenQueriedWith when expected is object', () => {
    const queried = jest.fn();

    queried({}, sql(table).where({ is_house: true, beer: 'japan' }).toSQL());
    queried({}, sql(table).where({ ...data }).toSQL());
    queried({}, sql(table).where({ is_house: true, beer: 'wow' }).toSQL());

    const reply = toHaveBeenQueriedWith(queried, { method: 'select', table, ...compared });
    expect(reply.pass).toBe(true);
    expect(reply.message()).not.toBeUndefined();
  });

  it('toHaveBeenQueriedWith when expected is array', () => {
    const queried = jest.fn();

    queried({}, sql(table).where({ is_house: true, beer: 'japan' }).toSQL());
    queried({}, sql(table).where({ ...data }).toSQL());

    const reply1 = toHaveBeenQueriedWith(queried, [
      { method: 'select', table, is_house: true, beer: 'japan' },
      { method: 'select', table, ...compared },
    ]);
    expect(reply1.pass).toBe(true);
    expect(reply1.message()).not.toBeUndefined();

    const reply2 = toHaveBeenQueriedWith(queried, [
      { method: 'select', table, ...compared },
      { method: 'select', table, is_house: true, beer: 'japan' },
    ]);
    expect(reply2.pass).toBe(false);
    expect(reply2.message()).not.toBeUndefined();

    const reply3 = toHaveBeenQueriedWith(queried, [
      { method: 'select', table, is_house: true, beer: 'japan' },
    ]);
    expect(reply3.pass).toBe(true);
    expect(reply3.message()).not.toBeUndefined();

    const reply4 = toHaveBeenQueriedWith(queried, [
      { method: 'select', table, ...compared },
    ]);
    expect(reply4.pass).toBe(false);
    expect(reply4.message()).not.toBeUndefined();
  });

  it('toHaveBeenQueriedWith when not have call', () => {
    const queried = jest.fn();

    const reply1 = toHaveBeenQueriedWith(queried, { method: 'select' });
    expect(reply1.pass).toBe(false);
    expect(reply1.message()).not.toBeUndefined();

    const reply2 = toHaveBeenQueriedWith(queried, [{ method: 'select' }]);
    expect(reply2.pass).toBe(false);
    expect(reply2.message()).not.toBeUndefined();
  });

  it('toHaveBeenQueriedWith when is not mock', () => {
    expect(() => toHaveBeenQueriedWith({})).toThrow();
  });
});
