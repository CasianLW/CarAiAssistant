import { FilterData } from "@/components/screens/categories/steps/filter.step";
import { VehicleAiData } from "@/interfaces/api-datas";

interface Vehicle {
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

interface HistoryResponse {
  respectedFilters: boolean;
  vehicles: Vehicle[];
}

// Function to parse the history response string to a HistoryResponse object
export function parseHistoryResponse(response: string): HistoryResponse | null {
  try {
    const parsedResponse: HistoryResponse = JSON.parse(response);
    return parsedResponse;
  } catch (error) {
    console.error("Failed to parse history response:", error);
    return null;
  }
}

// Function to convert a HistoryResponse to a VehicleAiData
export function historyResponseToVehicleAiData(
  historyResponse: HistoryResponse | null
): VehicleAiData | null {
  if (historyResponse === null) {
    return null; // return null if the historyResponse is null
  }

  // Assuming the `historyResponse` is valid and contains the necessary data
  const filters: FilterData = {
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minKm: "",
    maxKm: "",
    minHp: "",
    maxHp: "",
  };

  const vehicleAiData: VehicleAiData = {
    statusCode: 200,
    message: "History recovered successfully",
    data: {
      respectedFilters: historyResponse.respectedFilters,
      vehicles: historyResponse.vehicles, // Direct assignment if vehicle properties match
    },
    filters: filters,
  };

  return vehicleAiData;
}
