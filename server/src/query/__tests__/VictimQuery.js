import _ from 'lodash';
import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';
import Schema from '../../Schema';
import { query } from '../../model/Database';

const victim = { id: _.random(1, 99) };
const logger = { id: _.random(1, 99) };
const user = { id: _.random(1, 99) };

const QL = `
  query {
    victim { edges { node {
      id
      logger { edges { node { id } } }
    } } }
  }
`;

describe('Victim Query', () => {
  it('fetch all', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([victim]));
    query.mockReturnValueOnce(Promise.resolve([logger]));
    const result = await graphql(Schema, QL, {}, { user });
    expect(result.errors).toBeUndefined();
    expect(query).toHaveBeenQueriedWith([
      { table: 'victim', method: 'select' },
      { table: 'logger', method: 'select', victimId: victim.id },
    ]);
    expect(result.data.victim.edges).toEqual([
      { node: {
        id: toGlobalId('victim', victim.id),
        logger: { edges: [
          { node: { id: toGlobalId('logger', logger.id) } },
        ] },
      } },
    ]);
  });
});
