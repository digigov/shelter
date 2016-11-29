import { GraphQLInterfaceType, GraphQLNonNull } from 'graphql';
import GraphQLPrimary from './GraphQLPrimary';

export default new GraphQLInterfaceType({
  name: 'Node',
  description: 'An object with an ID',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLPrimary),
      description: 'The id of the object.',
    },
  }),
  resolveType: (obj) => obj.type,
});
