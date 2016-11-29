import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Victim from '../model/Victim';

export default mutationWithClientMutationId({
  name: 'ReplaceVictim',
  inputFields: {
    cardNumber: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
  },
  mutateAndGetPayload: async ({ cardNumber }) => {
    const model = await new Victim({ cardNumber });
    const victim = await model.fetch() || await model.save();
    return victim;
  },
});
