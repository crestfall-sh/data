// @ts-check

/**
 * @typedef {import('./index').collection} collection
 * @typedef {import('./index').document} document
 * @typedef {import('./index').dataset} dataset
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import fetch from 'node-fetch';
import psgc from './datasets/psgc/index.mjs';

const env_path = path.join(process.cwd(), '.env');
assert(fs.existsSync(env_path) === true);

/**
 * @type {Map<string, string>}
 */
const env = new Map();

const env_data = fs.readFileSync(env_path, { encoding: 'utf-8' });
env_data.split('\n').forEach((line) => {
  const index = line.indexOf('=');
  const key = line.substring(0, index);
  const value = line.substring(index + 1);
  env.set(key, value);
});

assert(env.has('PGRST_JWT_SECRET') === true);
assert(env.has('PGRST_JWT_SECRET_IS_BASE64') === true);
assert(env.get('PGRST_JWT_SECRET_IS_BASE64') === 'true');
assert(env.has('TYPESENSE_API_KEY') === true);
assert(env.has('TYPESENSE_SEARCH_ONLY_KEY') === true);

console.log(env);

/**
 * @type {dataset}
 */
const psgc_regions = {
  collection: {
    name: 'psgc-regions',
    fields: [
      { name: 'code', type: 'int32' },
      { name: 'name', type: 'string' },
      { name: 'name_extended', type: 'string' },
      { name: 'geographic_level', type: 'string', optional: true },
      { name: 'old_names', type: 'string', optional: true },
      { name: 'city_classification', type: 'string', optional: true },
      { name: 'income_classification', type: 'string', optional: true },
      { name: 'barangay_classification', type: 'string', optional: true },
      { name: 'population_2015', type: 'int32' },
      { name: 'population_2020', type: 'int32' },
    ],
    default_sorting_field: 'population_2020',
  },
  documents: psgc.regions.map((region) => {
    region.provinces = null;
    region.districts = null;
    return region;
  }),
};

/**
 * @type {dataset}
 */
const psgc_provinces = {
  collection: {
    name: 'psgc-provinces',
    fields: [
      { name: 'code', type: 'int32' },
      { name: 'name', type: 'string' },
      { name: 'name_extended', type: 'string' },
      { name: 'geographic_level', type: 'string', optional: true },
      { name: 'old_names', type: 'string', optional: true },
      { name: 'city_classification', type: 'string', optional: true },
      { name: 'income_classification', type: 'string', optional: true },
      { name: 'barangay_classification', type: 'string', optional: true },
      { name: 'population_2015', type: 'int32' },
      { name: 'population_2020', type: 'int32' },
    ],
    default_sorting_field: 'population_2020',
  },
  documents: psgc.provinces.map((province) => {
    province.cities = null;
    province.municipalities = null;
    return province;
  }),
};

/**
 * @type {dataset}
 */
const psgc_cities = {
  collection: {
    name: 'psgc-cities',
    fields: [
      { name: 'code', type: 'int32' },
      { name: 'name', type: 'string' },
      { name: 'name_extended', type: 'string' },
      { name: 'geographic_level', type: 'string', optional: true },
      { name: 'old_names', type: 'string', optional: true },
      { name: 'city_classification', type: 'string', optional: true },
      { name: 'income_classification', type: 'string', optional: true },
      { name: 'barangay_classification', type: 'string', optional: true },
      { name: 'population_2015', type: 'int32' },
      { name: 'population_2020', type: 'int32' },
    ],
    default_sorting_field: 'population_2020',
  },
  documents: psgc.cities.map((city) => {
    city.submunicipalities = null;
    city.barangays = null;
    return city;
  }),
};

/**
 * @type {dataset}
 */
const psgc_municipalities = {
  collection: {
    name: 'psgc-municipalities',
    fields: [
      { name: 'code', type: 'int32' },
      { name: 'name', type: 'string' },
      { name: 'name_extended', type: 'string' },
      { name: 'geographic_level', type: 'string', optional: true },
      { name: 'old_names', type: 'string', optional: true },
      { name: 'city_classification', type: 'string', optional: true },
      { name: 'income_classification', type: 'string', optional: true },
      { name: 'barangay_classification', type: 'string', optional: true },
      { name: 'population_2015', type: 'int32' },
      { name: 'population_2020', type: 'int32' },
    ],
    default_sorting_field: 'population_2020',
  },
  documents: psgc.municipalities.map((municipality) => {
    municipality.barangays = null;
    return municipality;
  }),
};

/**
 * @type {dataset}
 */
const psgc_submunicipalities = {
  collection: {
    name: 'psgc-submunicipalities',
    fields: [
      { name: 'code', type: 'int32' },
      { name: 'name', type: 'string' },
      { name: 'name_extended', type: 'string' },
      { name: 'geographic_level', type: 'string', optional: true },
      { name: 'old_names', type: 'string', optional: true },
      { name: 'city_classification', type: 'string', optional: true },
      { name: 'income_classification', type: 'string', optional: true },
      { name: 'barangay_classification', type: 'string', optional: true },
      { name: 'population_2015', type: 'int32' },
      { name: 'population_2020', type: 'int32' },
    ],
    default_sorting_field: 'population_2020',
  },
  documents: psgc.submunicipalities.map((submunicipality) => {
    submunicipality.barangays = null;
    return submunicipality;
  }),
};

/**
 * @type {dataset}
 */
const psgc_barangays = {
  collection: {
    name: 'psgc-barangays',
    fields: [
      { name: 'code', type: 'int32' },
      { name: 'name', type: 'string' },
      { name: 'name_extended', type: 'string' },
      { name: 'geographic_level', type: 'string', optional: true },
      { name: 'old_names', type: 'string', optional: true },
      { name: 'city_classification', type: 'string', optional: true },
      { name: 'income_classification', type: 'string', optional: true },
      { name: 'barangay_classification', type: 'string', optional: true },
      { name: 'population_2015', type: 'int32' },
      { name: 'population_2020', type: 'int32' },
    ],
    default_sorting_field: 'population_2020',
  },
  documents: psgc.barangays,
};

const TYPESENSE_API_KEY = env.get('TYPESENSE_API_KEY');
const TYPESENSE_SEARCH_ONLY_KEY = env.get('TYPESENSE_SEARCH_ONLY_KEY');


const get_collections = async () => {
  const response = await fetch('http://0.0.0.0:8108/collections', {
    method: 'GET',
    headers: { 'X-TYPESENSE-API-KEY': TYPESENSE_API_KEY },
  });
  assert(response.status === 200);
  assert(response.headers.get('content-type').includes('application/json') === true);
  const response_body = await response.json();
  return response_body;
};

/**
 * @param {string} collection_name
 */
const delete_collection = async (collection_name) => {
  assert(typeof collection_name === 'string');
  const response = await fetch(`http://0.0.0.0:8108/collections/${collection_name}`, {
    method: 'DELETE',
    headers: { 'X-TYPESENSE-API-KEY': TYPESENSE_API_KEY },
  });
  assert(response.status === 200);
  assert(response.headers.get('content-type').includes('application/json') === true);
  const response_body = await response.json();
  return response_body;
};

/**
 * @param {collection} collection
 */
const post_collection = async (collection) => {
  assert(collection instanceof Object);
  const response = await fetch('http://0.0.0.0:8108/collections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-TYPESENSE-API-KEY': TYPESENSE_API_KEY,
    },
    body: JSON.stringify(collection),
  });
  assert(response.status === 201);
  assert(response.headers.get('content-type').includes('application/json') === true);
  const response_body = await response.json();
  return response_body;
};

/**
 * @param {string} collection_name
 * @param {document[]} documents
 */
const post_documents = async (collection_name, documents) => {
  assert(typeof collection_name === 'string');
  assert(documents instanceof Array);
  documents.forEach((document) => {
    assert(document instanceof Object);
  });
  const response = await fetch(`http://0.0.0.0:8108/collections/${collection_name}/documents/import?action=create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'X-TYPESENSE-API-KEY': TYPESENSE_API_KEY,
    },
    body: documents.map((document) => JSON.stringify(document)).join('\n'),
  });
  assert(response.status === 200);
  assert(response.headers.get('content-type').includes('text/plain') === true);
  const response_body = await response.text();
  return response_body;
};

const get_keys = async () => {
  const response = await fetch('http://0.0.0.0:8108/keys', {
    method: 'GET',
    headers: { 'X-TYPESENSE-API-KEY': TYPESENSE_API_KEY },
  });
  assert(response.status === 200);
  assert(response.headers.get('content-type').includes('application/json') === true);
  /**
   * @type {any}
   */
  const response_body = await response.json();
  if (response_body instanceof Object) {
    if (response_body.keys instanceof Array) {
      return response_body.keys;
    }
  }
  return null;
};

/**
 * @param {string} value
 * @param {string} description
 * @param {string[]} actions
 * @param {string[]} collections
 * @param {null} expires_at
 */
const post_key = async (value, description, actions, collections, expires_at) => {
  assert(typeof value === 'string');
  assert(typeof description === 'string');
  assert(actions instanceof Array);
  actions.forEach((action) => {
    assert(typeof action === 'string');
  });
  assert(collections instanceof Array);
  collections.forEach((collection) => {
    assert(typeof collection === 'string');
  });
  assert(typeof expires_at === 'number' || expires_at === null);
  const response = await fetch('http://0.0.0.0:8108/keys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-TYPESENSE-API-KEY': TYPESENSE_API_KEY,
    },
    body: JSON.stringify({
      value: value,
      description: description,
      actions: actions,
      collections: collections,
      expires_at: expires_at || undefined,
    }),
  });
  console.log(response.status);
  console.log(response.headers);
  assert(response.status === 201);
  assert(response.headers.get('content-type').includes('application/json') === true);
  const response_body = await response.json();
  return response_body;
};

/**
 * @param {number} id
 */
const delete_key = async (id) => {
  assert(typeof id === 'number');
  const response = await fetch(`http://0.0.0.0:8108/keys/${id}`, {
    method: 'DELETE',
    headers: { 'X-TYPESENSE-API-KEY': TYPESENSE_API_KEY },
  });
  assert(response.status === 200 || response.status === 404);
  assert(response.headers.get('content-type').includes('application/json') === true);
  const response_body = await response.json();
  return response_body;
};

/**
 * @param {string} api_key
 * @param {string} collection_name
 * @param {Record<string, string>} parameters
 */
const search = async (api_key, collection_name, parameters) => {
  assert(typeof collection_name === 'string');
  assert(parameters instanceof Object);
  const url = new URL('http://0.0.0.0:8108/');
  url.pathname = `/collections/${collection_name}/documents/search`;
  url.search = new URLSearchParams(parameters).toString();
  console.log(url.toString());
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'X-TYPESENSE-API-KEY': api_key },
  });
  console.log(response.status);
  console.log(response.headers);
  assert(response.status === 200);
  assert(response.headers.get('content-type').includes('application/json') === true);
  const response_body = await response.json();
  return response_body;
};

{
  /**
   * @type {any}
   */
  const collections = await get_collections();
  for (let i = 0, l = collections.length; i < l; i += 1) {
    const collection = collections[i];
    console.log(`typesense: deleting ${collection.name}..`);
    await delete_collection(collection.name);
  }
}

const datasets = [
  psgc_regions,
  psgc_provinces,
  psgc_cities,
  psgc_municipalities,
  psgc_submunicipalities,
  psgc_barangays,
];

for (let i = 0, l = datasets.length; i < l; i += 1) {
  const dataset = datasets[i];
  console.log(`typesense: creating ${dataset.collection.name}..`);
  await post_collection(dataset.collection);
  if (dataset.documents.length > 0) {
    console.log(`typesense: posting ${dataset.documents.length} documents..`);
    await post_documents(dataset.collection.name, dataset.documents);
  }
}

{
  console.log('typesense: getting keys..');
  const keys = await get_keys();
  if (keys instanceof Array) {
    for (let i = 0, l = keys.length; i < l; i += 1) {
      const key = keys[i];
      if (key instanceof Object) {
        if (typeof key.value_prefix === 'string') {
          if (key.value_prefix === TYPESENSE_SEARCH_ONLY_KEY.substring(0, 4)) {
            if (typeof key.id === 'number') {
              console.log(`typesense: deleting key ${TYPESENSE_SEARCH_ONLY_KEY}..`);
              await delete_key(key.id);
            }
          }
        }
      }
    }
  }
}

{
  console.log(`typesense: creating key ${TYPESENSE_SEARCH_ONLY_KEY}..`);
  const description = 'Search-only key.';
  const actions = ['documents:search'];
  const collections = [...datasets.map((dataset) => dataset.collection.name)];
  const expires_at = null;
  await post_key(TYPESENSE_SEARCH_ONLY_KEY, description, actions, collections, expires_at);
}

{
  console.log(`typesense: testing key ${TYPESENSE_SEARCH_ONLY_KEY}..`);
  await search(TYPESENSE_SEARCH_ONLY_KEY, 'psgc-regions', { q: '', query_by: 'name_extended' });
}
