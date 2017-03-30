import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { mutation } from 'graphql-tower';
import GraphQLVictimId from '../type/GraphQLVictimId';
import Action from '../model/Action';

export default mutation({
  name: 'TakeActionMutation',
  inputFields: {
    victimId: { type: new GraphQLNonNull(GraphQLVictimId) },
    action: { type: new GraphQLNonNull(GraphQLString) },
    detail: { type: GraphQLString },
  },
  outputFields: {
    isNew: { type: GraphQLBoolean },
  },
  resolve: async (payload, { input }) => {
    const { victimId, action, detail } = input;

    const model = new Action({ victimId, action });

    if (detail) model.set({ detail });

    await model.save();

    return { isNew: true };
  },
});
