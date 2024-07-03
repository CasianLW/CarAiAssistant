import { useState, useCallback } from "react";
import axios from "axios";
import { MobiledeResultsCarCardProps } from "@/interfaces/mobilede-car";
import {
  FetchLeboncoinCarsParams,
  UseFetchCarsResult,
} from "../data-fetchers.interface";
import { parseLeboncoinCarsFromHtml } from "./leboncoin-ads-html";

const userAgents = [
  "Mozilla/5.0 (X11; CrOS x86_64 15633.69.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.212 Safari/537.36",
  "Mozilla/5.0 (X11; CrOS x86_64 15633.69.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.212 Safari/537.36",
  "Mozilla/5.0 (X11; CrOS x86_64 15633.69.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.212 Safari/537.36",
];
function replaceSeparators(inputString: string) {
  return inputString.replace(/[- _]/g, "%20");
}

export function useFetchLeboncoinCars({
  make,
  model,
  minYear,
  maxYear,
  minPrice,
  maxPrice,
  minKm,
  maxKm,
  filters = {},
}: FetchLeboncoinCarsParams): UseFetchCarsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [cars, setCars] = useState<MobiledeResultsCarCardProps[]>([]);
  const [seeAllUrl, setSeeAllUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    if (!make || !model || !minYear) {
      console.error("Make, model, and year are required parameters (lbc).");
      // console.error("Data:", { make, model, maxYear });
      return;
    }

    const baseUrl = "https://www.leboncoin.fr/recherche";
    // let url = `${baseUrl}?category=2&u_car_brand=${make}&u_car_model=${make}_${model}&regdate=${year}-max`;
    let url = `${baseUrl}?category=2&u_car_brand=${make.toUpperCase()}&u_car_model=${make.toUpperCase()}_${replaceSeparators(
      model
    )}&price=${minPrice ? minPrice : 200}-${
      maxPrice ? maxPrice : 5000000
    }&regdate=${minYear ? minYear : 1950}-${maxYear ? maxYear : 2050}&mileage=${
      minKm ? minKm : 0
    }-${maxKm ? maxKm : 1000000}&sort=price&order=asc`;

    // console.log("URL lbc:", url);

    // const defaultFilters = {
    //   srt: "price",
    //   sro: "asc",
    //   ...filters,
    // };

    // const filterParams = Object.entries(defaultFilters)
    //   .map(([key, value]) => `${key}=${value}`)
    //   .join("&");

    // https://www.leboncoin.fr/recherche?category=2&u_car_brand=PEUGEOT&u_car_model=PEUGEOT_208&price=15000-37800&regdate=2020-2050&mileage=0-200000&sort=price&order=asc

    // https://www.leboncoin.fr/recherche?category=2&u_car_brand=PEUGEOT&u_car_model=PEUGEOT_208&price=15000-37800&regdate=2020-2050&mileage=0-200000&sort=price&order=asc

    // url += `&${filterParams}`;

    const headers = {
      "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
      //   "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    };

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await axios.get(url, { headers });

      const htmlContent: string = response.data.toString();
      //   console.log("URL lbc Content:", url);
      //   console.log("HTML lbc Content:", htmlContent);

      //   console.log("Fetched lbc cars starts...");

      const output = parseLeboncoinCarsFromHtml({ html: htmlContent });

      //   console.log("Parsed lbc cars:", output.cars);
      //   console.log("Fetched lbc cars ended...");
      //   console.log(url);

      setCars(output.cars);
      setSeeAllUrl(url);
    } catch (error: any) {
      setError(`Failed to fetch lbc cars: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [make, model, maxYear, filters]);

  return { loading, error, cars, seeAllUrl, fetchCars };
}
