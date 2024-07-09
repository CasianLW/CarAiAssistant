import InputComponent from "@/components/general/input-component";
import globalStyles from "@/styles/global.styles";
import React, { FC, useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export interface FilterData {
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  minKm: string;
  maxKm: string;
  minHp: string;
  maxHp: string;
}

interface FilterStepProps {
  setFilterData: (data: FilterData) => void;
  filterData: FilterData;
}

const FilterStep: FC<FilterStepProps> = ({ setFilterData, filterData }) => {
  const [filter, setFilter] = useState<FilterData>(
    filterData || {
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
      minKm: "",
      maxKm: "",
      minHp: "",
      maxHp: "",
    }
  );

  const handleInputChange = (name: keyof FilterData, value: string) => {
    const updatedFilters = { ...filter, [name]: value };
    setFilter(updatedFilters);
    setFilterData(updatedFilters); // Optionally update on each change or only on submit
  };

  return (
    <View>
      <Text className="mt-8" style={globalStyles.subtitle}>
        Affiner vos préférences grâce a nos filtres ou continuez directement
      </Text>
      <View style={styles.inputGroup}>
        <Text style={styles.filterText}>Prix (€):</Text>
        <View style={styles.inputTextGroup}>
          <InputComponent
            number={true}
            value={filter.minPrice}
            onChangeText={(value) => handleInputChange("minPrice", value)}
            placeholder="Min..."
            style={styles.input}
          />
          <InputComponent
            number={true}
            value={filter.maxPrice}
            onChangeText={(value) => handleInputChange("maxPrice", value)}
            placeholder="Max..."
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.filterText}>Année:</Text>
        <View style={styles.inputTextGroup}>
          <InputComponent
            number={true}
            value={filter.minYear}
            onChangeText={(value) => handleInputChange("minYear", value)}
            placeholder="Min..."
            style={styles.input}
          />
          <InputComponent
            number={true}
            value={filter.maxYear}
            onChangeText={(value) => handleInputChange("maxYear", value)}
            placeholder="Max..."
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.filterText}>Kilometrage:</Text>
        <View style={styles.inputTextGroup}>
          <InputComponent
            number={true}
            value={filter.minKm}
            onChangeText={(value) => handleInputChange("minKm", value)}
            placeholder="Min..."
            style={styles.input}
          />
          <InputComponent
            number={true}
            value={filter.maxKm}
            onChangeText={(value) => handleInputChange("maxKm", value)}
            placeholder="Max..."
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.filterText}>Chevaux (ch):</Text>
        <View style={styles.inputTextGroup}>
          <InputComponent
            number={true}
            value={filter.minHp}
            onChangeText={(value) => handleInputChange("minHp", value)}
            placeholder="Min..."
            style={styles.input}
          />
          <InputComponent
            number={true}
            value={filter.maxHp}
            onChangeText={(value) => handleInputChange("maxHp", value)}
            placeholder="Max..."
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // marginVertical: 10,
    marginTop: 8,
  },
  input: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    // padding: 8,
    width: "48%",
    // textAlign: "center",
  },
  inputTextGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  filterText: {
    fontSize: 20,
    fontFamily: "UrbanistSemiBold600",
    // color: "#337AFF",
  },
});

export default FilterStep;
