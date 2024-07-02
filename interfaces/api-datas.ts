import { FilterData } from "@/components/screens/categories/steps/filter.step";
import { MobiledeCarCardProps } from "./mobilede-car";

export interface AiPayloadUnknown {
  userId: string | null;
  userLogged: boolean;
  prompt: string;
  // filters: FilterData;
}

// export interface VehicleAiResponse {
//   make: string;
//   makeId: number;
//   model: string;
//   modelId: number;
//   year: number;
//   price: number;
//   consumption: number;
//   fuel_cost: number;
//   annual_maintenance: number;
//   registration_cost: number;
//   estimated_insurance: number;
//   max_km: number;
//   description: string;
// }

export interface VehicleAiApiResponse {
  statusCode: number;
  message: string;
  data: {
    respectedFilters: boolean;
    vehicles: MobiledeCarCardProps[];
  };
}

export interface VehicleAiData extends VehicleAiApiResponse {
  filters: FilterData;
}
export interface RapportPayloadData {
  userId: string;
  userLogged: boolean;
  vehicleData: MobiledeCarCardProps;
}
