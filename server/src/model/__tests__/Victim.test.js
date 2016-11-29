import _ from 'lodash';
import Victim from '../Victim';
import { query } from '../../model/Database';
import NotFoundError from '../../error/NotFoundError';

const id = _.random(100, 999);
const cardNumber = `${_.random(100, 999)}`;

describe('Victim model', () => {
  it('fetch method', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{ id, cardNumber }]));
    const reply = await Victim.fetch(id);
    expect(reply.id).toBe(id);
    expect(query).toHaveBeenQueriedWith([
      { method: 'select', table: 'victim', id, limit: 1 },
    ]);
  });

  it('fetch method when not found', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([]));

    let error: Error;
    try {
      await Victim.fetch(id);
    } catch (e) { error = e; }
    expect(error).toEqualError(new NotFoundError('找不到災民資料'));
  });
});
