export interface facet_count {
  value: string;
  count: number;
}

export interface facet_stats {
  total_values: number;
}

export interface facet_counts {
  field_name: string;
  counts: facet_count[];
  stats: facet_stats;
}

export interface highlight {
  field: string;
  matched_tokens: string[];
  snippet: string;
}

export type document = Record<string, string|number|boolean>;

export interface hit {
  document: document;
  highlights: highlight[];
  text_match: number;
}

export interface request_params {
  collection_name: string;
  per_page: number;
  q: string;
}

export interface response {
  facet_counts: facet_counts[];
  found: number;
  hits: hit[];
  out_of: number;
  page: number;
  request_params: request_params;
  search_time_ms: number;
  search_cutoff: boolean;
}