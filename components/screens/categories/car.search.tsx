import React, { useState, FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import globalStyles from "@/styles/global.styles";
import { useNavigation } from "@react-navigation/native";
import NavSearch from "./nav.search";
import ChatStep from "./steps/chat.step";
import AdvancementBar from "./advancement-bar.component";
import FilterStep, { FilterData } from "./steps/filter.step";
import MakeModelStep from "./steps/make-model.step";
import ButtonComponent from "@/components/general/button-component";
export interface CarData {
  makeId: string;
  makeTitle: string;
  modelId: string;
  modelTitle: string;
}

const SearchCarScreen: FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [carData, setCarData] = useState<CarData>({
    makeId: "",
    makeTitle: "",
    modelId: "",
    modelTitle: "",
  });
  // const [carData, setCarData] = useState<{ make: string; model: string }>({
  //   make: "",
  //   model: "",
  // });
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

  const steps = ["MakeModel", "Filter", "Chat"];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Final data:", { carData, filterData, chatData });
    }
  };

  const isNextButtonDisabled =
    (currentStep === 0 && (!carData.makeTitle || !carData.modelTitle)) ||
    // (currentStep === 1 && (!filterData.minPrice || !filterData.maxPrice)) ||
    (currentStep === 2 && !chatData);

  const buttonName =
    currentStep === steps.length - 1 ? "Lancer la recherche" : "Continuer";

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-app-blue-100">
        <NavSearch goBack={goBack} />
        <View style={globalStyles.searchContainer}>
          <Text style={globalStyles.title}>Recherche par voiture:</Text>
          <AdvancementBar currentStep={currentStep} totalSteps={steps.length} />
          {currentStep === 0 && (
            <MakeModelStep setCarData={setCarData} carData={carData} />
          )}
          {currentStep === 1 && <FilterStep setFilterData={setFilterData} />}
          {currentStep === 2 && <ChatStep setChatData={setChatData} />}
          <ButtonComponent
            title={buttonName}
            onPress={nextStep}
            disabledAction={isNextButtonDisabled}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchCarScreen;
