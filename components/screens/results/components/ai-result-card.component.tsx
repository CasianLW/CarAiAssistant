import ButtonComponent from "@/components/general/button-component";
import { MobiledeCarCardProps } from "@/interfaces/mobilede-car";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { calculateLeasing } from "@/helpers/calculate-leasing";
import globalStyles from "@/styles/global.styles";
import { openURI } from "@/helpers/open-uri";
import AdInfoIcon from "@/assets/images/icons/ad-info.icon";
import { ImageSourcePropType } from "react-native";

const AiResultCardComponent: FC<{
  car: MobiledeCarCardProps;
  // onButton: () => void;
  onFetch: (car: MobiledeCarCardProps) => void;
}> = ({ car, onFetch }) => {
  const [isInsuranceModalVisible, setIsInsuranceModalVisible] = useState(false);
  const [isLeasingModalVisible, setIsLeasingModalVisible] = useState(false);
  // const [fetchEnabled, setFetchEnabled] = useState(false); // State to control query fetching

  // const accessAds = () => {
  //   setFetchEnabled(true); // Enable fetching when the button is pressed
  // };
  const frontPrice = car.price.toFixed(0);
  const minPrice = (car.price - car.price * 0.3).toFixed(0);
  const maxPrice = (car.price + car.price * 0).toFixed(0);
  const frontYear = car.year.toFixed(0);

  const frontConsumption = car.consumption.toFixed(2);
  const frontConsumptionEuros = (car.consumption * 1.8).toFixed(2);
  const frontMaxKm = car.max_km.toFixed(0);

  const frontMaintenance = car.annual_maintenance.toFixed(0);
  const frontRegistration = car.registration_cost.toFixed(0);
  const frontInsurance = car.estimated_insurance.toFixed(0);
  return (
    <View className="bg-app-blue-200 rounded-2xl p-3  mt-6 gap-y-1 mb-6">
      <Text
        style={{ fontFamily: "UrbanistSemiBold600" }}
        className="text-xl text-center text-app-white-100"
      >
        {car.make} {car.model}
      </Text>
      <View className="flex flex-row justify-between">
        <Text className="text-app-blue-500 text-base">{frontYear}+</Text>
        <Text className="text-app-blue-500 text-base">
          max {maxPrice} €{/* {minPrice} - {maxPrice} € */}
        </Text>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="text-app-blue-500 text-base">
          {frontConsumption}l - {frontConsumptionEuros}€/100km
        </Text>
        <Text className="text-app-blue-500 text-base">
          {"<"}
          {frontMaxKm} km
        </Text>
      </View>

      <Text className="text-app-blue-500 text-base">
        Entretien annuel: ~{frontMaintenance}€
      </Text>
      <Text className="text-app-blue-500 text-base">
        Prix carte grise: ~{frontRegistration}€
      </Text>
      <View className="flex flex-row items-center gap-2 ">
        <Text className="text-app-blue-500 text-base w-fit">
          Assurance: {frontInsurance}€/an
        </Text>
        <AdInfoIcon
          className="self-center place-self-center align-middle "
          width={24}
          height={24}
          fill={"#ffffff"}
          onPress={() => setIsInsuranceModalVisible(true)}
        />
      </View>
      <View className="flex flex-row items-center gap-2 ">
        <Text className="text-app-blue-500 text-base">
          Leasing: {calculateLeasing(car.price).monthly.toFixed(0)}€/mois
        </Text>
        <AdInfoIcon
          className="self-center place-self-center align-middle "
          width={24}
          height={24}
          fill={"#ffffff"}
          onPress={() => setIsLeasingModalVisible(true)}
        />
      </View>
      <Text className="text-app-white-100 font-semibold text-base">
        {car.description}
      </Text>
      {/* {isLoading ? ( */}
      {/* //   <Text>Loading...</Text> */}
      {/* ) : ( */}
      {/* <ButtonComponent onPress={onButton} title="Voir annonce" /> */}
      <ButtonComponent onPress={() => onFetch(car)} title="Voir annonce" />

      {/* // <ButtonComponent onPress={accessAds} title="Voir annonce" /> */}
      {/* )} */}
      <AdModal
        isAdModalVisible={isInsuranceModalVisible}
        setIsAdModalVisible={setIsInsuranceModalVisible}
        imageSrc={require("@/assets/images/ads/assu-unie-logo.png")}
        adUrl={"https://bit.ly/assurance-unie-ad"}
        title="Assurance"
        text1="Variable en fonction de votre bonus"
        text2="Verifiez le prix de l’assurance exact via notre partenaire:"
      />
      <AdModal
        isAdModalVisible={isLeasingModalVisible}
        setIsAdModalVisible={setIsLeasingModalVisible}
        imageSrc={require("@/assets/images/ads/sg-banque-logo.svg")}
        adUrl={"https://bit.ly/societe-generale-ad"}
        title="Leasing"
        text1="Estimation faite sur 36 mois pour 20000€ avec 0 apport initial"
        text2="Multiples configurations possibles"
        text3="Verifiez le prix de du prêt exact via notre partenaire:"
      />
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isInsuranceModalVisible}
        onRequestClose={() => {
          setIsInsuranceModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={globalStyles.title}>Assurance</Text>
            <Text className="text-lg text-center leading-5 font-semibold">
              Variable en fonction de votre bonus
            </Text>
            <Text className="text-lg text-center leading-5 font-semibold">
              Verifiez le prix de l’assurance exact via notre partenaire:
            </Text>
            <Text className="text-lg text-center leading-5 font-semibold">
              text3??text3
            </Text>
            <Image
              className="max-w-[80%] max-h-[100px]"
              style={{ resizeMode: "contain" }}
              width={60}
              source={require("@/assets/images/ads/assu-unie-logo.png")}
            />
            <ButtonComponent
              title={"Estimer l'assurance"}
              onPress={() => openURI("https://bit.ly/assurance-unie-ad")}
            />

            <Button
              title="Fermer"
              color={"#FF0000"}
              onPress={() => setIsInsuranceModalVisible(false)}
            />
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default AiResultCardComponent;

interface AdModalProps {
  isAdModalVisible: boolean;
  setIsAdModalVisible: (isVisible: boolean) => void;
  imageSrc: ImageSourcePropType;
  adUrl: string;
  title: string;
  text1?: string;
  text2?: string;
  text3?: string;
}

const AdModal: FC<AdModalProps> = ({
  isAdModalVisible,
  setIsAdModalVisible,
  imageSrc,
  adUrl,
  title,
  text1,
  text2,
  text3,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAdModalVisible}
      onRequestClose={() => setIsAdModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={globalStyles.title}>{title}</Text>
          <Text className="text-lg text-center leading-5 font-semibold">
            {text1}
          </Text>
          <Text className="text-lg text-center leading-5 font-semibold">
            {text2}
          </Text>
          {text3 && (
            <Text className="text-lg text-center leading-5 font-semibold"></Text>
          )}
          <Image
            className="max-w-[80%] max-h-[100px]"
            style={{ resizeMode: "contain" }}
            source={imageSrc}
          />
          <ButtonComponent
            title={"Estimer l'assurance"}
            onPress={() => openURI(adUrl)}
          />
          <Button
            title="Fermer"
            color="#FF0000"
            onPress={() => setIsAdModalVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // maxHeight: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    // marginTop: -124,
  },
  modalView: {
    margin: 12,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
});
