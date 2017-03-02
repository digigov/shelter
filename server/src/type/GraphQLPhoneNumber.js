import { GraphQLScalarType } from 'graphql';
import _ from 'lodash';

const regex = /^\+[0-9]+-[1-9][0-9]{3,}$/i;

const isPhoneNumber = value => regex.test(value);

function parsePhoneNumber(value) {
  const phoneNumber = _.trim(String(value));
  if (!isPhoneNumber(phoneNumber)) {
    throw new TypeError(`PhoneNumber cannot represent non value: ${value}`);
  }

  return phoneNumber;
}

export default new GraphQLScalarType({
  name: 'PhoneNumber',
  serialize: String,
  parseValue: value => parsePhoneNumber(value),
  parseLiteral: ast => parsePhoneNumber(ast.value),
});
