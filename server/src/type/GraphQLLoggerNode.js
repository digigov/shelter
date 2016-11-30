import { GraphQLString, GraphQLObjectType } from 'graphql';
import GraphQLPrimaryField from './GraphQLPrimaryField';
import GraphQLNodeInterface from './GraphQLNodeInterface';

export default new GraphQLObjectType({
  name: 'LoggerNode',
  interfaces: [GraphQLNodeInterface],
  fields: () => ({
    id: new GraphQLPrimaryField('logger'),
    action: { type: GraphQLString },
  }),
});
