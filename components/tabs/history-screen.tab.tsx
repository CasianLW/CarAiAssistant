import React, { FC, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import NavSearch from "../screens/categories/nav.search";
import globalStyles from "@/styles/global.styles";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/main-store";
import { apiFetchAllHistory } from "@/utils/api";
import { HistoryItem } from "@/interfaces/history.interface";
import { trimStringByKeywords } from "@/helpers/string-converters/trim-history-prompt.helper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonComponent from "../general/button-component";
import { VehicleAiData } from "@/interfaces/api-datas";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedTabParamList } from "./sharedScreens";
import {
  historyResponseToVehicleAiData,
  parseHistoryResponse,
} from "@/helpers/string-converters/parse-history-response.helper";

const HistoryScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<SharedTabParamList>>();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const jwtToken = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userData?.userId);

  useFocusEffect(
    useCallback(() => {
      if (userId && jwtToken) {
        apiFetchAllHistory(userId, jwtToken)
          .then((data) => {
            setHistory(
              data.map((item) => ({
                ...item,
                prompt: trimStringByKeywords(item.prompt),
              }))
            );
          })
          .catch((err) => console.error(err.message));
      }
    }, [userId, jwtToken])
  );

  // Calculate current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  function voirResultats(completeData: any) {
    navigation.navigate("SearchResults", { results: completeData });
  }

  const renderVehicleDetails = (response: string) => {
    const historyResponse = parseHistoryResponse(response);
    if (!historyResponse) return <Text>Invalid data</Text>;

    return (
      <View>
        {historyResponse.vehicles.map((vehicle, i) => (
          <Text className="px-2" key={vehicle.modelId + i}>
            {vehicle.make} - {vehicle.model} -{vehicle.year} - {vehicle.price}€~
          </Text>
        ))}
      </View>
    );
  };

  return (
    <ScrollView className="bg-app-blue-100">
      <NavSearch />
      <View style={globalStyles.searchContainer}>
        <Text style={globalStyles.title}>Votre historique:</Text>
        <View>
          {currentItems.map((entry, i) => (
            <View
              className="border   border-app-blue-100 mb-2 rounded-2xl w-full"
              key={entry._id + i}
            >
              <View className="bg-app-blue-100 py-2 rounded-t-xl flex flex-row justify-between border-b border-app-blue-bg-app-blue-100">
                <Text className="w-fit pl-2 text-app-white-100">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </Text>

                <Text className="w-fit pr-2 text-app-white-100">
                  {new Date(entry.createdAt).toLocaleTimeString()}
                </Text>
              </View>
              <Text className="px-2 font-bold mt-1">Recherche:</Text>

              <Text className="px-2">{trimStringByKeywords(entry.prompt)}</Text>
              <Text className="px-2 font-bold mt-2">Résultats:</Text>
              {renderVehicleDetails(entry.response)}
              <ButtonComponent
                style={{ marginHorizontal: 8 }}
                onPress={() =>
                  voirResultats(
                    historyResponseToVehicleAiData(
                      parseHistoryResponse(entry.response)
                    )
                  )
                }
                title="Voir tout"
              />
            </View>
          ))}
        </View>
        <View style={styles.pagination}>
          <Button
            title="Prev"
            onPress={() => setCurrentPage((p) => (p > 1 ? p - 1 : 1))}
            disabled={currentPage === 1}
          />
          <Text>Page {currentPage}</Text>
          <Button
            title="Next"
            onPress={() =>
              setCurrentPage((p) =>
                p < Math.ceil(history.length / itemsPerPage) ? p + 1 : p
              )
            }
            disabled={currentPage === Math.ceil(history.length / itemsPerPage)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  historyItem: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
