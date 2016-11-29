import { Kind, GraphQLScalarType } from 'graphql';
import { fromGlobalId, toGlobalId } from 'graphql-relay';
import _ from 'lodash';

const MAX_INT = 99999999999999;
const MIN_INT = 1;

export class PrimaryKey {
  key: number;
  type: string;

  constructor(key, type = '') {
    const num = _.parseInt(key);

    if (_.isNaN(num) || num > MAX_INT || num < MIN_INT) {
      throw new TypeError(
        `Primary cannot represent non 32-bit signed integer value: ${key}`
      );
    }

    this.key = num;
    this.type = type;
  }

  getKey() {
    return this.key;
  }

  getType() {
    return this.type;
  }

  toString() {
    return toGlobalId(this.type, this.key);
  }
}

export default new GraphQLScalarType({
  name: 'Primary',
  serialize: String,
  parseValue: (value) => {
    const data = fromGlobalId(`${value}`);

    const num = _.parseInt(data.id);

    if (_.isNaN(num) || num > MAX_INT || num < MIN_INT) {
      throw new TypeError(
        `Primary cannot represent non 32-bit signed integer value: ${value}`
      );
    }

    return new PrimaryKey(num, data.type);
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) return null;

    const data = fromGlobalId(ast.value);

    const num = _.parseInt(data.id);

    if (_.isNaN(num) || num > MAX_INT || num < MIN_INT) return null;

    return new PrimaryKey(num, data.type);
  },
});
