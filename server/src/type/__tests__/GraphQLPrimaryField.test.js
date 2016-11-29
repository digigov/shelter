import _ from 'lodash';
import { GraphQLNonNull } from 'graphql';
import GraphQLPrimary, { PrimaryKey } from '../GraphQLPrimary';
import GraphQLPrimaryField from '../GraphQLPrimaryField';

describe('GraphQLPrimary Type', () => {
  it('constructor', async () => {
    const field = new GraphQLPrimaryField('node');
    expect(field).toEqual({
      type: new GraphQLNonNull(GraphQLPrimary),
      description: 'The ID of an object',
      typeName: 'node',
      resolve: field.resolve,
    });
  });

  it('resolve', async () => {
    const field = new GraphQLPrimaryField('node');
    const info = { fieldName: 'primary' };
    const key = _.random(100, 999);
    expect(field.resolve({ primary: key }, {}, {}, info))
      .toEqual({ key, type: 'node' });
  });

  it('resolve when value is PrimaryKey', async () => {
    const field = new GraphQLPrimaryField('node');
    const key = _.random(100, 999);
    const primaryKey = new PrimaryKey(key, 'item');
    expect(field.resolve({ id: primaryKey }))
      .toEqual({ key, type: 'item' });
  });

  it('resolve when typeName is null', async () => {
    const field = new GraphQLPrimaryField();
    const info = { parentType: { name: 'item' } };
    const key = _.random(100, 999);
    expect(field.resolve({ id: key }, {}, {}, info))
      .toEqual({ key, type: 'item' });
  });
});
