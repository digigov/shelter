import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import NodeQuery from './query/NodeQuery';
import VictimQuery from './query/VictimQuery';
import EventNode from './query/EventNode';
import CheckinVictimMutation from './mutation/CheckinVictimMutation';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: NodeQuery,
    victim: VictimQuery,
    event: EventNode,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    checkinVictim: CheckinVictimMutation,
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
