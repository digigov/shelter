import { GraphQLList, GraphQLID } from 'graphql';
import _ from 'lodash';
import {
  queryWithConnection,
  withUserAuth,
  withAdminAuth,
} from '../graphql-pack';
import UnauthorizedError from '../../error/UnauthorizedError';
import ForbiddenError from '../../error/ForbiddenError';

describe('graphql-pack help', () => {
  it('queryWithConnection', async () => {
    const resolve = jest.fn();
    const config = queryWithConnection({
      type: new GraphQLList(GraphQLID),
      resolve,
    });

    expect(config.type.name).toBe('IDConnection');
    resolve.mockReturnValueOnce(Promise.resolve(['node1', 'node2']));
    const result = await config.resolve({}, {});
    expect(result.edges[0].node).toBe('node1');
    expect(result.edges[1].node).toBe('node2');
    expect(resolve).toHaveBeenCalledTimes(1);
  });

  it('withUserAuth', async () => {
    const resolve = jest.fn();
    const config = withUserAuth({ resolve });

    let error: String;

    try { await config.resolve({}, { input: {} }); } catch (e) { error = e; }
    expect(error).toEqualError(UnauthorizedError);
    expect(resolve).toHaveBeenCalledTimes(0);

    resolve.mockReturnValueOnce(Promise.resolve({}));
    await config.resolve({}, { input: {} }, { user: { id: _.random(1, 99) } });
    expect(resolve).toHaveBeenCalledTimes(1);
  });

  it('withAdminAuth', async () => {
    const resolve = jest.fn();
    const config = withAdminAuth({ resolve });

    let error: String;

    try { await config.resolve({}, { input: {} }); } catch (e) { error = e; }
    expect(error).toEqualError(UnauthorizedError);
    expect(resolve).toHaveBeenCalledTimes(0);

    try {
      await config.resolve({}, { input: {} }, { user: { id: _.random(1, 99) } });
    } catch (e) { error = e; }
    expect(error).toEqualError(ForbiddenError);
    expect(resolve).toHaveBeenCalledTimes(0);

    resolve.mockReturnValueOnce(Promise.resolve({}));
    await config.resolve({}, { input: {} }, { user: { id: _.random(1, 99), isAdmin: true } });
    expect(resolve).toHaveBeenCalledTimes(1);
  });
});
