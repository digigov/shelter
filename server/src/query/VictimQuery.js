import _ from 'lodash';
import { GraphQLList } from 'graphql';
import { queryWithConnection, withUserAuth } from '../help/graphql-pack';
import GraphQLVictimNode from '../type/GraphQLVictimNode';
import Victim from '../model/Victim';

export default {
  type: GraphQLVictimNode,
  resolve: async (payload, args, context) => {
    const reply = await Victim.fetch(payload.victimId, _.get(context, 'user'));
    return reply && reply.toJSON();
  },
};

export const VictimConnection = queryWithConnection(withUserAuth({
  type: new GraphQLList(GraphQLVictimNode),
  args: {},
  resolve: async () => {
    const model = new Victim();
    const client = await model.fetchAll();
    return client.toJSON();
  },
}));
