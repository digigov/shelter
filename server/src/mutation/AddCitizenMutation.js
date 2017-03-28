import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { mutation } from 'graphql-tower';
import GraphQLVictimId from '../type/GraphQLVictimId';
import Citizen from '../model/Citizen';

export default mutation({
  name: 'AddCitizenMutation',
  inputFields: {
    citizenId: { type: new GraphQLNonNull(GraphQLVictimId) },
    fullname: { type: GraphQLString },
  },
  outputFields: {
    isNew: { type: GraphQLBoolean },
  },
  resolve: async (payload, { input }) => {
    const { citizenId, fullname } = input;

    const model = await new Citizen({ id: citizenId });

    const victim = await model.fetch() || await model.save({}, { method: 'insert' });

    if (fullname) victim.set({ fullname });

    await model.save();

    return { isNew: true };
  },
});
