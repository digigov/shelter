import { GraphQLString, GraphQLObjectType } from 'graphql';
import { GraphQLGlobalIdField } from 'graphql-tower';
import GraphQLNodeInterface from './GraphQLNodeInterface';
import GraphQLVictimId from './GraphQLVictimId';
import GraphQLPhoneNumber from './GraphQLPhoneNumber';

export default new GraphQLObjectType({
  name: 'Victim',
  interfaces: [GraphQLNodeInterface],
  fields: () => ({
    id: new GraphQLGlobalIdField(),
    victimId: { type: GraphQLVictimId },
    fullname: { type: GraphQLString },
    phoneNumber: { type: GraphQLPhoneNumber },
  }),
});
