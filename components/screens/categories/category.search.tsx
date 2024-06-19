import React, { useState, FC, useEffect, useCallback } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import globalStyles from "@/styles/global.styles";
import { useNavigation } from "@react-navigation/native";
import NavSearch from "./nav.search";
import ChatStep from "./steps/chat.step";
import AdvancementBar from "./advancement-bar.component";
import FilterStep, { FilterData } from "./steps/filter.step";
import CategoryStep from "./steps/category.step";
import ButtonComponent from "@/components/general/button-component";

const SearchCategoryScreen: FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<string>("");
  const [chatData, setChatData] = useState<string>("");
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

  const navigation = useNavigation();

  const steps = ["Category", "Filter", "Chat"];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Final data:", { categoryData, filterData, chatData });
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
    // if (currentStep === 1) return !filterData.minPrice || !filterData.maxPrice;
    if (currentStep === 2) return !chatData;
    return false;
  }, [currentStep, categoryData, chatData]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-app-blue-100">
        <NavSearch goBack={goBack} />
        <View style={globalStyles.searchContainer}>
          <Text style={globalStyles.title}>Recherche par catégorie:</Text>
          <AdvancementBar currentStep={currentStep} totalSteps={steps.length} />
          {currentStep === 0 && (
            <CategoryStep setCategoryData={setCategoryData} />
          )}
          {currentStep === 1 && <FilterStep setFilterData={setFilterData} />}
          {currentStep === 2 && <ChatStep setChatData={setChatData} />}
          <ButtonComponent
            title={buttonName}
            onPress={nextStep}
            disabledAction={isNextButtonDisabled()}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchCategoryScreen;
