// @ts-check

import * as client from './client.mjs';

const response = await client.search('https://data.crestfall.sh/typesense/psgc-barangays', '', 1);
console.log(response);
