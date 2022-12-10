// @ts-check

import fetch from 'cross-fetch';

/**
 * @param {string} context
 * @param {string} subject
 * @param {boolean} value
 * @param {string} [hint]
 */
const assert = (context, subject, value, hint) => {
  if (typeof context !== 'string') {
    throw new TypeError('TypeError: "context" must be a string.');
  }
  if (typeof subject !== 'string') {
    throw new TypeError('TypeError: "subject" must be a string.');
  }
  if (typeof value !== 'boolean') {
    throw new TypeError('TypeError: "value" must be a boolean.');
  }
  if (value !== true) {
    throw new Error(`AssertionError: @ ${context} -> ${subject}; ${hint || '(no hint provided)'}.`);
  }
};

/**
 * @description Sends an HTTP request to a typesense server.
 * @param {string} base_url - e.g. https://data.crestfall.sh/typesense/psgc-barangays
 * @param {string} query - e.g. "Manila"
 * @param {number} page - e.g. 1
 * @returns {Promise<import('./client').response>}
 */
export const search = async (base_url, query, page) => {
  assert('search', 'base_url', typeof base_url === 'string');
  assert('search', 'query', typeof query === 'string');
  assert('search', 'page', typeof page === 'number');
  const url = new URL(base_url);
  url.searchParams.set('q', query);
  url.searchParams.set('page', String(page));
  const response = await fetch(url.toString());
  assert('search', 'response.status', response.status === 200);
  assert('search', 'response.headers.content-type', response.headers.get('Content-Type').includes('application/json') === true);
  const response_body = await response.json();
  return response_body;
};
