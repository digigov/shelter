import { GraphQLList } from 'graphql';
import GraphQLCitizenNode from '../type/GraphQLCitizenNode';
import Citizen from '../model/Citizen';

export default {
  type: new GraphQLList(GraphQLCitizenNode),
  args: {},
  resolve: async () => {
    const data = await Citizen.fetchAll();
    return data.toJSON().map(item => ({ citizenId: item.id, ...item }));
  },
};
