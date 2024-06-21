import React, { FC } from "react";
import { View, Text, ScrollView } from "react-native";
import NavSearch from "../categories/nav.search";
import globalStyles from "@/styles/global.styles";
import AdsResultsComponent from "./components/ads-results.component";
import AiResultCardComponent from "./components/ai-result-card.component";
import useSearchResults from "./results.hook";

const SearchResultsScreen: FC = () => {
  const {
    loading,
    error,
    cars,
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
  } = useSearchResults();

  return (
    <View className="bg-app-blue-100">
      <NavSearch
        goBack={openResults ? () => setOpenResults(false) : undefined}
      />

      <ScrollView className="h-full" style={globalStyles.searchContainer}>
        <Text style={globalStyles.title}>
          {openResults ? "Liste annonces:" : "Propositions modeles:"}
        </Text>
        {openResults ? (
          <AdsResultsComponent results={cars} open={openResults} />
        ) : (
          <View className="mb-40">
            {results.map((result, index) => (
              <AiResultCardComponent
                onButton={() => setOpenResults(true)}
                car={result}
                key={`${result.makeId}-${result.modelId}-${index}`}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchResultsScreen;
