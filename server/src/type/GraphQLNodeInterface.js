import { GraphQLInterfaceType } from 'graphql';
import { GraphQLGlobalIdField } from 'graphql-tower';

export default new GraphQLInterfaceType({
  name: 'Node',
  description: 'An object with an ID',
  fields: () => ({
    id: new GraphQLGlobalIdField(),
  }),
  resolveType: obj => obj.type,
});
