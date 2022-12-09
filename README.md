# Open Data APIs

## Overview

Crestfall Open Data APIs provides publicly-accessible APIs for commonly-used datasets.

## Roadmap

#### Caddy

- Actively used for TLS.

#### TypeSense

- Actively used for search purposes.

#### PostgreSQL & PostgREST

- Planned use for data enumeration purposes.

#### JavaScript Client & User Interfaces

- Debounced search, sorting, filtering, pagination.
- Select, Multi-select, Search, Multi-search.
- Planned.

#### Datasets in various formats

- Datasets in CSV, TSV, JSON, JSONL.
- Planned.

#### SaaS

- Users, Projects, Public / Private APIs.
- Planned.

## Philippine Standard Geographic Code (PSGC)

#### About

From https://psa.gov.ph/classification/psgc/.

Abstract: The PSGC is a systematic classification and coding of geographic areas in the Philippines. It is based on the four (4) well-established hierarchical levels of geographical-political subdivisions of the country, namely, the administrative region, the province, the municipality/city, and the barangay.

Process: The PSGC is updated based on the official changes occuring in the administrative structure of the country through Republic Acts and local ordinances ratified through plebiscites conducted by the COMELEC.

Disclaimer: The PSGC is being distributed without warranty of any kind, either expressed or implied. The responsibility for the interpretation and use of the PSGC lies with the user. In no event shall the Philippine Statistics Authority be liable for damages arising from its use.

#### Usage

- https://data.crestfall.sh/typesense/psgc-regions?q=
- https://data.crestfall.sh/typesense/psgc-provinces?q=
- https://data.crestfall.sh/typesense/psgc-cities?q=
- https://data.crestfall.sh/typesense/psgc-municipalities?q=
- https://data.crestfall.sh/typesense/psgc-submunicipalities?q=
- https://data.crestfall.sh/typesense/psgc-barangays?q=

## License

MIT