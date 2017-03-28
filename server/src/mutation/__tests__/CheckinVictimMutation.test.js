import faker from 'faker';
import { graphql } from 'graphql';
import { generate, numberify } from 'taiwanid';
import { query } from 'knex';
import Schema from '../../Schema';

const victimId = generate();
const fullname = faker.random.word();
const id = numberify(victimId);

const QL = `
  mutation($input: CheckinVictimMutationInput!) {
    checkinVictim(input: $input) {
      isNew
    }
  }
`;

describe('checkin victim mutation', () => {
  it('insert victim', async () => {
    query.mockClear();
    const result = await graphql(Schema, QL, {}, {}, { input: {
      victimId,
      fullname,
    } });
    expect(result.errors).toBeUndefined();
    expect(query).toHaveBeenQueriedWith([
      { table: 'victim', method: 'select', id, limit: 1 },
      { table: 'victim', method: 'insert', id, created_at: Date, updated_at: Date },
      { table: 'victim', method: 'update', id, fullname, created_at: Date, updated_at: Date },
    ]);
  });

  it('update victim', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{ id, fullname }]));
    const result = await graphql(Schema, QL, {}, {}, { input: {
      victimId,
      fullname,
    } });
    expect(result.errors).toBeUndefined();
    expect(query).toHaveBeenQueriedWith([
      { table: 'victim', method: 'select', id, limit: 1 },
      { table: 'victim', method: 'update', id, fullname, updated_at: Date },
    ]);
  });
});
