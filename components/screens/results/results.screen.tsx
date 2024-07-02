import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import NavSearch from "../categories/nav.search";
import globalStyles from "@/styles/global.styles";
import AdsResultsComponent from "./components/ads-results.component";
import AiResultCardComponent from "./components/ai-result-card.component";
import useSearchResults, { AdsPlatform } from "./results.hook";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SharedTabParamList } from "@/components/tabs/sharedScreens";
import ButtonComponent from "@/components/general/button-component";
import { MobiledeCarCardProps } from "@/interfaces/mobilede-car";
import { openURI } from "@/helpers/open-uri";
import { apiRapportData } from "@/utils/api";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/main-store";
import { RapportPayloadData } from "@/interfaces/api-datas";

type SearchResultsRouteProp = RouteProp<SharedTabParamList, "SearchResults">;

const SearchResultsScreen: FC = () => {
  const { userData, isGuest } = useSelector((state: RootState) => state.auth);
  const route = useRoute<SearchResultsRouteProp>();
  const { results: apiResponse } = route.params ?? { results: null };
  const [chosenCarToFetch, setChosenCarToFetch] =
    useState<MobiledeCarCardProps | null>(null);
  const [reportVisible, setReportVisible] = useState(false);
  const [reportData, setReportData] = useState(null);

  const {
    loading,
    error,
    filteredResults,
    setPlatform,
    openResults,
    setOpenResults,
    results,
    allResults,
    setAllResults,
    setFilteredResults,
    totalPages,
    nextPage,
    previousPage,
    currentPage,
    paginatedResults,
    seeAllUrlMobilede,
    seeAllUrlLeboncoin,
    seeAllUrlAutoscout,
    carsAutoscout,
    carsLeboncoin,
    carsMobilede,
  } = useSearchResults(
    apiResponse?.data.vehicles || [],
    chosenCarToFetch,
    apiResponse?.filters || {
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
      minKm: "",
      maxKm: "",
      minHp: "",
      maxHp: "",
    }
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const [activeFilter, setActiveFilter] = React.useState<AdsPlatform>(
    AdsPlatform.allPlatforms
  );

  const handleGoBack = () => {
    setReportData(null);
    setOpenResults(false);
    setAllResults([]);
    setFilteredResults([]);
  };

  const handleSetPlatform = (platform: AdsPlatform) => {
    setActiveFilter(platform);
    setPlatform(platform);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const handleNextPage = () => {
    nextPage();
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const handlePreviousPage = () => {
    previousPage();
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };
  const fetchReportData = async () => {
    if (!chosenCarToFetch || isGuest || !userData) return;
    const rapportData: RapportPayloadData = {
      userId: userData.userId,
      userLogged: !isGuest,
      vehicleData: chosenCarToFetch,
    };
    try {
      console.log("Rapport data:", rapportData);
      const response = await apiRapportData(rapportData);

      console.log("Rapport data:", response.data);
      setReportData(response.data);
      setReportVisible(true);
    } catch (error) {
      console.error("Failed to fetch report:", error);
      // Handle errors (e.g., show a message)
    }
  };
  const handleReport = () => {
    if (!reportData) {
      fetchReportData();
    } else if (!reportVisible) {
      setReportVisible(false);
    } else if (reportVisible) {
      setReportVisible(true);
    }
  };
  return (
    <View className="bg-app-blue-100" style={styles.container}>
      <NavSearch goBack={openResults ? () => handleGoBack() : undefined} />

      {openResults && filteredResults.length > 0 && (
        <TouchableOpacity
          className="bg-app-blue-100  px-4 py-2 absolute top-32 right-0 z-20 rounded-l-xl "
          onPress={handleReport}
        >
          <Text
            style={{ fontFamily: "UrbanistSemiBold600" }}
            className="text-app-white-200"
          >
            Voir rapport
          </Text>
        </TouchableOpacity>
      )}
      <ScrollView
        className="h-full"
        style={globalStyles.searchContainer}
        ref={scrollViewRef}
      >
        <Text style={globalStyles.title}>
          {openResults ? "Liste annonces:" : "Propositions modeles:"}
        </Text>

        {openResults ? (
          paginatedResults.length > 0 ? (
            <AdsResultsComponent
              results={paginatedResults}
              open={openResults}
            />
          ) : (
            <View style={styles.noAdsContainer}>
              <Text
                style={{ fontFamily: "UrbanistSemiBold600" }}
                className="text-app-black-200 text-xl"
              >
                No ads found
              </Text>
            </View>
          )
        ) : (
          <View className="mb-40">
            {results.map((result, index) => (
              <AiResultCardComponent
                onFetch={setChosenCarToFetch}
                // onFetch={() => setOpenResults(true)}
                car={result}
                key={`${result.makeId}-${result.modelId}-${index}`}
              />
            ))}
          </View>
        )}

        {openResults && filteredResults.length > 25 && (
          <View className="flex flex-row justify-between  items-center mb-4">
            <TouchableOpacity
              onPress={handlePreviousPage}
              disabled={currentPage === 1}
              style={[
                styles.paginationButton,
                currentPage === 1 && styles.disabledPaginationButton,
              ]}
            >
              <Text className="text-app-white-100 font-semibold">
                Precedent
              </Text>
            </TouchableOpacity>
            <Text className="text-app-black-200 font-semibold">
              Page {currentPage} / {totalPages}
            </Text>
            <TouchableOpacity
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
              style={[
                styles.paginationButton,
                currentPage === totalPages && styles.disabledPaginationButton,
              ]}
            >
              <Text className="text-app-white-100 font-semibold">Suivant</Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="mb-40 ">
          {openResults && seeAllUrlMobilede && carsMobilede.length > 0 && (
            <ButtonComponent
              title="Voir tout mobile.de"
              onPress={() => openURI(seeAllUrlMobilede)}
            />
          )}
          {openResults && seeAllUrlLeboncoin && carsLeboncoin.length > 0 && (
            <View>
              <ButtonComponent
                title="Voir tout leboncoin"
                onPress={() => openURI(seeAllUrlLeboncoin)}
              />
              {/* <Text>Leboncoin: {seeAllUrlLeboncoin}</Text> */}
            </View>
          )}
          {openResults && seeAllUrlAutoscout && carsAutoscout.length > 0 && (
            <ButtonComponent
              title="Voir tout autoscout"
              onPress={() => openURI(seeAllUrlAutoscout)}
            />
          )}
        </View>
      </ScrollView>

      {openResults && (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            onPress={() => handleSetPlatform(AdsPlatform.allPlatforms)}
            style={[
              styles.filterButton,
              activeFilter === AdsPlatform.allPlatforms && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === AdsPlatform.allPlatforms &&
                  styles.activeFilterText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSetPlatform(AdsPlatform.leboncoin)}
            style={[
              styles.filterButton,
              activeFilter === AdsPlatform.leboncoin && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === AdsPlatform.leboncoin &&
                  styles.activeFilterText,
              ]}
            >
              Leboncoin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSetPlatform(AdsPlatform.mobilede)}
            style={[
              styles.filterButton,
              activeFilter === AdsPlatform.mobilede && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === AdsPlatform.mobilede &&
                  styles.activeFilterText,
              ]}
            >
              Mobile.de
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSetPlatform(AdsPlatform.autoscout)}
            style={[
              styles.filterButton,
              activeFilter === AdsPlatform.autoscout && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === AdsPlatform.autoscout &&
                  styles.activeFilterText,
              ]}
            >
              Autoscout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(51, 122, 255, 0.5)",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  filterText: {
    color: "white",
    fontWeight: "bold",
  },
  activeFilter: {
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  activeFilterText: {
    color: "#000",
  },
  noAdsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  // Pagination
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginBottom: 92,
  },
  paginationButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#337AFF",
    borderRadius: 5,
  },
  disabledPaginationButton: {
    backgroundColor: "#ccc",
  },
});

export default SearchResultsScreen;
