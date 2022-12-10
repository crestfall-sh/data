# Open Data APIs

## Overview

Public API access for common datasets.

## Roadmap

#### Caddy

- Actively used for TLS.

#### TypeSense

- Actively used for search purposes.

#### JavaScript Client 

- [x] typesense: search
- [ ] typesense: sorting
- [ ] typesense: filtering
- [ ] typesense: pagination
- [ ] typesense: use of debounce, use of abortcontroller, handling of aborterror

#### User Interfaces

- Select, Multi-select, Search, Multi-search.
- Planned.

#### PostgreSQL & PostgREST

- Planned use for data enumeration purposes.

#### Datasets in various formats

- Datasets in CSV, TSV, JSON, JSONL.
- Planned.

#### SaaS

- Users, Projects, Public / Private APIs.
- Planned.

## Philippine Standard Geographic Code (PSGC)

From https://psa.gov.ph/classification/psgc/.

Abstract: The PSGC is a systematic classification and coding of geographic areas in the Philippines. It is based on the four (4) well-established hierarchical levels of geographical-political subdivisions of the country, namely, the administrative region, the province, the municipality/city, and the barangay.

Process: The PSGC is updated based on the official changes occuring in the administrative structure of the country through Republic Acts and local ordinances ratified through plebiscites conducted by the COMELEC.

Disclaimer: The PSGC is being distributed without warranty of any kind, either expressed or implied. The responsibility for the interpretation and use of the PSGC lies with the user. In no event shall the Philippine Statistics Authority be liable for damages arising from its use.

- https://data.crestfall.sh/typesense/psgc-regions?q=
- https://data.crestfall.sh/typesense/psgc-provinces?q=
- https://data.crestfall.sh/typesense/psgc-cities?q=
- https://data.crestfall.sh/typesense/psgc-municipalities?q=
- https://data.crestfall.sh/typesense/psgc-submunicipalities?q=
- https://data.crestfall.sh/typesense/psgc-barangays?q=

## Deployment

- Create Virtual Machine instance
- Configure DNS, create A record for data.crestfall.sh with VM IP Address as value
- Connect to Server Instance: `ssh ubuntu@data.crestfall.sh`
- Sign-in as root: `sudo su -`
- Install Docker: https://docs.docker.com/engine/install/ubuntu/
- Install Node.js: https://github.com/nodesource/distributions#deb
- Generate SSH key: `ssh-keygen`
- Show SSH public key: `cat ~/.ssh/id_rsa.pub`
- Add SSH public key in your GitHub account
- Clone the github repository: `git clone git@github.com:crestfall-sh/data.git`
- Install dependencies with NPM: `npm install`
- Initialize environment file: `bash ./env.sh`
- Run with docker: docker `compose up --detach`
- Populate database with data: `node ./index.mjs`

## JavaScript Client

```sh
npm install github:crestfall-sh/data
```

```js
import * as client from '@crestfall-sh/data/client.mjs';

const response = await client.search('https://data.crestfall.sh/typesense/psgc-barangays', '', 1);
console.log(response);
```

## Support

- Issues: https://github.com/crestfall-sh/data/issues
- Discussions: https://github.com/crestfall-sh/data/discussions

## License

MIT