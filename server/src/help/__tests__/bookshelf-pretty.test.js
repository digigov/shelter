/* eslint no-param-reassign: ["error", { "props": false }] */

import _ from 'lodash';
import faker from 'faker';
import knex from 'knex';
import bookshelf from 'bookshelf';
import pretty from '../bookshelf-pretty';

const query = jest.fn(() => Promise.resolve([]));

const client = class extends knex.Client {
  _query = query;
  acquireConnection = () => Promise.resolve({});
  processResponse = (resp) => resp;
  releaseConnection = () => Promise.resolve();
};

const orm = bookshelf(knex({ client }));
orm.plugin(pretty);

const Model = orm.Model.extend({
  tableName: 'tableName',
  hasTimestamps: true,
  json: ['jsdata'],
});

const data = {
  sedNumber: _.random(1, 999),
  autString: faker.lorem.word(),
  deepLine: faker.lorem.lines(),
  detail: {
    venus: _.random(1, 999),
    sun: faker.lorem.word(),
    moon: faker.lorem.word(),
  },
  jsdata: faker.helpers.userCard(),
};

describe('bookshelf-pretty help', () => {
  it('when save', async () => {
    const model = new Model();
    query.mockClear();
    await model.save({ ...data, detail: JSON.stringify(data.detail) });
    expect(query).toHaveBeenLastQueriedWith({
      ...data,
      detail: JSON.stringify(data.detail),
      jsdata: JSON.stringify(data.jsdata),
      createdAt: Date,
      updatedAt: Date,
      method: 'insert',
      table: 'tableName',
    });
  });

  it('when fetch', async () => {
    const model = new Model();
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{
      ..._.mapKeys(data, (value, key) => _.snakeCase(key)),
      detail: data.detail,
      jsdata: JSON.stringify(data.jsdata),
    }]));
    const result = await model.fetch();
    const { detail, ...otherData } = data;
    expect(result.toJSON()).toEqual({ ...otherData, ...detail });
  });

  it('when where is string', async () => {
    const model = new Model();
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{
      ..._.mapKeys(data, (value, key) => _.snakeCase(key)),
      detail: data.detail,
      jsdata: JSON.stringify(data.jsdata),
    }]));
    const result = await model.where('sedNumber', 5).fetchAll();
    const { detail, ...otherData } = data;
    expect(query).toHaveBeenLastQueriedWith({
      method: 'select', table: 'tableName', sed_number: 5,
    });
    expect(result.toJSON()).toEqual([{ ...otherData, ...detail }]);
  });

  it('when where is object', async () => {
    const model = new Model();
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{
      ..._.mapKeys(data, (value, key) => _.snakeCase(key)),
      detail: data.detail,
      jsdata: JSON.stringify(data.jsdata),
    }]));
    const result = await model.where({ sedNumber: 5 }).fetchAll();
    const { detail, ...otherData } = data;
    expect(query).toHaveBeenLastQueriedWith({
      method: 'select', table: 'tableName', sed_number: 5,
    });
    expect(result.toJSON()).toEqual([{ ...otherData, ...detail }]);
  });

  it('when fetchAll', async () => {
    const model = new Model();
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{
      ..._.mapKeys(data, (value, key) => _.snakeCase(key)),
      detail: data.detail,
      jsdata: JSON.stringify(data.jsdata),
    }]));
    const result = await model.fetchAll();
    const { detail, ...otherData } = data;
    expect(result.toJSON()).toEqual([{ ...otherData, ...detail }]);
  });
});
