import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import globalStyles from "@/styles/global.styles";

interface CategoryStepProps {
  setCategoryData: (data: string) => void;
}

const categories = [
  {
    name: "4x4, SUV",
    image: require("@/assets/images/app-ressources/homepage/car-search.png"),
  },
  {
    name: "Berline",
    image: require("@/assets/images/app-ressources/homepage/car-search.png"),
  },
  {
    name: "Break",
    image: require("@/assets/images/app-ressources/homepage/car-search.png"),
  },
  {
    name: "Cabriolet",
    image: require("@/assets/images/app-ressources/homepage/car-search.png"),
  },
  {
    name: "Citadine",
    image: require("@/assets/images/app-ressources/homepage/car-search.png"),
  },
  {
    name: "Coupé",
    image: require("@/assets/images/app-ressources/homepage/car-search.png"),
  },
  {
    name: "Monospace",
    image: require("@/assets/images/app-ressources/homepage/car-search.png"),
  },
  {
    name: "Van",
    image: require("@/assets/images/app-ressources/homepage/car-search.png"),
  },
  {
    name: "Autre",
    image: require("@/assets/images/app-ressources/homepage/car-search.png"),
  },
  //   { name: "4x4, SUV", image: require("@/assets/images/categories/4x4-suv.png") },
  //   { name: "Berline", image: require("@/assets/images/categories/berline.png") },
  //   { name: "Break", image: require("@/assets/images/categories/break.png") },
  //   { name: "Cabriolet", image: require("@/assets/images/categories/cabriolet.png") },
  //   { name: "Citadine", image: require("@/assets/images/categories/citadine.png") },
  //   { name: "Coupé", image: require("@/assets/images/categories/coupe.png") },
  //   { name: "Monospace", image: require("@/assets/images/categories/monospace.png") },
  //   { name: "Van", image: require("@/assets/images/categories/van.png") },
  //   { name: "Autre", image: require("@/assets/images/categories/autre.png") },
];

const CategoryStep: FC<CategoryStepProps> = ({ setCategoryData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [animations, setAnimations] = useState<{
    [key: string]: Animated.Value;
  }>({});

  useEffect(() => {
    const anims: { [key: string]: Animated.Value } = {};
    categories.forEach((category) => {
      anims[category.name] = new Animated.Value(0);
    });
    setAnimations(anims);
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCategoryData(category);

    categories.forEach((cat) => {
      if (animations[cat.name]) {
        Animated.timing(animations[cat.name], {
          toValue: cat.name === category ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    });
  };

  return (
    <View>
      <Text style={globalStyles.subtitle}>
        Choisissez le type de véhicules qui vous intéresse
      </Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category) => {
          const backgroundColor = animations[category.name]
            ? animations[category.name].interpolate({
                inputRange: [0, 1],
                outputRange: ["#FFF", "#337AFF"], // From white to light blue
              })
            : "#FFF";

          const textColor = animations[category.name]
            ? animations[category.name].interpolate({
                inputRange: [0, 1],
                outputRange: ["#337AFF", "#FFF"], // From blue to white
              })
            : "#337AFF";

          return (
            <TouchableOpacity
              key={category.name}
              onPress={() => handleCategorySelect(category.name)}
            >
              <Animated.View style={[styles.categoryItem, { backgroundColor }]}>
                <Image source={category.image} style={styles.categoryImage} />
                <Animated.Text
                  style={[styles.categoryText, { color: textColor }]}
                >
                  {category.name}
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  subtitle: {
    marginTop: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  categoryItem: {
    width: 108,
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderRadius: 16,
  },
  categoryImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    textAlign: "center",
    color: "#337AFF",
  },
});

export default CategoryStep;
