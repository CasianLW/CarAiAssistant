import React, { FC, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import ButtonComponent from "../general/button-component";
import globalStyles from "@/styles/global.styles";
import ArrowBackIcon from "@/assets/images/icons/arrow-back.icon";
import conditionsAppText from "@/constants/conditions-de-vente.text";
import { useOnboard } from "@/hooks/onboard.hook";

const OnboardingScreen: FC = () => {
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
  const {
    slide,
    navigation,
    modalVisible,
    setModalVisible,
    offsetX,
    offsetX2,
    handlePrevious,
    handleNext,
    dotWidths,
  } = useOnboard(titles);

  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerTitle}>CarApp</Text>
      {slide > 0 && (
        <TouchableOpacity
          onPress={handlePrevious}
          style={globalStyles.arrowBack}
        >
          <ArrowBackIcon />
        </TouchableOpacity>
      )}
      <Animated.Image
        source={require("@/assets/images/onboarding/decapotable.png")}
        style={[styles.image, { transform: [{ translateX: offsetX }] }]}
      />
      <Animated.Image
        source={require("@/assets/images/onboarding/audi-rs.png")}
        style={[styles.image2, { transform: [{ translateX: offsetX2 }] }]}
      />
      <View style={styles.contentContainer}>
        <Text style={globalStyles.title}>{titles[slide]}</Text>
        <Text style={globalStyles.subtitle}>{subtitles[slide]}</Text>
        {/* <View style={styles.pagination}>
          {titles.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === slide && styles.paginationDotActive,
              ]}
            />
          ))}
        </View> */}
        <View style={styles.pagination}>
          {titles.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                { width: dotWidths[index] }, // Use the animated width here
                index === slide && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          {slide < 2 && (
            <ButtonComponent
              style={styles.buttonFlex}
              disabled={true}
              title="Passer"
              onPress={() => navigation.replace("SignIn")}
            />
          )}
          <ButtonComponent
            style={styles.buttonFlex}
            title={slide === 2 ? "Commencer l’aventure !" : "Suivant"}
            onPress={handleNext}
          />
        </View>
        <Text style={globalStyles.footerText}>
          En continuant, vous acceptez nos{" "}
          <Text style={styles.underline} onPress={() => setModalVisible(true)}>
            termes et conditions
          </Text>
        </Text>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Termes et Conditions</Text>
            <ScrollView style={styles.modalBody}>
              <Text>{conditionsAppText}</Text>
              {/* Add more content here if needed for the conditions (title/text structure) */}
            </ScrollView>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  backButtonIcon: {
    width: 24,
    height: 24,
    color: "#FFFFFF",
  },
  image: {
    width: "120%",
    height: "50%",
    resizeMode: "contain",
    position: "absolute",
    top: 40,
    left: 100,
  },
  image2: {
    width: "100%",
    height: "50%",
    resizeMode: "contain",
    position: "absolute",
    // top: 40,
    left: 100,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonFlex: {
    flex: 1,
  },
  underline: {
    textDecorationLine: "underline",
    color: "#0066FF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontFamily: "UrbanistSemiBold600",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalBody: {
    fontFamily: "UrbanistMedium500",
    maxHeight: 360,
    marginBottom: 20,
  },
});
