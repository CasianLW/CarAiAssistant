// components/SelectMake.tsx
import React, { FC, useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { VehicleRecord } from "@/interfaces/vehicle-interface";
import useVehicleQuery from "@/hooks/use-vehicle-query";
// type Make = string;
// type Model = VehicleRecord;
const SelectMake: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTermModel, setSearchTermModel] = useState<string>("");

  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");

  const [makeSelectOpen, setMakeSelectOpen] = useState<boolean>(false);
  const [modelSelectOpen, setModelSelectOpen] = useState<boolean>(false);

  const [trigger, setTrigger] = useState(false);

  const { data, isLoading, refetch } = useVehicleQuery(
    searchTerm,
    false,
    trigger
  );

  const {
    data: modelData,
    isLoading: isLoadingModel,
    refetch: refetchModel,
  } = useVehicleQuery(selectedMake, true, trigger);

  useEffect(() => {
    setTrigger(true);
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      // Handle keyboard opening if necessary, or remove this listener if not needed
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      // Close dropdowns when the keyboard is closed
      setMakeSelectOpen(false);
      setModelSelectOpen(false);
    });

    // Cleanup function to remove the event listeners
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  // Use useMemo to filter unique makes
  const uniqueMakes: string[] = useMemo(() => {
    const makesSet = new Set<string>();
    data?.records.forEach((record) => makesSet.add(record.fields.make));
    const makesArray = Array.from(makesSet);
    makesArray.sort();
    return makesArray;
  }, [data]);

  // Use useMemo to filter models based on searchTermModel
  const filteredModels: string[] = useMemo(() => {
    const modelsArray =
      modelData?.records.map((model) => model.fields.model) ?? [];
    if (!searchTermModel.trim()) {
      modelsArray.sort();
      return modelsArray;
    }
    const filtered = modelsArray.filter((model) =>
      model.toLowerCase().includes(searchTermModel.toLowerCase())
    );
    filtered.sort();
    return filtered;
  }, [modelData, searchTermModel]);

  const handleSelectMake = (make: string) => {
    setSelectedMake(make);
    setTrigger(true);
    setSearchTermModel("");
    setSelectedModel("");
    setMakeSelectOpen(false);
    refetchModel();
  };
  const handleSelectModel = (model: string) => {
    setSelectedModel(model);
    setTrigger(true);

    setModelSelectOpen(false);
  };
  const handleReset = () => {
    setSearchTerm("");
    setSearchTermModel("");
    setSelectedMake("");
    setSelectedModel("");
    setMakeSelectOpen(false);
    setModelSelectOpen(false);
  };
  return (
    <View style={styles.container}>
      <TextInput
        onFocus={() => setMakeSelectOpen(true)}
        style={styles.input}
        placeholder="Enter car make"
        placeholderTextColor="gray"
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      {makeSelectOpen && (
        <FlatList
          data={uniqueMakes}
          keyExtractor={(item: string) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectMake(item)}
              style={styles.itemTouchable}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          style={styles.listContainer}
        />
      )}

      {selectedMake && (
        <View>
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              Selected Make: {selectedMake}
            </Text>
          </View>
          {/* <Text>Selected Make: {selectedMake}</Text> */}
          <TextInput
            onFocus={() => setModelSelectOpen(true)}
            style={styles.input}
            placeholder={`Enter a ${selectedMake} model`}
            placeholderTextColor="gray"
            onChangeText={setSearchTermModel}
            value={searchTermModel}
          />
          {modelSelectOpen && (
            <FlatList
              data={filteredModels}
              // keyExtractor={(item: Model) => item}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemTouchable}
                  onPress={() => handleSelectModel(item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isLoadingModel}
                  onRefresh={refetchModel}
                />
              }
              style={styles.listContainer}
            />
          )}
          {selectedModel && (
            <View style={styles.selectionInfo}>
              <Text style={styles.selectionText}>
                Selected Model: {selectedModel}
              </Text>
            </View>
          )}
          {selectedMake && selectedModel && (
            <TouchableOpacity onPress={handleReset} style={styles.resetLink}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: "80%",
    marginHorizontal: "auto",
  },
  input: {
    height: 48,
    marginHorizontal: 16, // Horizontal margin for the input
    marginBottom: 12, // Margin at the bottom of the input to space out the list
    borderWidth: 1,
    borderColor: "#ddd", // Light grey border for subtlety
    borderRadius: 8, // Rounded corners
    padding: 10, // Inner padding in the input field
    fontSize: 16, // Adequate font size for legibility
  },
  listContainer: {
    position: "absolute",
    top: 50,
    width: "100%",
    backgroundColor: "white",
    zIndex: 100,
    elevation: 1,
  },
  list: {
    paddingHorizontal: 16, // Padding on the sides of the list for alignment with the input
  },
  listItem: {
    backgroundColor: "#f9f9f9", // Slightly off-white background for list items
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee", // Very light border color for list item separation
  },
  itemText: {
    fontSize: 16,
    color: "#333", // Darker text color for contrast
  },
  itemTouchable: {
    padding: 10,
    backgroundColor: "#f8f8f8", // Slight background color for touch feedback
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  selectionInfo: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#e1e1e1",
    borderRadius: 5,
  },
  selectionText: {
    fontSize: 18,
    color: "#333",
  },
  resetLink: {
    marginTop: 10,
    alignItems: "center",
  },
  resetText: {
    color: "#0000ff",
    textDecorationLine: "underline",
  },
});

export default SelectMake;
