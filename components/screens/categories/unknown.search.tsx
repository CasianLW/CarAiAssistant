import React, { useState, FC, useCallback } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import globalStyles from "@/styles/global.styles";
import { useNavigation } from "@react-navigation/native";
import NavSearch from "./nav.search";
import ChatStep from "./steps/chat.step";
import AdvancementBar from "./advancement-bar.component";
import FilterStep, { FilterData } from "./steps/filter.step";
import ButtonComponent from "@/components/general/button-component";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedTabParamList } from "@/components/tabs/sharedScreens";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/main-store";
import { apiProcessVehicleData } from "@/utils/api";
import {
  VehicleAiApiResponse,
  // VehicleAiResponse,
} from "@/interfaces/api-datas";
import { MobiledeCarCardProps } from "@/interfaces/mobilede-car";
import { validateApiResponse } from "@/helpers/validate-results-api-response.helper";

const SearchUnknownScreen: FC = () => {
  const { userData, isGuest } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<StackNavigationProp<SharedTabParamList>>();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [chatData, setChatData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const [filterData, setFilterData] = useState<FilterData>({
    minPrice: "",
    maxPrice: "",
    maxHp: "",
    minHp: "",
    maxKm: "",
    minKm: "",
    maxYear: "",
    minYear: "",
  });

  const steps = ["Chat", "Filter"];
  const processFinalData = async () => {
    setIsLoading(true);
    let filterDescriptions = [];
    for (const [key, value] of Object.entries(filterData)) {
      if (value) {
        filterDescriptions.push(`${key}: ${value}`);
      }
    }
    const filterString =
      filterDescriptions.length > 0
        ? ` Filters: ${filterDescriptions.join(", ")}`
        : "";
    const completePrompt = `${chatData}${filterString}`;

    try {
      const response = await apiProcessVehicleData({
        userId: userData?.userId || null,
        userLogged: !isGuest,
        prompt: completePrompt,
        // filters: filterData,
      });

      console.log("Response received:", response);

      const validResults = validateApiResponse(response.data);
      // console.log("Valid results:", response);
      if (validResults) {
        // console.log("Success:", response.data);
        const completeData = { ...validResults, filters: filterData };
        navigation.navigate("SearchResults", { results: completeData });
        setError("");
        setFilterData({
          minPrice: "",
          maxPrice: "",
          maxHp: "",
          minHp: "",
          maxKm: "",
          minKm: "",
          maxYear: "",
          minYear: "",
        });
        setChatData("");
        setCurrentStep(0);
      } else {
        // console.error("Invalid response structure:", response.data);
        setError("Le format de la réponse n'est pas celui attendu.");
        setIsErrorModalVisible(true);
      }
    } catch (error) {
      // console.error("Error processing data:", error);
      setIsErrorModalVisible(true);
      setError("Une erreur est survenue, réessayez.");
    } finally {
      setIsLoading(false);
    }
  };
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // console.log("Final data:", { chatData, filterData });
      // navigation.navigate("SearchResults");
      processFinalData();
    }
  };

  const buttonName =
    currentStep === steps.length - 1 ? "Lancer la recherche" : "Continuer";

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const isNextButtonDisabled = useCallback(() => {
    if (currentStep === 0) return !chatData;
    return false;
  }, [currentStep, chatData]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-app-blue-100">
        {isLoading && (
          <View style={globalStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={isErrorModalVisible}
          onRequestClose={() => setIsErrorModalVisible(false)}
        >
          <View style={globalStyles.modalCenteredView}>
            <View style={globalStyles.modalView}>
              <Text className="text-red-500">{error}</Text>
              <ButtonComponent
                title="Fermer"
                onPress={() => setIsErrorModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        <NavSearch goBack={goBack} />
        <View style={globalStyles.searchContainer}>
          <Text style={globalStyles.title}>Recherche par imagination:</Text>
          <AdvancementBar currentStep={currentStep} totalSteps={steps.length} />
          {currentStep === 0 && (
            <ChatStep chatData={chatData} setChatData={setChatData} />
          )}
          {currentStep === 1 && <FilterStep setFilterData={setFilterData} />}
          <ButtonComponent
            disabledAction={isNextButtonDisabled()}
            title={buttonName}
            onPress={nextStep}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchUnknownScreen;
