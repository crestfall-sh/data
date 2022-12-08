export interface field {
  name: string;
  type: string;
  optional?: boolean;
}

export interface collection {
  name: string;
  fields: field[];
  default_sorting_field: string;
}

export interface dataset {
  collection: collection;
  documents: document;
}

export type document = Record<string, string|number|boolean|any>;