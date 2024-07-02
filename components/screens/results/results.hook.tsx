import { useState, useEffect } from "react";
import {
  MobiledeCarCardProps,
  MobiledeResultsCarCardProps,
} from "@/interfaces/mobilede-car";
import { useFetchMobiledeCars } from "@/helpers/data-fetchers/mobilede/mobilede-ads";
import { useFetchLeboncoinCars } from "@/helpers/data-fetchers/leboncoin/leboncoin-ads";
import { useFetchAutoscoutCars } from "@/helpers/data-fetchers/autoscout/autoscout-ads";
import { FilterData } from "../categories/steps/filter.step";

export enum AdsPlatform {
  mobilede = "mobilede",
  leboncoin = "leboncoin",
  autoscout = "autoscout",
  allPlatforms = "allPlatforms",
}
const ADS_PER_PAGE = 20;

export interface AllAdsInterface extends MobiledeResultsCarCardProps {
  platform: AdsPlatform;
}
const useSearchResults = (
  aiResults: MobiledeCarCardProps[],
  chosenCarToFetch: MobiledeCarCardProps | null,
  carFilters: FilterData
) => {
  // const results: MobiledeCarCardProps[] = [
  //   {
  //     makeId: 1,
  //     make: "Toyota",
  //     modelId: 101,
  //     model: "Corolla",
  //     year: 2022,
  //     price: 20000,
  //     consumption: 6,
  //     fuel_cost: 1.5,
  //     annual_maintenance: 600,
  //     registration_cost: 250,
  //     estimated_insurance: 800,
  //     max_km: 300000,
  //     description:
  //       "Reliable family car with good fuel efficiency and low maintenance costs.",
  //   },
  //   {
  //     makeId: 1,
  //     make: "Toyota",
  //     modelId: 1011,
  //     model: "Corolla",
  //     year: 2022,
  //     price: 20000,
  //     consumption: 6,
  //     fuel_cost: 1.5,
  //     annual_maintenance: 600,
  //     registration_cost: 250,
  //     estimated_insurance: 800,
  //     max_km: 300000,
  //     description:
  //       "Reliable family car with good fuel efficiency and low maintenance costs.",
  //   },
  //   {
  //     makeId: 1,
  //     make: "Toyota",
  //     modelId: 1011,
  //     model: "Corolla",
  //     year: 2022,
  //     price: 20000,
  //     consumption: 6,
  //     fuel_cost: 1.5,
  //     annual_maintenance: 600,
  //     registration_cost: 250,
  //     estimated_insurance: 800,
  //     max_km: 300000,
  //     description:
  //       "Reliable family car with good fuel efficiency and low maintenance costs.",
  //   },
  //   {
  //     makeId: 1,
  //     make: "Toyota",
  //     modelId: 10211,
  //     model: "Corolla",
  //     year: 2022,
  //     price: 20000,
  //     consumption: 6,
  //     fuel_cost: 1.5,
  //     annual_maintenance: 600,
  //     registration_cost: 250,
  //     estimated_insurance: 800,
  //     max_km: 300000,
  //     description:
  //       "Reliable family car with good fuel efficiency and low maintenance costs.",
  //   },
  //   {
  //     makeId: 1,
  //     make: "Toyota",
  //     modelId: 10111,
  //     model: "Corolla",
  //     year: 2022,
  //     price: 20000,
  //     consumption: 6,
  //     fuel_cost: 1.5,
  //     annual_maintenance: 600,
  //     registration_cost: 250,
  //     estimated_insurance: 800,
  //     max_km: 300000,
  //     description:
  //       "Reliable family car with good fuel efficiency and low maintenance costs.",
  //   },
  // ];

  const results = aiResults || [];
  const {
    loading: loadingMobilede,
    error: errorMobilede,
    cars: carsMobilede,
    fetchCars: fetchCarsMobilede,
    seeAllUrl: seeAllUrlMobilede,
  } = useFetchMobiledeCars({
    make: chosenCarToFetch?.make || "",
    model: chosenCarToFetch?.model || "",
    maxYear: carFilters.maxYear,
    minPrice: chosenCarToFetch?.price
      ? `${chosenCarToFetch?.price * 0.6}`
      : "0",
    maxPrice: chosenCarToFetch?.price
      ? `${chosenCarToFetch?.price * 1.3}`
      : "0",
    minYear: `${chosenCarToFetch?.year}` || "0",
    maxKm: "200000",
    // maxKm: `${chosenCarToFetch?.max_km}` || "1000000",
    minKm: carFilters.minKm,
    makeId: chosenCarToFetch?.makeId || 0,
    modelId: chosenCarToFetch?.modelId || 0,
  });

  const {
    loading: loadingLeboncoin,
    error: errorLeboncoin,
    cars: carsLeboncoin,
    seeAllUrl: seeAllUrlLeboncoin,
    fetchCars: fetchCarsLeboncoin,
  } = useFetchLeboncoinCars({
    make: chosenCarToFetch?.make || "",
    model: chosenCarToFetch?.model || "",
    maxYear: carFilters.maxYear,
    minPrice: chosenCarToFetch?.price
      ? `${chosenCarToFetch?.price * 0.7}`
      : "0",
    maxPrice: chosenCarToFetch?.price
      ? `${chosenCarToFetch?.price * 1.8}`
      : "0",
    minYear: `${chosenCarToFetch?.year}` || "0",
    maxKm: `${chosenCarToFetch?.max_km}` || "1000000",
    minKm: carFilters.minKm,
  });
  const {
    loading: loadingAutoscout,
    error: errorAutoscout,
    cars: carsAutoscout,
    seeAllUrl: seeAllUrlAutoscout,
    fetchCars: fetchCarsAutoscout,
  } = useFetchAutoscoutCars({
    make: chosenCarToFetch?.make || "",
    model: chosenCarToFetch?.model || "",
    maxYear: carFilters.maxYear,
    minPrice: chosenCarToFetch?.price
      ? `${chosenCarToFetch?.price * 0.7}`
      : "0",
    maxPrice: chosenCarToFetch?.price
      ? `${chosenCarToFetch?.price * 1.8}`
      : "0",
    minYear: `${chosenCarToFetch?.year}` || "0",
    maxKm: `${chosenCarToFetch?.max_km}` || "1000000",
    minKm: carFilters.minKm,
  });

  const [allResults, setAllResults] = useState<AllAdsInterface[]>([]);
  const [filteredResults, setFilteredResults] = useState<AllAdsInterface[]>([]);
  const [activePlatform, setActivePlatform] = useState<AdsPlatform>(
    AdsPlatform.allPlatforms
  );
  const [openResults, setOpenResults] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (openResults) {
      fetchCarsMobilede();
      fetchCarsLeboncoin();
      fetchCarsAutoscout();
    } else {
      setAllResults([]);
    }
  }, [openResults]);

  useEffect(() => {
    const combinedResults = [
      ...carsMobilede.map((car) => ({
        ...car,
        platform: AdsPlatform.mobilede,
      })),
      ...carsLeboncoin.map((car) => ({
        ...car,
        platform: AdsPlatform.leboncoin,
      })),
      ...carsAutoscout.map((car) => ({
        ...car,
        platform: AdsPlatform.autoscout,
      })),
    ];
    setAllResults(combinedResults);
  }, [carsMobilede, carsLeboncoin, carsAutoscout]);

  useEffect(() => {
    const results = filterResultsByPlatform(allResults, activePlatform);
    setFilteredResults(results);
    setCurrentPage(1); // Reset to first page when platform changes
  }, [activePlatform, allResults]);

  const filterResultsByPlatform = (
    results: AllAdsInterface[],
    platform: AdsPlatform
  ) => {
    switch (platform) {
      case AdsPlatform.mobilede:
        return results.filter((car) => car.platform === AdsPlatform.mobilede);
      case AdsPlatform.leboncoin:
        return results.filter((car) => car.platform === AdsPlatform.leboncoin);
      case AdsPlatform.autoscout:
        return results.filter((car) => car.platform === AdsPlatform.autoscout);
      default:
        return results;
    }
  };

  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * ADS_PER_PAGE,
    currentPage * ADS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredResults.length / ADS_PER_PAGE);

  const setPlatform = (platform: AdsPlatform | AdsPlatform.allPlatforms) => {
    setActivePlatform(platform);
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    console.log("Chosen car to fetch: ", chosenCarToFetch);
    console.log("Active platform: ", activePlatform);
    console.log("carFilters: ", carFilters);
    if (chosenCarToFetch) {
      setOpenResults(true); // Open results view
      // Trigger fetching logic based on the chosen platform
      switch (activePlatform) {
        case AdsPlatform.mobilede:
          fetchCarsMobilede();
          break;
        case AdsPlatform.leboncoin:
          fetchCarsLeboncoin();
          break;
        case AdsPlatform.autoscout:
          fetchCarsAutoscout();
          break;
        default:
          fetchCarsMobilede();
          fetchCarsLeboncoin();
          fetchCarsAutoscout();

        // console.error("Invalid platform selected");
      }
    }
  }, [chosenCarToFetch, activePlatform]);
  return {
    loading: loadingMobilede || loadingLeboncoin || loadingAutoscout,
    error: errorMobilede || errorLeboncoin || errorAutoscout,
    allResults,
    setAllResults,
    filteredResults,
    setFilteredResults,
    setPlatform,
    openResults,
    setOpenResults,
    results,
    nextPage,
    previousPage,
    currentPage,
    totalPages,
    paginatedResults,
    seeAllUrlAutoscout,
    seeAllUrlLeboncoin,
    seeAllUrlMobilede,
    carsAutoscout,
    carsLeboncoin,
    carsMobilede,
  };
};

export default useSearchResults;
