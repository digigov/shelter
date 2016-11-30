import { GraphQLString, GraphQLObjectType } from 'graphql';
import GraphQLPrimaryField from './GraphQLPrimaryField';
import GraphQLNodeInterface from './GraphQLNodeInterface';
import { LoggerConnection } from '../query/LoggerQuery';

export default new GraphQLObjectType({
  name: 'VictimNode',
  interfaces: [GraphQLNodeInterface],
  fields: () => ({
    id: new GraphQLPrimaryField('victim'),
    cardNumber: { type: GraphQLString },
    logger: LoggerConnection,
  }),
});
