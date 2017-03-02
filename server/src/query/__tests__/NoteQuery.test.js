import { graphql } from 'graphql';
import { query } from 'knex';
import faker from 'faker';
import { generate, prefix } from 'taiwanid';
import { toGlobalId } from 'graphql-tower';
import NotFoundError from '../../error/NotFoundError';
import Schema from '../../Schema';

const QL = 'query ($id: ID!) { node (id: $id) { id ...node } }';

describe('Note Query', () => {
  it('query victim', async () => {
    const victimId = generate();
    const fullname = faker.random.word();
    const id = `${prefix[victimId[0]]}${victimId.substr(1)}`;

    const ql = `${QL} fragment node on Victim { fullname }`;
    const variable = { id: toGlobalId('Victim', id) };

    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{ id, fullname }]));
    const result1 = await graphql(Schema, ql, {}, {}, variable);
    expect(result1.errors).toBeUndefined();
    expect(result1.data.node).toEqual({ id: toGlobalId('Victim', id), fullname });
    expect(query).toHaveBeenLastQueriedWith(
      { table: 'victim', method: 'select', id, limit: 1 },
    );

    const result2 = await graphql(Schema, ql, {}, {}, variable);
    expect(result2).toEqualError(new NotFoundError('找不到災民資料'));
  });

  it('query when not found', async () => {
    const Type = faker.random.word();
    const ql = `${QL} fragment node on Victim { fullname }`;

    query.mockClear();
    const result = await graphql(Schema, ql, {}, {}, { id: toGlobalId(Type, 1) });
    expect(result).toEqualError(new NotFoundError());
  });
});
