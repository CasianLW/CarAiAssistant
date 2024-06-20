export interface MobiledeCarCardProps {
  make: string;
  makeId: number;
  model: string;
  modelId: number;
  year: number;
  price: number;
  consumption: number;
  fuel_cost: number;
  annual_maintenance: number;
  registration_cost: number;
  estimated_insurance: number;
  max_km: number;
  description: string;
}

export interface MobiledeResultsCarCardProps {
  title: string;
  price: string;
  details: string;
  location: string;
  imgSrc: string;
  href: string;
}
