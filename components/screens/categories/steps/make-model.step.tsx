import React, { useState, useEffect, FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropdownPicker from "react-native-dropdown-picker";
import {
  CarData,
  CarDataTypeEnum,
  MakesAndModels,
} from "@/interfaces/make-models";
import globalStyles from "@/styles/global.styles";

interface MakeModelStepProps {
  setCarData: (data: CarData) => void;
  setSearchType: (data: CarDataTypeEnum) => void;
  searchType: CarDataTypeEnum;
  carData?: CarData;
}

interface DropdownItem {
  label: string;
  value: string;
}

const makeModels: MakesAndModels = require("@/app/data/models-makes.json");

const MakeModelStep: FC<MakeModelStepProps> = ({
  setCarData,
  carData,
  setSearchType,
  searchType,
}) => {
  const [openMake, setOpenMake] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [selectedMakeId, setSelectedMakeId] = useState<string>(
    carData?.makeId ?? ""
  );
  const [selectedMakeTitle, setSelectedMakeTitle] = useState<string>(
    carData?.makeTitle ?? ""
  );
  const [selectedModelId, setSelectedModelId] = useState<string>(
    carData?.modelId ?? ""
  );
  const [selectedModelTitle, setSelectedModelTitle] = useState<string>(
    carData?.modelTitle ?? ""
  );
  const [makeItems, setMakeItems] = useState<DropdownItem[]>([]);
  const [modelItems, setModelItems] = useState<DropdownItem[]>([]);

  useEffect(() => {
    const sortedMakes = Object.values(makeModels).sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setMakeItems(
      sortedMakes.map((make) => ({ label: make.title, value: make.makeCode }))
    );
  }, []);

  //   useEffect(() => {
  //     if (selectedMakeId) {
  //       const models = makeModels[selectedMakeId]?.modelCodes || {};
  //       setModelItems(
  //         Object.entries(models).map(([code, name]) => ({
  //           label: name,
  //           value: code,
  //         }))
  //       );
  //       //   setSelectedModelId(null);
  //       //   setSelectedModelTitle(null);
  //     }
  //   }, [selectedMakeId]);

  useEffect(() => {
    if (selectedMakeId) {
      const models = makeModels[selectedMakeId]?.modelCodes || {};
      setModelItems(
        Object.entries(models).map(([code, name]) => ({
          label: name,
          value: code,
        }))
      );
      // Reset the selected model on make change
      //   setSelectedModelId("");
      //   setSelectedModelTitle("");
    }
  }, [selectedMakeId]);

  // Update useEffect to reflect changes in model selection
  useEffect(() => {
    if (selectedMakeId || selectedModelId) {
      setCarData({
        makeId: selectedMakeId,
        makeTitle: selectedMakeTitle,
        modelId: selectedModelId,
        modelTitle: selectedModelTitle,
      });
    }
  }, [selectedMakeId, selectedModelId, selectedMakeTitle, selectedModelTitle]);

  const handleMakeChange = (value: any) => {
    const make = makeItems.find((item) => item.value === value);
    if (make) {
      setSelectedMakeId(value);
      setSelectedMakeTitle(make.label);
      // Reset model selection
      setSelectedModelId("");
      setSelectedModelTitle("");
    }
  };

  // Simplified onChangeValue for Models
  const handleModelChange = (value: any) => {
    const model = modelItems.find((item) => item.value === value);
    if (model) {
      setSelectedModelId(value);
      setSelectedModelTitle(model.label);
    }
  };

  useEffect(() => {
    setSearchType(searchType); // Assuming setSearchType updates a higher-level state
  }, [searchType]);

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.subtitle]}>
        Sélectionnez la marque et le modèle du véhicule qui vous intéresse:
      </Text>
      <Text style={styles.label}>Séléctionnez une marque:</Text>
      <DropdownPicker
        open={openMake}
        value={selectedMakeId}
        items={makeItems}
        // setOpen={setOpenMake}
        setOpen={(open) => {
          setOpenMake(open);
          setOpenModel(false);
        }}
        setValue={(value) => {
          value && setSelectedMakeId(value);
          setSelectedModelId("");
          setSelectedModelTitle("");
        }}
        onChangeValue={handleMakeChange}
        searchable={true}
        placeholder="Sélectionnez une marque..."
        zIndex={3000}
        zIndexInverse={1000}
        style={styles.dropdownStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        searchTextInputStyle={styles.searchTextInputStyle}
        searchPlaceholder="Rechercher une marque..."
        //itemStyle={styles.itemStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        translation={{
          NOTHING_TO_SHOW: "Aucune marque trouvée",
        }}
      />
      <Text style={styles.label}>Séléctionnez un modèle:</Text>
      <DropdownPicker
        open={openModel}
        value={selectedModelId}
        items={modelItems}
        // setOpen={setOpenModel}
        setOpen={(open) => {
          setOpenModel(open);
          setOpenMake(false);
        }}
        setValue={(value) => {
          setSelectedModelId(value);
          const model = modelItems.find(
            (item) => item.value === selectedModelId
            // (item) => item.value === selectedModelId
          );
          setSelectedModelTitle(model?.label || "");
          setCarData({
            makeId: selectedMakeId ?? "",
            makeTitle: selectedMakeTitle ?? "",
            modelId: selectedModelId ?? "",
            modelTitle: selectedModelTitle || "",
          });
        }}
        onChangeValue={handleModelChange}
        searchable={true}
        placeholder="Sélectionnez un modèle..."
        disabled={!selectedMakeId}
        zIndex={2000}
        zIndexInverse={2000}
        style={styles.dropdownStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        searchTextInputStyle={styles.searchTextInputStyle}
        searchPlaceholder="Rechercher un modèle..."
        //itemStyle={styles.itemStyle}
        translation={{
          NOTHING_TO_SHOW: "Aucun modèle trouvé",
        }}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />

      {/* <Text>{selectedMakeId + "-" + selectedMakeTitle} </Text>
      <Text>{selectedModelId + "-" + selectedModelTitle} </Text>
      <Text>{carData?.makeId + "-" + carData?.makeTitle} </Text>
      <Text>{carData?.modelId + "-" + carData?.modelTitle} </Text> */}

      <View className="my-4">
        <Text className="mb-2" style={styles.filterText}>
          Rechercher par:
        </Text>

        <RadioButton
          label={"Modéle semblable"}
          value={CarDataTypeEnum.ALIKE}
          onPress={() => setSearchType(CarDataTypeEnum.ALIKE)}
          selectedValue={searchType}
        />
        <RadioButton
          label={"Modèle gamme supérieure "}
          value={CarDataTypeEnum.HIGHER}
          onPress={() => setSearchType(CarDataTypeEnum.HIGHER)}
          selectedValue={searchType}
        />
        <RadioButton
          label={"Modèle gamme inférieure"}
          value={CarDataTypeEnum.LOWER}
          onPress={() => setSearchType(CarDataTypeEnum.LOWER)}
          selectedValue={searchType}
        />
        <RadioButton
          label={"Autre (Spécifier à la prochaine étape)"}
          value={CarDataTypeEnum.OTHER}
          onPress={() => setSearchType(CarDataTypeEnum.OTHER)}
          selectedValue={searchType}
        />
      </View>
    </View>
  );
};

export default MakeModelStep;

interface RadioButtonProps {
  label: string;
  value: CarDataTypeEnum;
  onPress: (value: CarDataTypeEnum) => void;
  selectedValue: CarDataTypeEnum;
}

const RadioButton: FC<RadioButtonProps> = ({
  label,
  value,
  onPress,
  selectedValue,
}) => {
  return (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={() => onPress(value)}
    >
      <View
        style={[
          styles.outerCircle,
          selectedValue === value && styles.selectedOuterCircle,
        ]}
      >
        {selectedValue === value && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterText: {
    fontSize: 20,
    fontFamily: "UrbanistSemiBold600",
  },
  container: {
    marginTop: 20,
    // padding: 20,
  },
  label: {
    marginTop: 12,
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "UrbanistSemiBold600",
  },
  dropdownStyle: {
    backgroundColor: "#EBF2FF", // Light blue background
    borderColor: "#337AFF", // Border color
    borderWidth: 1, // Border width
    borderRadius: 12, // Rounded corners
    color: "#000", // Text color inside the dropdown
    paddingHorizontal: 10, // Horizontal padding
    paddingVertical: 8, // Vertical padding
  },
  placeholderStyle: {
    color: "#666", // Lighter text color for placeholder
  },
  labelStyle: {
    color: "#000", // Text color
  },
  itemStyle: {
    justifyContent: "flex-start", // Align items to the left
  },
  dropDownContainerStyle: {
    backgroundColor: "#EBF2FF", // Background of the dropdown items
    borderColor: "#EBF2FF", // Border color of the dropdown container
    borderWidth: 1, // Border width of the dropdown container
    borderRadius: 12, // Border radius of the dropdown container
  },
  searchTextInputStyle: {
    borderColor: "#337AFF", // Border color of the search input
  },
  itemSeparatorStyle: {
    borderColor: "#337AFF",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#337AFF", // Normal border color
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedOuterCircle: {
    borderColor: "#1D68E3", // Change to a more noticeable color when selected
    borderWidth: 3, // Optional: make the border slightly thicker on selection
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#337AFF",
  },
  radioText: {
    fontSize: 18,
    color: "#000",
  },
  radioGroup: {
    marginTop: 10,
  },
});
