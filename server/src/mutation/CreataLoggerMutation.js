import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import GraphQLLoggerNode from '../type/GraphQLLoggerNode';
import Logger from '../model/Logger';

export default mutationWithClientMutationId({
  name: 'CreateLogger',
  inputFields: {
    action: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    logger: { type: GraphQLLoggerNode },
  },
  mutateAndGetPayload: async ({ action }) => {
    const model = await new Logger({ action });
    await model.save();

    return { studio: model.toJSON() };
  },
});
