import _ from 'lodash';
import { GraphQLNonNull } from 'graphql';
import GraphQLPrimary, { PrimaryKey } from './GraphQLPrimary';

export default class GraphQLPrimaryField {

  type = new GraphQLNonNull(GraphQLPrimary);

  description = 'The ID of an object';

  typeName: string;

  constructor(typeName) {
    this.typeName = typeName;
  }

  resolve = (payload, args, context, info) => {
    const value = payload[_.get(info, 'fieldName', 'id')];

    if (value instanceof PrimaryKey) return value;

    return new PrimaryKey(
      value, this.typeName || _.get(info, 'parentType.name', '')
    );
  }
}
