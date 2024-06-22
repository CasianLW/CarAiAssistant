import { useState, useCallback } from "react";
import axios from "axios";
import { MobiledeResultsCarCardProps } from "@/interfaces/mobilede-car";
import {
  FetchLeboncoinCarsParams,
  UseFetchCarsResult,
} from "../data-fetchers.interface";
import { parseAutoscoutCarsFromHtml } from "./autoscout-ads-html";

const userAgents = [
  "Mozilla/5.0 (X11; CrOS x86_64 15633.69.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.212 Safari/537.36",
  "Mozilla/5.0 (X11; CrOS x86_64 15633.69.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.212 Safari/537.36",
  "Mozilla/5.0 (X11; CrOS x86_64 15633.69.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.212 Safari/537.36",
];

export function useFetchAutoscoutCars({
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
    if (!make || !model || !maxYear) {
      console.error(
        "Make, model, and year are required parameters (autoscout)."
      );
      return;
    }

    const baseUrl = "https://www.autoscout24.fr/lst";
    let url = `${baseUrl}/${make}/${model}?atype=C&cy=F&desc=0&fregfrom=${
      minYear || 1950
    }&fregto=${maxYear || 2050}&kmfrom=${minKm || 0}&kmto=${
      maxKm || 1000000
    }&powertype=kw&pricefrom=${minPrice || 0}&priceto=${
      maxPrice || 1000000
    }&sort=price&source=detailsearch&ustate=N%2CU`;

    const headers = {
      "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    };

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await axios.get(url, { headers });

      const htmlContent: string = response.data.toString();
      const output = parseAutoscoutCarsFromHtml({ html: htmlContent });

      setCars(output.cars);
      // console.log("Autoscout cars:", cars.length);
      setSeeAllUrl(url);
    } catch (error: any) {
      setError(`Failed to fetch autoscout cars: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [make, model, minYear, maxYear, minKm, maxKm, minPrice, maxPrice]);

  return { loading, error, cars, seeAllUrl, fetchCars };
}
