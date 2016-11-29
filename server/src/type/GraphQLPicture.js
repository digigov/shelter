import { Kind, GraphQLScalarType } from 'graphql';

const regex = new RegExp('^(/[a-zA-Z0-9-_]+)+\\.(jpg|png)$', 'i');

const isPicture = (value: mixed): boolean => regex.test(value);

function coercePicture(value: mixed): ?string {
  const url = String(value);

  if (!isPicture(url)) {
    throw new TypeError(`Mobile cannot represent non value: ${value}`);
  }

  return url;
}

export default new GraphQLScalarType({
  name: 'Picture',
  serialize: coercePicture,
  parseValue: coercePicture,
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) return null;

    const url = String(ast.value);

    if (!isPicture(url)) return null;

    return url;
  },
});
