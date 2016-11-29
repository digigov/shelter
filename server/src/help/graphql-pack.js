import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from 'graphql-relay';
import _ from 'lodash';
import UnauthorizedError from '../error/UnauthorizedError';
import ForbiddenError from '../error/ForbiddenError';

export function queryWithConnection(config) {
  const type = _.get(config, 'type.ofType', config.type);

  const { connectionType } = connectionDefinitions({
    name: type.name,
    nodeType: type,
  });

  return {
    ...config,
    type: connectionType,
    args: { ...config.args, ...connectionArgs },
    resolve: async function resolve(payload, args, context) {
      const result = await config.resolve(payload, args, context);
      return connectionFromArray(result, args);
    },
  };
}

export function withUserAuth(config) {
  return {
    ...config,
    resolve: async (payload, args, context) => {
      const id = _.get(context, 'user.id', 0);
      if (!_.isInteger(id) || id < 1) throw new UnauthorizedError();

      return await config.resolve(payload, args, context);
    },
  };
}

export function withAdminAuth(config) {
  return withUserAuth({
    ...config,
    resolve: async (payload, args, context) => {
      const isAdmin = _.get(context, 'user.isAdmin', false);
      if (!isAdmin) throw new ForbiddenError();

      return await config.resolve(payload, args, context);
    },
  });
}
