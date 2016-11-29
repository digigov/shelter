/* eslint new-cap: ["error", { "newIsCapExceptions": ["default"] }] */

const Redis = jest.genMockFromModule('../Redis');

export const redis = new Redis.default();

export default jest.fn(() => redis);
