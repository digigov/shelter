import { GraphQLString, GraphQLObjectType } from 'graphql';
import { GraphQLGlobalIdField } from 'graphql-tower';
import GraphQLNodeInterface from './GraphQLNodeInterface';
import GraphQLVictimId from './GraphQLVictimId';

export default new GraphQLObjectType({
  name: 'Citizen',
  interfaces: [GraphQLNodeInterface],
  fields: () => ({
    id: new GraphQLGlobalIdField(),
    citizenId: { type: GraphQLVictimId },
    fullname: { type: GraphQLString },
  }),
});
