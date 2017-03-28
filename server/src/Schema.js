import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import NodeQuery from './query/NodeQuery';
import VictimQuery from './query/VictimQuery';
import CitizenQuery from './query/CitizenQuery';
import EventNode from './query/EventNode';
import CheckinVictimMutation from './mutation/CheckinVictimMutation';
import AddCitizenMutation from './mutation/AddCitizenMutation';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: NodeQuery,
    victim: VictimQuery,
    citizen: CitizenQuery,
    event: EventNode,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    checkinVictim: CheckinVictimMutation,
    addCitizen: AddCitizenMutation,
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
