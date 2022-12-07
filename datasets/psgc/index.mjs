// @ts-check

/**
 * Notes:
 * - Current version is PSGC 2022 Q3.
 * - On 2022 Q2 they added new geographic level: SGU.
 * - SGU only got 8 rows, which are intentionally excluded in the outputs.
 */

/**
 * @typedef {import('.').record} record
 * @typedef {import('.').region} region
 * @typedef {import('.').district} district
 * @typedef {import('.').province} province
 * @typedef {import('.').city} city
 * @typedef {import('.').municipality} municipality
 * @typedef {import('.').submunicipality} submunicipality
 * @typedef {import('.').barangay} barangay
 * @typedef {import('.').psgc} psgc
 */

import fs from 'fs';
import url from 'url';
import path from 'path';
import assert from 'assert';
import xlsx from 'xlsx';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const constants = {
  CC: 'CC',
  ICC: 'ICC',
  HUC: 'HUC',
  Reg: 'Reg',
  Prov: 'Prov',
  Mun: 'Mun',
  Bgy: 'Bgy',
  City: 'City',
  Dist: 'Dist',
  SubMun: 'SubMun',
  SGU: 'SGU',
  U: 'U',
  R: 'R',
};


const geographic_levels = {
  [constants.Reg]: 'Region',
  [constants.Prov]: 'Province',
  [constants.Mun]: 'Municipality',
  [constants.Bgy]: 'Barangay',
  [constants.City]: 'City',
  [constants.Dist]: 'District',
  [constants.SubMun]: 'Sub-municipality',
  [constants.SGU]: 'Special Government Unit',
};


const city_classificationifications = {
  [constants.CC]: 'Component City',
  [constants.ICC]: 'Independent Component City',
  [constants.HUC]: 'Highly Urbanized City',
};


const barangay_classifications = {
  [constants.U]: 'Urban',
  [constants.R]: 'Rural',
};


/**
 * @type {region[]}
 */
let regions = [];

/**
 * @type {district[]}
 */
let districts = [];

/**
 * @type {province[]}
 */
let provinces = [];

/**
 * @type {city[]}
 */
const cities = [];

/**
 * @type {municipality[]}
 */
const municipalities = [];

/**
 * @type {submunicipality[]}
 */
const submunicipalities = [];

/**
 * @type {barangay[]}
 */
const barangays = [];

const areas_xlsx_path = path.join(__dirname, './PSGC-3Q-2022-Publication-Datafile.xlsx');
assert(fs.existsSync(areas_xlsx_path) === true);

const regions_json_path = path.join(__dirname, './psgc.regions.json');
const districts_json_path = path.join(__dirname, './psgc.districts.json');
const provinces_json_path = path.join(__dirname, './psgc.provinces.json');
const cities_json_path = path.join(__dirname, './psgc.cities.json');
const municipalities_json_path = path.join(__dirname, './psgc.municipalities.json');
const submunicipalities_json_path = path.join(__dirname, './psgc.submunicipalities.json');
const barangays_json_path = path.join(__dirname, './psgc.barangays.json');

console.log('psgc: removing files..');

if (fs.existsSync(regions_json_path) === true) {
  fs.unlinkSync(regions_json_path);
}
if (fs.existsSync(districts_json_path) === true) {
  fs.unlinkSync(districts_json_path);
}
if (fs.existsSync(provinces_json_path) === true) {
  fs.unlinkSync(provinces_json_path);
}
if (fs.existsSync(cities_json_path) === true) {
  fs.unlinkSync(cities_json_path);
}
if (fs.existsSync(municipalities_json_path) === true) {
  fs.unlinkSync(municipalities_json_path);
}
if (fs.existsSync(submunicipalities_json_path) === true) {
  fs.unlinkSync(submunicipalities_json_path);
}
if (fs.existsSync(barangays_json_path) === true) {
  fs.unlinkSync(barangays_json_path);
}

console.log('psgc: loading data..');

const workbook = xlsx.readFile(areas_xlsx_path);
const worksheet = workbook.Sheets['PSGC'];

console.log('psgc: parsing data..');

{
  /**
   * @type {region}
   */
  let region = null;

  /**
   * @type {district}
   */
  let district = null;

  /**
   * @type {province}
   */
  let province = null;

  /**
   * @type {city}
   */
  let city = null;

  /**
   * @type {municipality}
   */
  let municipality = null;

  /**
   * @type {submunicipality}
   */
  let submunicipality = null;

  let next_row_index = 2;

  while (Object.prototype.hasOwnProperty.call(worksheet, 'B'.concat(String(next_row_index))) === true) {

    /**
     * @type {string}
     */
    let id = null;

    let code = worksheet['A'.concat(String(next_row_index))]?.v || null;
    const name = worksheet['B'.concat(String(next_row_index))]?.v || null;
    const name_extended = name;
    let correspondence_code = worksheet['C'.concat(String(next_row_index))]?.v || null;
    const geographic_level = geographic_levels[worksheet['D'.concat(String(next_row_index))]?.v] || null;
    const old_names = worksheet['E'.concat(String(next_row_index))]?.v || null;
    const city_classification = city_classificationifications[worksheet['F'.concat(String(next_row_index))]?.v] || null;
    const income_classification = worksheet['G'.concat(String(next_row_index))]?.v || null;
    const barangay_classification = barangay_classifications[worksheet['H'.concat(String(next_row_index))]?.v] || null;
    let population_2015 = worksheet['I'.concat(String(next_row_index))]?.v || 0;
    let population_2020 = worksheet['K'.concat(String(next_row_index))]?.v || 0;
    if (typeof code === 'string') {
      id = code;
      code = Number(code);
    }
    if (typeof correspondence_code === 'string') {
      correspondence_code = Number(correspondence_code);
    }
    if (typeof population_2015 === 'string') {
      if (population_2015 === '-') {
        population_2015 = 0;
      } else {
        population_2015 = population_2015.replace(/\(.+\)|,/g, '');
        population_2015 = Number(population_2015);
        assert(Number.isNaN(population_2015) === false);
      }
    }
    if (typeof population_2020 === 'string') {
      if (population_2020 === '-') {
        population_2020 = 0;
      } else {
        population_2020 = population_2020.replace(/\(.+\)|,/g, '');
        population_2020 = Number(population_2020);
        assert(Number.isNaN(population_2020) === false);
      }
    }
    try {
      assert(typeof code === 'number' || code === null);
      assert(typeof population_2015 === 'number' || population_2015 === null);
      assert(typeof population_2020 === 'number' || population_2020 === null);
    } catch (e) {
      console.error(e);
      console.error({ next_row_index, code, population_2015, population_2020 });
    }
    /**
     * @type {record}
     */
    const record = {
      id,
      code,
      name,
      name_extended,
      geographic_level,
      old_names,
      city_classification,
      income_classification,
      barangay_classification,
      population_2015,
      population_2020,
    };


    switch (geographic_level) {

      case geographic_levels[constants.Reg]: {
        region = { ...record, districts: [], provinces: [] };
        district = null;
        province = null;
        city = null;
        municipality = null;
        submunicipality = null;
        regions.push(region);
        break;
      }

      case geographic_levels[constants.Dist]: {
        record.name = record.name
          .replace('City of Manila, ', '')
          .replace('NCR, ', '')
          .replace(' (Not a Province)', '');
        record.name_extended = record.name_extended
          .replace('City of Manila, ', '')
          .replace('NCR, ', '')
          .replace(' (Not a Province)', '');
        district = {
          ...record,
          region_code: null,
          region_name: null,
          cities: [],
          municipalities: [],
        };
        province = null;
        city = null;
        municipality = null;
        submunicipality = null;
        if (region instanceof Object) {
          district.region_code = region.code;
          district.region_name = region.name;
          district.name_extended = district.name.concat(`, ${region.name_extended}`);
          region.districts.push(district);
        }
        districts.push(district);
        break;
      }
      case geographic_levels[constants.Prov]: {
        district = null;
        province = {
          ...record,
          region_code: null,
          region_name: null,
          cities: [],
          municipalities: [],
        };
        city = null;
        municipality = null;
        submunicipality = null;
        if (region instanceof Object) {
          province.region_code = region.code;
          province.region_name = region.name;
          province.name_extended = province.name.concat(`, ${region.name_extended}`);
          region.provinces.push(province);
        }
        provinces.push(province);
        break;
      }

      case geographic_levels[constants.City]: {
        city = {
          ...record,
          region_code: null,
          region_name: null,
          district_code: null,
          district_name: null,
          province_code: null,
          province_name: null,
          submunicipalities: [],
          barangays: [],
        };
        municipality = null;
        submunicipality = null;
        if (region instanceof Object) {
          city.region_code = region.code;
          city.region_name = region.name;
        }
        if (district instanceof Object) {
          city.district_code = district.code;
          city.district_name = district.name;
          city.name_extended = city.name.concat(`, ${district.name_extended}`);
          district.cities.push(city);
        }
        if (province instanceof Object) {
          city.province_code = province.code;
          city.province_name = province.name;
          city.name_extended = city.name.concat(`, ${province.name_extended}`);
          province.cities.push(city);
        }
        cities.push(city);
        break;
      }
      case geographic_levels[constants.Mun]: {
        city = null;
        municipality = {
          ...record,
          region_code: null,
          region_name: null,
          district_code: null,
          district_name: null,
          province_code: null,
          province_name: null,
          barangays: [],
        };
        submunicipality = null;
        if (region instanceof Object) {
          municipality.region_code = region.code;
          municipality.region_name = region.name;
        }
        if (district instanceof Object) {
          municipality.district_code = district.code;
          municipality.district_name = district.name;
          municipality.name_extended = municipality.name.concat(`, ${district.name_extended}`);
          district.municipalities.push(municipality);
        }
        if (province instanceof Object) {
          municipality.province_code = province.code;
          municipality.province_name = province.name;
          municipality.name_extended = municipality.name.concat(`, ${province.name_extended}`);
          province.municipalities.push(municipality);
        }
        municipalities.push(municipality);
        break;
      }

      case geographic_levels[constants.SubMun]: {
        submunicipality = {
          ...record,
          region_code: null,
          region_name: null,
          district_code: null,
          district_name: null,
          province_code: null,
          province_name: null,
          city_code: null,
          city_name: null,
          barangays: [],
        };
        if (region instanceof Object) {
          submunicipality.region_code = region.code;
          submunicipality.region_name = region.name;
        }
        if (district instanceof Object) {
          submunicipality.district_code = district.code;
          submunicipality.district_name = district.name;
        }
        if (province instanceof Object) {
          submunicipality.province_code = province.code;
          submunicipality.province_name = province.name;
        }
        if (city instanceof Object) {
          submunicipality.city_code = city.code;
          submunicipality.city_name = city.name;
          submunicipality.name_extended = submunicipality.name.concat(`, ${city.name_extended}`);
          city.submunicipalities.push(submunicipality);
        }
        submunicipalities.push(submunicipality);
        break;
      }

      case geographic_levels[constants.Bgy]: {
        /**
         * @type {barangay}
         */
        const barangay = {
          ...record,
          region_code: null,
          region_name: null,
          district_code: null,
          district_name: null,
          province_code: null,
          province_name: null,
          city_code: null,
          city_name: null,
          municipality_code: null,
          municipality_name: null,
          submunicipality_code: null,
          submunicipality_name: null,
        };
        if (region instanceof Object) {
          barangay.region_code = region.code;
          barangay.region_name = region.name;
        }
        if (district instanceof Object) {
          barangay.district_code = district.code;
          barangay.district_name = district.name;
        }
        if (province instanceof Object) {
          barangay.province_code = province.code;
          barangay.province_name = province.name;
        }
        if (city instanceof Object) {
          barangay.city_code = city.code;
          barangay.city_name = city.name;
          barangay.name_extended = barangay.name.concat(`, ${city.name_extended}`);
          city.barangays.push(barangay);
        }
        if (municipality instanceof Object) {
          barangay.municipality_code = municipality.code;
          barangay.municipality_name = municipality.name;
          barangay.name_extended = barangay.name.concat(`, ${municipality.name_extended}`);
          municipality.barangays.push(barangay);
        }
        if (submunicipality instanceof Object) {
          barangay.submunicipality_code = submunicipality.code;
          barangay.submunicipality_name = submunicipality.name;
          barangay.name_extended = barangay.name.concat(`, ${submunicipality.name_extended}`);
          submunicipality.barangays.push(barangay);
        }
        barangays.push(barangay);
        break;
      }

      default: {
        break;
      }
    }
    next_row_index += 1;
  }
}

regions = regions.map((region) => {
  return {
    ...region,
    districts: region.districts.map((district) => {
      return { ...district, cities: null, municipalities: null };
    }),
    provinces: region.provinces.map((province) => {
      return { ...province, cities: null, municipalities: null };
    }),
  };
});

districts = districts.map((district) => {
  return {
    ...district,
    cities: district.cities.map((city) => {
      return { ...city, submunicipalities: null, barangays: null };
    }),
  };
});

provinces = provinces.map((province) => {
  return {
    ...province,
    cities: province.cities.map((city) => {
      return { ...city, barangays: null };
    }),
    municipalities: province.municipalities.map((municipality) => {
      return { ...municipality, barangays: null };
    }),
  };
});

console.log('psgc: creating files..');
fs.writeFileSync(regions_json_path, JSON.stringify(regions), { encoding: 'utf-8' });
fs.writeFileSync(districts_json_path, JSON.stringify(districts), { encoding: 'utf-8' });
fs.writeFileSync(provinces_json_path, JSON.stringify(provinces), { encoding: 'utf-8' });
fs.writeFileSync(cities_json_path, JSON.stringify(cities), { encoding: 'utf-8' });
fs.writeFileSync(municipalities_json_path, JSON.stringify(municipalities), { encoding: 'utf-8' });
fs.writeFileSync(submunicipalities_json_path, JSON.stringify(submunicipalities), { encoding: 'utf-8' });
fs.writeFileSync(barangays_json_path, JSON.stringify(barangays), { encoding: 'utf-8' });

console.log(`psgc: regions: ${regions.length}`);
console.log(`psgc: districts: ${districts.length}`);
console.log(`psgc: provinces: ${provinces.length}`);
console.log(`psgc: cities: ${cities.length}`);
console.log(`psgc: municipalities: ${municipalities.length}`);
console.log(`psgc: submunicipalities: ${submunicipalities.length}`);
console.log(`psgc: barangays: ${barangays.length}`);

/**
 * @type {psgc}
 */
export const psgc = {
  regions,
  districts,
  provinces,
  cities,
  municipalities,
  submunicipalities,
  barangays,
};