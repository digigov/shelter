import { GraphQLString, GraphQLObjectType } from 'graphql';
import GraphQLPrimaryField from './GraphQLPrimaryField';
import GraphQLNodeInterface from './GraphQLNodeInterface';

export default new GraphQLObjectType({
  name: 'VictimNode',
  interfaces: [GraphQLNodeInterface],
  fields: () => ({
    id: new GraphQLPrimaryField('victim'),
    cardNumber: { type: GraphQLString },
  }),
});
