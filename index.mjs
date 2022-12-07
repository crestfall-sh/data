// @ts-check

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import fetch from 'node-fetch';

const env_path = path.join(process.cwd(), '.env');
assert(fs.existsSync(env_path) === true);

/**
 * @type {Map<string, string>}
 */
const env = new Map();

const env_data = fs.readFileSync(env_path, { encoding: 'utf-8' });
env_data.split('\n').forEach((line) => {
  const [key, value] = line.split('=');
  env.set(key, value);
});

assert(env.has('PGRST_JWT_SECRET') === true);
assert(env.has('PGRST_JWT_SECRET_IS_BASE64') === true);
assert(env.get('PGRST_JWT_SECRET_IS_BASE64') === 'true');
assert(env.has('TYPESENSE_API_KEY') === true);

console.log(env);

// [ ] postgresql schema
// [ ] postgresql insert

// [ ] typesense schema
// [ ] typesense insert
