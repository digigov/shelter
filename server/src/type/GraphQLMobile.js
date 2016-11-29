import { Kind, GraphQLScalarType } from 'graphql';
import _ from 'lodash';

const regex = /^9[0-9]{8}$/i;

const isMobile = (value: mixed): boolean => regex.test(value);
const parseMobile = (value: mixed): string => _.trimStart(_.trim(String(value)), '0');

function coerceMobile(value: mixed): ?string {
  const mobile = parseMobile(value);

  if (!isMobile(mobile)) {
    throw new TypeError(`Mobile cannot represent non value: ${value}`);
  }

  return mobile;
}

export default new GraphQLScalarType({
  name: 'Mobile',
  serialize: (value: mixed): ?string => {
    const mobile = coerceMobile(value);
    return `0${mobile}`;
  },
  parseValue: coerceMobile,
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.INT && ast.kind !== Kind.STRING) return null;

    const mobile = parseMobile(ast.value);

    if (!isMobile(mobile)) return null;

    return mobile;
  },
});
