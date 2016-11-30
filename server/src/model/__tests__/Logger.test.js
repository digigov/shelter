import _ from 'lodash';
import faker from 'faker';
import Logger from '../Logger';
import { query } from '../../model/Database';
import NotFoundError from '../../error/NotFoundError';

const id = _.random(100, 999);
const action = faker.random.word();

describe('Action model', () => {
  it('fetch method', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{ id, action }]));
    const reply = await Logger.fetch(id);
    expect(reply.id).toBe(id);
    expect(query).toHaveBeenQueriedWith([
      { method: 'select', table: 'logger', id, limit: 1 },
    ]);
  });

  it('fetch method when not found', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([]));

    let error: Error;
    try {
      await Logger.fetch(id);
    } catch (e) { error = e; }
    expect(error).toEqualError(new NotFoundError('找不到記錄資料'));
  });
});
