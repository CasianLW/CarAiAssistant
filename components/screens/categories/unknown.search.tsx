import React, { useState, FC, useCallback } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import globalStyles from "@/styles/global.styles";
import { useNavigation } from "@react-navigation/native";
import NavSearch from "./nav.search";
import ChatStep from "./steps/chat.step";
import AdvancementBar from "./advancement-bar.component";
import FilterStep, { FilterData } from "./steps/filter.step";
import ButtonComponent from "@/components/general/button-component";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedTabParamList } from "@/components/tabs/sharedScreens";

const SearchUnknownScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<SharedTabParamList>>();

  const [currentStep, setCurrentStep] = useState<number>(0);
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

  const steps = ["Chat", "Filter"];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Final data:", { chatData, filterData });
      navigation.navigate("SearchResults");
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
        <NavSearch goBack={goBack} />
        <View style={globalStyles.searchContainer}>
          <Text style={globalStyles.title}>Recherche par imagination:</Text>
          <AdvancementBar currentStep={currentStep} totalSteps={steps.length} />
          {currentStep === 0 && <ChatStep setChatData={setChatData} />}
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
