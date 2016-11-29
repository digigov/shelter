import { Kind, GraphQLScalarType } from 'graphql';
import _ from 'lodash';

const parseDate = (value: mixed): ?Date => {
  const date = new Date(value);

  if (!date.toJSON()) {
    throw new TypeError(`Date cannot represent non value: ${value}`);
  }

  return date;
};

export default new GraphQLScalarType({
  name: 'LimitBoolean',
  serialize: (value) => (
    _.isBoolean(value) ? value : (parseDate(value).getTime() > Date.now())
  ),
  parseValue: (value) => parseDate(value),
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.INT && ast.kind !== Kind.STRING) return null;

    const date = new Date(ast.value);

    return date.toJSON() ? date : null;
  },
});
