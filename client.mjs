// @ts-check

import fetch from 'node-fetch';

/**
 * @param {string} method
 * @param {string} parameter
 * @param {boolean} value
 */
const assert = (method, parameter, value) => {
  if (typeof method !== 'string') {
    throw new TypeError('TypeError: "method" must be a string.');
  }
  if (typeof parameter !== 'string') {
    throw new TypeError('TypeError: "parameter" must be a string.');
  }
  if (typeof value !== 'boolean') {
    throw new TypeError('TypeError: "value" must be a boolean.');
  }
  if (value !== true) {
    throw new Error(`AssertionError: @ method "${method}", parameter "${parameter}".`);
  }
};

/**
 * @param {string} query
 * @param {number} page
 */
const search = async (query, page) => {
  assert('search', 'query', typeof query === 'string');
  assert('search', 'page', typeof page === 'number');
};

search('', 2);