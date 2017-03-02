import { GraphQLScalarType } from 'graphql';
import _ from 'lodash';
import { verify, prefix } from 'taiwanid';

const isVictimId = value => verify(value, /^[A-Z][123]\d{8}$/i);

function parseVictimId(value) {
  const victimId = _.trim(String(value));
  if (!isVictimId(victimId)) {
    throw new TypeError(`VictimId cannot represent non value: ${value}`);
  }

  return _.parseInt(`${prefix[victimId[0]]}${victimId.substr(1)}`);
}

export default new GraphQLScalarType({
  name: 'VictimId',
  serialize: (value) => {
    const victimId = String(value);
    const prefixNum = _.parseInt(victimId.substr(0, 2));
    const prefixKey = _.findKey(prefix, num => (num === prefixNum));
    return `${prefixKey}${victimId.substr(2)}`;
  },
  parseValue: value => parseVictimId(value),
  parseLiteral: ast => parseVictimId(ast.value),
});
