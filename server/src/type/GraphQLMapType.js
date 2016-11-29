import { Kind, GraphQLScalarType } from 'graphql';
import _ from 'lodash';

export default class MapType extends GraphQLScalarType {
  name: string;
  description: ?string;

  keys: Map<any, string | number>;
  values: { [keyName: string | number]: any };

  constructor(config) {
    super({
      ...config,
      serialize: (key) => {
        const value = this.values[key];
        if (_.isUndefined(value)) {
          throw new TypeError(
            `${config.name} cannot represent non value: ${value}`
          );
        }

        return value;
      },
      parseValue: (value) => {
        const key = this.keys.get(`${value}`);
        if (_.isUndefined(key)) {
          throw new TypeError(
            `${config.name} cannot represent non value: ${value}`
          );
        }

        return key;
      },
      parseLiteral: (ast) => {
        if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT) return null;

        const key = this.keys.get(`${ast.value}`);
        if (_.isUndefined(key)) return null;

        return key;
      },
    });

    this.keys = new Map(_.map(config.values, (value, key) => [`${value}`, key]));
    this.values = config.values;
  }
}
