import _ from 'lodash';
import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import Schema from '../../Schema';
import { query } from '../../model/Database';

const logger = { id: _.random(1, 99) };
const user = { id: _.random(1, 99) };

const QL = 'query { logger { edges { node { id } } } }';

describe('Victim Query', () => {
  it('fetch all', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([logger]));
    const result = await graphql(Schema, QL, {}, { user });
    expect(result.errors).toBeUndefined();
    expect(query).toHaveBeenQueriedWith([{ table: 'logger', method: 'select' }]);
    expect(result.data.logger.edges).toEqual([
      { node: { id: toGlobalId('logger', logger.id) } },
    ]);
  });
});
