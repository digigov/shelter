import GraphQLEventNode from '../type/GraphQLEventNode';

export default {
  type: GraphQLEventNode,
  args: {},
  resolve: async () => ({
    id: 1,
    title: process.env.TITLE || '連線演練模式',
  }),
};
