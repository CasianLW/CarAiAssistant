// async function fetchVehicles(make?: string, isModelFetch: boolean = false) {
//   let url = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=${make}&rows=10`;
//   if (isModelFetch) {
//     url += `&facet=model`; // Supposons que le filtrage par modèle nécessite un paramètre différent ou une logique différente
//   }
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }

// export { fetchVehicles };

import { VehicleApiResponse } from "@/interfaces/vehicle-interface";

async function fetchVehicles(
  make?: string,
  isModelFetch: boolean = false
): Promise<VehicleApiResponse> {
  let url = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=${make}&rows=10`;
  if (isModelFetch) {
    url += `&facet=model`; // Adjust the URL for model fetching if needed
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<VehicleApiResponse>;
}

export { fetchVehicles };
