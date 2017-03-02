import { graphql } from 'graphql';
import { query } from 'knex';
import faker from 'faker';
import { generate, prefix } from 'taiwanid';
import { toGlobalId } from 'graphql-tower';
import Schema from '../../Schema';

const victims = [generate(), generate(), generate()].map(victimId => ({
  id: `${prefix[victimId[0]]}${victimId.substr(1)}`,
  victimId,
  fullname: faker.random.word(),
}));

const QL = `
  query {
    victim {
      id
      victimId
      fullname
    }
  }
`;

describe('Victim Query', () => {
  it('fetch all', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve(victims.map(({
      id, fullname,
    }) => ({
      id, fullname,
    }))));
    const result = await graphql(Schema, QL);
    expect(result.errors).toBeUndefined();
    expect(query).toHaveBeenQueriedWith([{
      table: 'victim',
      method: 'select',
    }]);
    expect(result.data.victim).toEqual(victims.map(({
      id, victimId, fullname,
    }) => ({
      id: toGlobalId('Victim', id), victimId, fullname,
    })));
  });
});
