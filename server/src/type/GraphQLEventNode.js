import { GraphQLString, GraphQLObjectType } from 'graphql';
import { GraphQLGlobalIdField } from 'graphql-tower';
import GraphQLNodeInterface from './GraphQLNodeInterface';

export default new GraphQLObjectType({
  name: 'Event',
  interfaces: [GraphQLNodeInterface],
  fields: () => ({
    id: new GraphQLGlobalIdField(),
    title: { type: GraphQLString },
  }),
});
