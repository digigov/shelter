import { Kind, GraphQLScalarType } from 'graphql';

const regex = new RegExp('^[-a-z0-9~!$%^&*_=+}{\\\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$', 'i');

const isEmail = (value: mixed): boolean => regex.test(value);

function coerceEmail(value: mixed): ?string {
  const email = String(value);

  if (!isEmail(email)) {
    throw new TypeError(`Mail cannot represent non value: ${value}`);
  }

  return email;
}

export default new GraphQLScalarType({
  name: 'Email',
  serialize: coerceEmail,
  parseValue: coerceEmail,
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) return null;

    if (!isEmail(ast.value)) return null;

    return String(ast.value);
  },
});
