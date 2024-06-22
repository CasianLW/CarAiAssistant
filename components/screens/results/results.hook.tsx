import { useState, useEffect } from "react";
import {
  MobiledeCarCardProps,
  MobiledeResultsCarCardProps,
} from "@/interfaces/mobilede-car";
import { useFetchMobiledeCars } from "@/helpers/data-fetchers/mobilede/mobilede-ads";
import { useFetchLeboncoinCars } from "@/helpers/data-fetchers/leboncoin/leboncoin-ads";
import { useFetchAutoscoutCars } from "@/helpers/data-fetchers/leboncoin copy/autoscout-ads";

export enum AdsPlatform {
  mobilede = "mobilede",
  leboncoin = "leboncoin",
  autoscout = "autoscout",
  allPlatforms = "allPlatforms",
}

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
    switch (activePlatform) {
      case AdsPlatform.mobilede:
        setFilteredResults(
          allResults.filter((car) => car.platform === AdsPlatform.mobilede)
        );
        break;
      case AdsPlatform.leboncoin:
        setFilteredResults(
          allResults.filter((car) => car.platform === AdsPlatform.leboncoin)
        );
        break;
      case AdsPlatform.autoscout:
        setFilteredResults(
          allResults.filter((car) => car.platform === AdsPlatform.autoscout)
        );
        break;
      default:
        setFilteredResults(allResults);
    }
  }, [activePlatform, allResults]);

  const setPlatform = (platform: AdsPlatform | AdsPlatform.allPlatforms) => {
    setActivePlatform(platform);
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
  };
};

export default useSearchResults;
