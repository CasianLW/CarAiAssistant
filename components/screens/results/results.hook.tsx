import { useState, useEffect } from "react";
import {
  MobiledeCarCardProps,
  MobiledeResultsCarCardProps,
} from "@/interfaces/mobilede-car";
import { useFetchMobiledeCars } from "@/helpers/data-fetchers/mobilede/mobilede-ads";
import { useFetchLeboncoinCars } from "@/helpers/data-fetchers/leboncoin/leboncoin-ads";

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

  const { loading, error, cars, seeAllUrl, fetchCars } = useFetchMobiledeCars({
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

  const [activeAdsResults, setActiveAdsResults] = useState<
    MobiledeResultsCarCardProps[]
  >([]);
  const [openResults, setOpenResults] = useState(false);

  useEffect(() => {
    if (openResults) {
      fetchCars();
      // fetchCarsLeboncoin();
    }
  }, [openResults]);

  return {
    loading,
    error,
    cars,
    seeAllUrl,
    fetchCars,
    loadingLeboncoin,
    errorLeboncoin,
    carsLeboncoin,
    seeAllUrlLeboncoin,
    fetchCarsLeboncoin,
    activeAdsResults,
    setActiveAdsResults,
    openResults,
    setOpenResults,
    results,
  };
};

export default useSearchResults;
