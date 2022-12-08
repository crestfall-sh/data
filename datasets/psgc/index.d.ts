export interface document {
  id: string;
  code: number;
  name: string;
  name_extended: string;
  geographic_level: string;
  old_names: string;
  city_classification: string;
  income_classification: string;
  barangay_classification: string;
  population_2015: string;
  population_2020: string;
}

export interface region extends document {
  districts: district[];
  provinces: province[];
}

export interface district extends document {
  region_code: number;
  region_name: string;
  cities: city[];
  municipalities: municipality[];
}

export interface province extends document {
  region_code: number;
  region_name: string;
  cities: city[];
  municipalities: municipality[];
}

export interface city extends document {
  region_code: number;
  region_name: string;
  district_code: number;
  district_name: string;
  province_code: number;
  province_name: string;
  submunicipalities: submunicipality[];
  barangays: barangay[];
}

export interface municipality extends document {
  region_code: number;
  region_name: string;
  district_code: number;
  district_name: string;
  province_code: number;
  province_name: string;
  barangays: barangay[];
}

export interface submunicipality extends document {
  region_code: number;
  region_name: string;
  district_code: number;
  district_name: string;
  province_code: number;
  province_name: string;
  city_code: number;
  city_name: string;
  barangays: barangay[];
}

export interface barangay extends document {
  region_code: number;
  region_name: string;
  district_code: number;
  district_name: string;
  province_code: number;
  province_name: string;
  city_code: number;
  city_name: string;
  municipality_code: number;
  municipality_name: string;
  submunicipality_code: number;
  submunicipality_name: string;
}

export interface psgc {
  regions: region[];
  districts: district[];
  provinces: province[];
  cities: city[];
  municipalities: municipality[];
  submunicipalities: submunicipality[];
  barangays: barangay[];
}

export const psgc: psgc;
export default psgc;