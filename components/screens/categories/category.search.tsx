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
import ChatStep, { ChatStepType } from "./steps/chat.step";
import AdvancementBar from "./advancement-bar.component";
import FilterStep, { FilterData } from "./steps/filter.step";
import CategoryStep from "./steps/category.step";
import ButtonComponent from "@/components/general/button-component";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedTabParamList } from "@/components/tabs/sharedScreens";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/main-store";
import { apiProcessVehicleData } from "@/utils/api";
import { VehicleAiApiResponse } from "@/interfaces/api-datas";
import { MobiledeCarCardProps } from "@/interfaces/mobilede-car";
import { validateApiResponse } from "@/helpers/validate-results-api-response.helper";

const SearchCategoryScreen: FC = () => {
  const { userData, isGuest } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<StackNavigationProp<SharedTabParamList>>();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<string>("");
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

  const steps = ["Category", "Chat", "Filter"];

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
    const completePrompt = `Recherche moi strictement des ${categoryData}. ${chatData}${filterString}`;

    try {
      const response = await apiProcessVehicleData({
        userId: userData?.userId || null,
        userLogged: !isGuest,
        prompt: completePrompt,
      });

      // console.log("Response received:", response);

      const validResults = validateApiResponse(response.data);
      if (validResults) {
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
        setCategoryData("");
        setCurrentStep(0);
      } else {
        // console.error("Invalid response structure:", response.data);
        setError("Le format de la réponse n'est pas celui attendu, réessayez.");
        setIsErrorModalVisible(true);
      }
    } catch (error) {
      // console.error("Error processing data:", error);
      setError("Une erreur est survenue, réessayez.");
      setIsErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
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
    if (currentStep === 0) return !categoryData;
    if (currentStep === 1) return !chatData;
    return false;
  }, [currentStep, categoryData, chatData]);

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
          <Text style={globalStyles.title}>Recherche par catégorie:</Text>
          <AdvancementBar currentStep={currentStep} totalSteps={steps.length} />
          {currentStep === 0 && (
            <CategoryStep setCategoryData={setCategoryData} />
          )}
          {currentStep === 1 && (
            <ChatStep
              chatType={ChatStepType.CATEGORY}
              chatData={chatData}
              setChatData={setChatData}
            />
          )}
          {currentStep === 2 && (
            <FilterStep filterData={filterData} setFilterData={setFilterData} />
          )}
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

export default SearchCategoryScreen;
