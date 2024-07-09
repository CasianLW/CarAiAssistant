import { VehicleAiApiResponse } from "@/interfaces/api-datas";
import { MobiledeCarCardProps } from "@/interfaces/mobilede-car";

export function validateApiResponse(data: any): VehicleAiApiResponse | null {
  if (
    typeof data === "object" &&
    typeof data.statusCode === "number" &&
    typeof data.message === "string" &&
    typeof data.data === "object" &&
    typeof data.data.respectedFilters === "boolean" &&
    Array.isArray(data.data.vehicles) &&
    data.data.vehicles.every(isValidVehicle)
  ) {
    return data as VehicleAiApiResponse;
  } else {
    return (data = null);
  }
}

function isValidVehicle(object: any): object is MobiledeCarCardProps {
  return (
    typeof object === "object" &&
    typeof object.make === "string" &&
    typeof object.makeId === "number" &&
    typeof object.model === "string" &&
    typeof object.modelId === "number" &&
    typeof object.year === "number" &&
    typeof object.price === "number" &&
    typeof object.consumption === "number" &&
    typeof object.fuel_cost === "number" &&
    typeof object.annual_maintenance === "number" &&
    typeof object.registration_cost === "number" &&
    typeof object.estimated_insurance === "number" &&
    typeof object.max_km === "number" &&
    typeof object.description === "string"
  );
}
