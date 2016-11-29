import _ from 'lodash';
import { GraphQLNonNull } from 'graphql';
import NotFoundError from '../error/NotFoundError';
import GraphQLPrimary from '../type/GraphQLPrimary';
import GraphQLNodeInterface from '../type/GraphQLNodeInterface';
import VictimQuery from './VictimQuery';

const query = {
  victim: VictimQuery,
};

export default {
  type: GraphQLNodeInterface,
  args: {
    id: { type: new GraphQLNonNull(GraphQLPrimary) },
  },
  resolve: async (payload = {}, args, context) => {
    const { key, type } = args.id;

    if (!query[type]) throw new NotFoundError();

    _.set(payload, `${type}Id`, key);

    const result = await query[type].resolve(payload, args, context);

    return {
      ...result,
      type: query[type].type,
    };
  },
};
