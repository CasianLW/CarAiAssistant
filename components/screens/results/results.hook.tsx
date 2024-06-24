import { useState, useEffect } from "react";
import {
  MobiledeCarCardProps,
  MobiledeResultsCarCardProps,
} from "@/interfaces/mobilede-car";
import { useFetchMobiledeCars } from "@/helpers/data-fetchers/mobilede/mobilede-ads";
import { useFetchLeboncoinCars } from "@/helpers/data-fetchers/leboncoin/leboncoin-ads";
import { useFetchAutoscoutCars } from "@/helpers/data-fetchers/autoscout/autoscout-ads";

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
const useSearchResults = () => {
  const results: MobiledeCarCardProps[] = [
    {
      makeId: 1,
      make: "Toyota",
      modelId: 101,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
    {
      makeId: 1,
      make: "Toyota",
      modelId: 1011,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
    {
      makeId: 1,
      make: "Toyota",
      modelId: 1011,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
    {
      makeId: 1,
      make: "Toyota",
      modelId: 10211,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
    {
      makeId: 1,
      make: "Toyota",
      modelId: 10111,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
  ];

  const {
    loading: loadingMobilede,
    error: errorMobilede,
    cars: carsMobilede,
    fetchCars: fetchCarsMobilede,
  } = useFetchMobiledeCars({
    make: "Audi",
    model: "A4",
    maxYear: "2022",
    minPrice: "10000",
    maxPrice: "50000",
    minYear: "2018",
    maxKm: "80000",
    minKm: "5000",
    makeId: 1900,
    modelId: 9,
  });

  const {
    loading: loadingLeboncoin,
    error: errorLeboncoin,
    cars: carsLeboncoin,
    seeAllUrl: seeAllUrlLeboncoin,
    fetchCars: fetchCarsLeboncoin,
  } = useFetchLeboncoinCars({
    make: "AUDI",
    model: "A4",
    maxYear: "2022",
    minPrice: "10000",
    maxPrice: "50000",
    minYear: "2018",
    maxKm: "80000",
    minKm: "5000",
  });
  const {
    loading: loadingAutoscout,
    error: errorAutoscout,
    cars: carsAutoscout,
    seeAllUrl: seeAllUrlAutoscout,
    fetchCars: fetchCarsAutoscout,
  } = useFetchAutoscoutCars({
    make: "AUDI",
    model: "A4",
    maxYear: "2022",
    minPrice: "10000",
    maxPrice: "50000",
    minYear: "2018",
    maxKm: "80000",
    minKm: "5000",
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

  return {
    loading: loadingMobilede || loadingLeboncoin || loadingAutoscout,
    error: errorMobilede || errorLeboncoin || errorAutoscout,
    allResults,
    filteredResults,
    setPlatform,
    openResults,
    setOpenResults,
    results,
    nextPage,
    previousPage,
    currentPage,
    totalPages,
    paginatedResults,
  };
};

export default useSearchResults;
