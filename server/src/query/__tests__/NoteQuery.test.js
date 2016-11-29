import _ from 'lodash';
import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import NotFoundError from '../../error/NotFoundError';
import Schema from '../../Schema';
import { query } from '../../model/Database';

const QL = 'query ($id: Primary!) { node (id: $id) { id ...node } }';

describe('Note Query', () => {
  it('query victim', async () => {
    const id = _.random(100, 999);
    const cardNumber = `${_.random(100, 999)}`;
    const ql = `${QL} fragment node on VictimNode { cardNumber }`;
    const user = { user: {} };
    const variable = { id: toGlobalId('victim', id) };

    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{ id, cardNumber }]));
    const result = await graphql(Schema, ql, {}, user, variable);
    expect(result.errors).toBeUndefined();
    expect(result.data.node).toEqual({ id: toGlobalId('victim', id), cardNumber });
    expect(query).toHaveBeenLastQueriedWith(
      { table: 'victim', method: 'select', id, limit: 1 },
    );
  });

  it('query when not found', async () => {
    const id = _.random(100, 999);
    const ql = 'query ($id: Primary!) { node (id: $id) { id } }';
    const variable = { id: toGlobalId('not', id) };

    query.mockClear();
    const result = await graphql(Schema, ql, undefined, {}, variable);
    expect(result).toEqualError(new NotFoundError());
  });
});
