import { MobiledeResultsCarCardProps } from "@/interfaces/mobilede-car";

export type UseFetchCarsResult = {
  loading: boolean;
  error: string | null;
  cars: MobiledeResultsCarCardProps[];
  seeAllUrl: string | null;
  fetchCars: () => void;
};

export interface FetchLeboncoinCarsParams {
  make: string;
  model: string;
  maxYear: string;
  minPrice?: string;
  maxPrice?: string;
  minYear?: string;
  maxKm?: string;
  minKm?: string;
  filters?: any;
  makeId?: number;
  modelId?: number;
}
