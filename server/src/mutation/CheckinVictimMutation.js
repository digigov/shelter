import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { mutation } from 'graphql-tower';
import GraphQLVictimId from '../type/GraphQLVictimId';
import GraphQLPhoneNumber from '../type/GraphQLPhoneNumber';
import Victim from '../model/Victim';

export default mutation({
  name: 'CheckinVictimMutation',
  inputFields: {
    victimId: { type: new GraphQLNonNull(GraphQLVictimId) },
    fullname: { type: GraphQLString },
    phoneNumber: { type: GraphQLPhoneNumber },
  },
  outputFields: {
    isNew: { type: GraphQLBoolean },
  },
  resolve: async (payload, { input }) => {
    const { victimId, fullname, phoneNumber } = input;

    const model = await new Victim({ id: victimId });

    const victim = await model.fetch() || await model.save({}, { method: 'insert' });

    if (fullname) victim.set({ fullname });
    if (phoneNumber) victim.set({ phoneNumber });

    await model.save();

    return { isNew: true };
  },
});
