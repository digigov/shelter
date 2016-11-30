import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import NodeQuery from './query/NodeQuery';
import { VictimConnection } from './query/VictimQuery';
import { LoggerConnection } from './query/LoggerQuery';

import ReplaceVictimMutation from './mutation/ReplaceVictimMutation';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: NodeQuery,
    victim: VictimConnection,
    logger: LoggerConnection,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    replaceVictim: ReplaceVictimMutation,
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
