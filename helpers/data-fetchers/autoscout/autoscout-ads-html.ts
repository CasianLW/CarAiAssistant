import { MobiledeResultsCarCardProps } from "@/interfaces/mobilede-car";

export interface ParseCarsInput {
  html: string;
}

export interface ParseCarsOutput {
  cars: MobiledeResultsCarCardProps[];
}

const extractJsonFromHtml = (html: string): any[] => {
  const jsonRegex =
    /"numberOfResultsIncludingNulls":\d+,"listings":(\[.*?\]),"numberOfOcsResults":\d+/;
  const match = html.match(jsonRegex);

  if (!match || match.length < 2) return [];

  const jsonString = `{"listings":${match[1]}}`;

  try {
    const parsedJson = JSON.parse(jsonString);
    return parsedJson.listings || [];
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return [];
  }
};

const extractDataFromListing = (
  listing: any
): MobiledeResultsCarCardProps | null => {
  const { vehicle, price, tracking, location, images, url, vehicleDetails } =
    listing;

  if (
    !vehicle ||
    !price ||
    !tracking ||
    !location ||
    images.length === 0 ||
    !images ||
    !vehicleDetails ||
    !url
  ) {
    // console.error("Failed to extract data from listing", listing);
    return null;
  }

  // const details = [
  //   tracking.mileage ? `${tracking.mileage} km` : "",
  //   tracking.transmission || "",
  //   tracking.firstRegistration || "",
  //   tracking.fuelType || "",
  // ].filter((detail) => detail); // remove empty details
  const details = vehicleDetails.map((detail: any) => detail.data);

  return {
    title: `${vehicle.make} ${vehicle.model}`,
    price: price.priceFormatted,
    details,
    location: `${
      location.zip + " " + location.city + " " + location.countryCode
    }`,
    imgSrc:
      images[0] ||
      images[1] ||
      images[10] ||
      images[7] ||
      images[4] ||
      images[3] ||
      images[2] ||
      "",
    href: `https://www.autoscout24.fr${url}`,
  };
};

export const parseAutoscoutCarsFromHtml = (
  input: ParseCarsInput
): ParseCarsOutput => {
  const listings = extractJsonFromHtml(input.html);
  const cars: MobiledeResultsCarCardProps[] = listings
    .map(extractDataFromListing)
    .filter((car): car is MobiledeResultsCarCardProps => car !== null);

  // console.log("Autoscout listings length:", listings.length);
  console.log("Autoscout cars length:", cars.length);

  return { cars };
};
