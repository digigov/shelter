import GraphQLPrimary from '../GraphQLPrimary';
import GraphQLNodeInterface from '../GraphQLNodeInterface';

describe('GraphQLNodeInterface Type', () => {
  it('resolveType', async () => {
    expect(
      GraphQLNodeInterface.resolveType({ type: GraphQLPrimary })
    ).toBe(GraphQLPrimary);
  });
});
