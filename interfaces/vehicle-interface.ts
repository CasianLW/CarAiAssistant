export interface VehicleApiResponse {
  nhits: number;
  parameters: {
    dataset: string;
    rows: number;
    start: number;
    format: string;
    timezone: string;
  };
  records: VehicleRecord[];
}

export interface VehicleRecord {
  datasetid: string;
  recordid: string;
  fields: VehicleFields;
  record_timestamp: string;
}

export interface VehicleFields {
  range: number;
  cityuf: number;
  citycd: number;
  pv2: number;
  barrelsa08: number;
  mfrcode: string;
  city08: number;
  lv4: number;
  rangehwy: number;
  co2a: number;
  mpgdata: string;
  uhighway: number;
  highway08: number;
  tcharger: string;
  startstop: string;
  comb08u: number;
  year: string;
  model: string;
  fueltype: string;
  displ: number;
  highwayuf: number;
  highwaye: number;
  cylinders: number;
  co2: number;
  charge240: number;
  phevblended: string;
  drive: string;
  highwaya08u: number;
  highwaya08: number;
  make: string;
  highway08u: number;
  phevcomb: number;
  fuelcosta08: number;
  ucitya: number;
  ghgscore: number;
  combe: number;
  basemodel: string;
  phevcity: number;
  barrels08: number;
  fuelcost08: number;
  pv4: number;
  fescore: number;
  co2tailpipegpm: number;
  citya08u: number;
  charge240b: number;
  comba08u: number;
  rangecitya: number;
  charge120: number;
  co2tailpipeagpm: number;
  fueltype1: string;
  lv2: number;
  id: string;
  trany: string;
  highwaycd: number;
  yousavespend: number;
  citya08: number;
  ucity: number;
  vclass: string;
  createdon: string;
  city08u: number;
  combineduf: number;
  modifiedon: string;
  rangecity: number;
  citye: number;
  comb08: number;
  eng_dscr: string;
  uhighwaya: number;
  rangehwya: number;
  phevhwy: number;
  hpv: number;
  engid: string;
  hlv: number;
  comba08: number;
  combinedcd: number;
}
