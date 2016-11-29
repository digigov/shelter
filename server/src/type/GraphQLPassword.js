import { Kind, GraphQLScalarType } from 'graphql';

export default new GraphQLScalarType({
  name: 'Password',
  serialize: (value) => !!value,
  parseValue: (value) => {
    const password = String(value);

    if (password.length < 6) {
      throw new TypeError(`Mobile cannot represent non value: ${value}`);
    }

    return password;
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) return null;

    if (ast.value.length < 6) return null;

    return ast.value;
  },
});
