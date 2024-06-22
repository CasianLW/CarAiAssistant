import React, { FC } from "react";
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

const SearchResultsScreen: FC = () => {
  const {
    loading,
    error,
    filteredResults,
    setPlatform,
    openResults,
    setOpenResults,
    results,
    allResults,
  } = useSearchResults();

  const [activeFilter, setActiveFilter] = React.useState<AdsPlatform>(
    AdsPlatform.allPlatforms
  );

  const handleSetPlatform = (platform: AdsPlatform) => {
    setActiveFilter(platform);
    setPlatform(platform);
  };

  return (
    <View className="bg-app-blue-100" style={styles.container}>
      <NavSearch
        goBack={openResults ? () => setOpenResults(false) : undefined}
      />
      {openResults && filteredResults.length > 0 && (
        <View className="bg-app-blue-100  px-4 py-2 absolute top-32 right-0 z-20 rounded-l-xl ">
          <Text
            style={{ fontFamily: "UrbanistSemiBold600" }}
            className="text-app-white-200"
          >
            Voir rapport
          </Text>
        </View>
      )}
      <ScrollView className="h-full" style={globalStyles.searchContainer}>
        <Text style={globalStyles.title}>
          {openResults ? "Liste annonces:" : "Propositions modeles:"}
        </Text>

        {openResults ? (
          filteredResults.length > 0 ? (
            <AdsResultsComponent results={filteredResults} open={openResults} />
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
                onButton={() => setOpenResults(true)}
                car={result}
                key={`${result.makeId}-${result.modelId}-${index}`}
              />
            ))}
          </View>
        )}
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
});

export default SearchResultsScreen;
