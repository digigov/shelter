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

    const citizen = new Citizen({ id: citizenId });

    if (!await citizen.fetch()) await citizen.save({}, { method: 'insert' });

    if (fullname) citizen.set({ fullname });

    await citizen.save();

    return { isNew: true };
  },
});
