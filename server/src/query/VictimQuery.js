import { GraphQLList } from 'graphql';
import GraphQLVictimNode from '../type/GraphQLVictimNode';
import Victim from '../model/Victim';

export default {
  type: new GraphQLList(GraphQLVictimNode),
  args: {},
  resolve: async () => {
    const model = new Victim();
    const client = await model.fetchAll();
    return client.toJSON().map(item => ({ victimId: item.id, ...item }));
  },
};
