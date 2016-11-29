import { GraphQLFloat, GraphQLObjectType, GraphQLInputObjectType } from 'graphql';

const fields = {
  latitude: { type: GraphQLFloat },
  longitude: { type: GraphQLFloat },
};

export default new GraphQLObjectType({
  name: 'Geolocation',
  fields,
});

export const GraphQLGeolocationInput = new GraphQLInputObjectType({
  name: 'GeolocationInput',
  fields,
});
