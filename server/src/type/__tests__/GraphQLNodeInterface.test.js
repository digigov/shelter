import GraphQLNodeInterface from '../GraphQLNodeInterface';
import GraphQLVictimNode from '../GraphQLVictimNode';

describe('GraphQLNodeInterface Type', () => {
  it('resolveType', async () => {
    expect(
      GraphQLNodeInterface.resolveType({ type: GraphQLVictimNode })
    ).toBe(GraphQLVictimNode);
  });
});
