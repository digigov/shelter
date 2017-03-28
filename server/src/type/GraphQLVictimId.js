import { GraphQLScalarType } from 'graphql';
import _ from 'lodash';
import { verify, numberify, stringify } from 'taiwanid';

const isVictimId = value => verify(value, /^[A-Z][123A-D]\d{8}$/i);

function parseVictimId(value) {
  const victimId = _.trim(String(value));
  if (!isVictimId(victimId)) {
    throw new TypeError(`VictimId cannot represent non value: ${value}`);
  }

  return numberify(value);
}

export default new GraphQLScalarType({
  name: 'VictimId',
  serialize: value => stringify(value),
  parseValue: value => parseVictimId(value),
  parseLiteral: ast => parseVictimId(ast.value),
});
