// hooks/use-vehicle-query.ts
import { useState, useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchVehicles } from "@/helpers/vehicle-query-list";
import { VehicleApiResponse } from "@/interfaces/vehicle-interface";

function useVehicleQuery(
  make: string,
  fetchModels: boolean,
  trigger: boolean
): UseQueryResult<VehicleApiResponse, Error> {
  return useQuery<VehicleApiResponse, Error>({
    queryKey: [fetchModels ? "models" : "makes", make],
    queryFn: () => fetchVehicles(make, fetchModels),
    enabled: trigger,
  });
}

export default useVehicleQuery;
