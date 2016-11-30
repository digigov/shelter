import _ from 'lodash';
import { GraphQLList } from 'graphql';
import { queryWithConnection, withUserAuth } from '../help/graphql-pack';
import GraphQLLoggerNode from '../type/GraphQLLoggerNode';
import Logger from '../model/Logger';

export default {
  type: GraphQLLoggerNode,
  resolve: async (payload, args, context) => {
    const reply = await Logger.fetch(payload.loggerId, _.get(context, 'user'));
    return reply && reply.toJSON();
  },
};

export const LoggerConnection = queryWithConnection(withUserAuth({
  type: new GraphQLList(GraphQLLoggerNode),
  args: {},
  resolve: async () => {
    const model = new Logger();
    const logger = await model.fetchAll();
    return logger.toJSON();
  },
}));
