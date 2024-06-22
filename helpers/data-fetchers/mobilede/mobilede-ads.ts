import { useState, useCallback } from "react";
import axios from "axios";
import { MobiledeResultsCarCardProps } from "@/interfaces/mobilede-car";

import { parseCarsFromHtml } from "./mobileds-ads-html";
import {
  FetchLeboncoinCarsParams,
  UseFetchCarsResult,
} from "../data-fetchers.interface";

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
];

export function useFetchMobiledeCars({
  make,
  model,
  minYear,
  maxYear,
  minPrice,
  maxPrice,
  minKm,
  maxKm,
  makeId,
  modelId,
  filters = {},
}: FetchLeboncoinCarsParams): UseFetchCarsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [cars, setCars] = useState<MobiledeResultsCarCardProps[]>([]);
  const [seeAllUrl, setSeeAllUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // console.log("Starting useFetchMobiledeCars");

  const fetchCars = useCallback(async () => {
    if (!make || !model || !makeId || !modelId) {
      console.error("Make, model are required parameters.");
      return;
    }

    const baseUrl = `https://www.automobile.fr/voiture/${make}-${model}/`;
    let url = `${baseUrl}vhc:car,ms1:${makeId}_${modelId}_,`;

    const defaultFilters: { [key: string]: string } = {
      srt: "price",
      sro: "asc",
      dmg: "false",
      ...filters,
    };

    if (minYear) defaultFilters.frn = minYear;
    if (maxYear) defaultFilters.frx = maxYear;
    if (minPrice) defaultFilters.prn = minPrice;
    if (maxPrice) defaultFilters.prx = maxPrice;
    if (minKm) defaultFilters.mln = minKm;
    if (maxKm) defaultFilters.mlx = maxKm;

    const filterParams = Object.entries(defaultFilters)
      .map(([key, value]) => `${key}:${value}`)
      .join(",");

    url += filterParams;

    // console.log("Fetching cars mobilede from:", url);
    const headers = {
      "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    };

    setLoading(true);

    try {
      const response = await axios.get(url, { headers });

      const htmlContent: string = response.data.toString();

      const output = parseCarsFromHtml({ html: htmlContent });

      // console.log("Parsed mobilede cars:", output.cars[0].details);

      setCars(output.cars);
      setSeeAllUrl(url);
    } catch (error: any) {
      setError(`Failed to fetch cars: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [
    make,
    model,
    minYear,
    filters,
    maxYear,
    minPrice,
    maxPrice,
    minKm,
    maxKm,
  ]);

  return { loading, error, cars, seeAllUrl, fetchCars };
}
