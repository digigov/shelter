import knex from 'knex';
import bookshelf from 'bookshelf';
import paranoia from 'bookshelf-paranoia';
import pretty from '../help/bookshelf-pretty';
import config from '../../knexfile';

export const sql = knex(config);

const orm = bookshelf(sql);
orm.plugin(paranoia);
orm.plugin(pretty);
export default orm;

export const Model = orm.Model;
