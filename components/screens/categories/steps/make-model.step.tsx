import React, { useState, useEffect, FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropdownPicker from "react-native-dropdown-picker";
import { MakesAndModels } from "@/interfaces/make-models";
import globalStyles from "@/styles/global.styles";
import { CarData } from "../car.search";

interface MakeModelStepProps {
  setCarData: (data: CarData) => void;
  carData?: CarData;
}

interface DropdownItem {
  label: string;
  value: string;
}

const makeModels: MakesAndModels = require("@/app/data/models-makes.json");

const MakeModelStep: FC<MakeModelStepProps> = ({ setCarData, carData }) => {
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
  return (
    <View className="z-20 mb-20" style={styles.container}>
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
        placeholder="Séléctionnez une marque..."
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
        placeholder="Séléctionnez un modèle..."
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // padding: 20,
  },
  label: {
    marginTop: 20,
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
    borderColor: "#337AFF", // Border color of the dropdown container
    borderWidth: 1, // Border width of the dropdown container
    borderRadius: 12, // Border radius of the dropdown container
  },
  searchTextInputStyle: {
    borderColor: "#337AFF", // Border color of the search input
  },
  itemSeparatorStyle: {
    borderColor: "#337AFF",
  },
});

export default MakeModelStep;