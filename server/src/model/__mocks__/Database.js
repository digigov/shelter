import knex from 'knex';
import bookshelf from 'bookshelf';
import paranoia from 'bookshelf-paranoia';
import pretty from '../../help/bookshelf-pretty';

export const query = jest.fn(() => Promise.resolve([]));

const client = class extends knex.Client {
  _query = query;
  acquireConnection = () => Promise.resolve({});
  processResponse = (resp) => resp;
  releaseConnection = () => Promise.resolve();
};

export const sql = knex({ client });

const orm = bookshelf(sql);
orm.plugin(paranoia);
orm.plugin(pretty);
export default orm;

export const Model = orm.Model;
