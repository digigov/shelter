import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-tower';
import NotFoundError from '../error/NotFoundError';
import GraphQLNodeInterface from '../type/GraphQLNodeInterface';
import Victim from '../model/Victim';
import GraphQLVictimNode from '../type/GraphQLVictimNode';

const model = {
  Victim,
};

const type = {
  Victim: GraphQLVictimNode,
};

export default {
  type: GraphQLNodeInterface,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (payload = {}, args) => {
    const id = fromGlobalId(args.id);

    if (!type[id.getType()]) throw new NotFoundError();

    const result = await model[id.getType()].fetch(`${id}`);

    return {
      ...result.toJSON(),
      type: type[id.getType()],
    };
  },
};
