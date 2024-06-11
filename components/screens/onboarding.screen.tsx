import React, { FC, useState, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import ButtonComponent from "../general/button-component";
import globalStyles from "@/styles/global.styles";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;

const OnboardingScreen: FC = () => {
  const navigation = useNavigation<SignInNavigationProp>();
  const offsetX = useRef(new Animated.Value(0)).current; // Animation for car image
  const [slide, setSlide] = useState(0); // Current slide index

  const titles = [
    "Bienvenue sur CarApp",
    "La puissance de l’intelligence artificielle entre vos mains",
    "Allons-y, trouvons la voiture a votre pied !",
  ];

  const subtitles = [
    "La première application d'assistance achat voiture occasion du monde",
    "Spécialement conçue pour le domaine de l’achat auto d’occasion",
    "Liée aux sites d’annonces d’occasion en ligne pour une recherche facilitée",
  ];

  const moveDistance = 380;
  const handlePrevious = () => {
    if (slide > 0) {
      Animated.timing(offsetX, {
        toValue: -(slide - 1) * moveDistance, // Move image to the right
        duration: 300,
        useNativeDriver: true,
      }).start();

      setSlide(slide - 1); // Move to the previous slide
    }
  };

  const handleNext = async () => {
    if (slide === 2) {
      await AsyncStorage.setItem("hasOnboarded", "true");
      navigation.replace("SignIn");
    } else {
      Animated.timing(offsetX, {
        toValue: -(slide + 1) * moveDistance, // Move image to the left
        duration: 300,
        useNativeDriver: true,
      }).start();

      setSlide(slide + 1); // Move to the next slide
    }
  };

  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerTitle}>CarApp</Text>
      <Animated.Image
        source={require("@/assets/images/onboarding/decapotable.png")}
        style={[styles.image, { transform: [{ translateX: offsetX }] }]}
      />
      <Animated.Image
        source={require("@/assets/images/onboarding/audi-rs.png")}
        style={[styles.image2, { transform: [{ translateX: offsetX }] }]}
      />
      <View style={styles.contentContainer}>
        <Text style={globalStyles.title}>{titles[slide]}</Text>
        <Text style={globalStyles.subtitle}>{subtitles[slide]}</Text>
        <View style={styles.pagination}>
          {titles.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === slide && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          <ButtonComponent
            secondary={true}
            title="Passer"
            onPress={() => navigation.replace("SignIn")}
          />
          <ButtonComponent
            title={slide === 2 ? "Terminer" : "Suivant"}
            onPress={handleNext}
          />
        </View>
        <Text style={globalStyles.footerText}>
          En continuant, vous acceptez nos termes et conditions
        </Text>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0066FF",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  image: {
    width: "120%",
    height: "50%",
    resizeMode: "contain",
    marginLeft: 100,
    marginTop: 40,
    // display: "none",
  },
  image2: {
    width: "100%",
    height: "50%",
    resizeMode: "contain",
    marginLeft: -380,
    marginTop: 40,
  },
  contentContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 20,
    alignItems: "flex-start",
    bottom: 0,
    position: "absolute",
  },

  pagination: {
    flexDirection: "row",
    marginVertical: 20,
  },
  paginationDot: {
    width: 16,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cccccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#0066FF",
    width: 28,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
