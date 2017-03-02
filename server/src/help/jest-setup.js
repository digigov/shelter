/* eslint new-cap: ["error", { "capIsNewExceptions": ["RECEIVED_COLOR", "EXPECTED_COLOR"] }] */
import _ from 'lodash';
import { toHaveBeenQueriedWith, toHaveBeenLastQueriedWith } from 'jest-expect-queried';
import {
  getType,
  matcherHint,
  printExpected,
  printReceived,
} from 'jest-matcher-utils';

function toEqualError(actual, expected = Error) {
  const error = _.get(actual, 'errors[0].originalError') || _.get(actual, 'errors[0]') || actual;

  let pass = null;

  if (!(error instanceof Error)) {
    pass = false;
  } else if (_.isString(expected)) {
    pass = error.message === expected;
  } else if (_.isRegExp(expected)) {
    pass = expected.test(error.message);
  } else if (_.isFunction(expected)) {
    pass = error instanceof expected;
  } else {
    pass = (error.name === expected.name && error.message === expected.message);
  }

  const message = pass
    ? () => `${matcherHint('.not.toEqualError', 'error', getType(expected))}\n\n` +
      `Expected the function not to throw an error matching:\n` +
      `  ${printExpected(expected)}\n` +
      `Instead, it error:\n` +
      `  ${printReceived(error)}\n`
    : () => `${matcherHint('.toEqualError', 'error', getType(expected))}\n\n` +
      `Expected the function to throw an error matching:\n` +
      `  ${printExpected(expected)}\n` +
      `Instead, it error:\n` +
      `  ${printReceived(error)}\n`;

  return { pass, message };
}

beforeEach(() => {
  jest.addMatchers({
    toEqualError: () => ({ compare: toEqualError }),
    toHaveBeenQueriedWith,
    toHaveBeenLastQueriedWith,
  });
});
