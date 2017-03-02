import { GraphQLScalarType } from 'graphql';

const parseDate = (value) => {
  const date = new Date(value);

  if (!date.toJSON()) {
    throw new TypeError(`Date cannot represent non value: ${value}`);
  }

  return date;
};

export default new GraphQLScalarType({
  name: 'Date',
  serialize: value => (value ? new Date(value).toJSON() : null),
  parseValue: value => parseDate(value),
  parseLiteral: ast => parseDate(ast.value),
});
