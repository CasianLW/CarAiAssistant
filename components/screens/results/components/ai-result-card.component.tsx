import ButtonComponent from "@/components/general/button-component";
import { MobiledeCarCardProps } from "@/interfaces/mobilede-car";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";
import { calculateLeasing } from "@/helpers/calculate-leasing";

const AiResultCardComponent: FC<{
  car: MobiledeCarCardProps;
  onButton: () => void;
}> = ({ car, onButton }) => {
  const [fetchEnabled, setFetchEnabled] = useState(false); // State to control query fetching

  const accessAds = () => {
    setFetchEnabled(true); // Enable fetching when the button is pressed
  };

  return (
    <View className="bg-app-blue-200 rounded-2xl p-3  mt-6">
      <Text
        style={{ fontFamily: "UrbanistSemiBold600" }}
        className="text-xl text-center text-app-white-100"
      >
        {car.make}
        {car.model}
      </Text>
      <View className="flex flex-row justify-between">
        <Text className="text-app-blue-500 text-base">{car.year}+</Text>
        <Text className="text-app-blue-500 text-base">
          {car.price - 3000} - {car.price + 3000} €
        </Text>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="text-app-blue-500 text-base">
          {car.consumption}l/100km+ - {car.consumption * 1.8}€/100km
        </Text>
        <Text className="text-app-blue-500 text-base">
          {"<"}
          {car.max_km} km
        </Text>
      </View>

      <Text className="text-app-blue-500 text-base">
        Entretien annuel: ~{car.annual_maintenance}€
      </Text>
      <Text className="text-app-blue-500 text-base">
        Prix carte grise: ~{car.registration_cost}€
      </Text>
      <Text className="text-app-blue-500 text-base">
        Assurance: {car.estimated_insurance}€/an
      </Text>
      <Text className="text-app-blue-500 text-base">
        Leasing: {calculateLeasing(car.price).monthly}€/mois
      </Text>
      <Text className="text-app-white-100 font-semibold text-base">
        {car.description}
      </Text>
      {/* {isLoading ? ( */}
      {/* //   <Text>Loading...</Text> */}
      {/* ) : ( */}
      <ButtonComponent onPress={onButton} title="Voir annonce" />
      {/* // <ButtonComponent onPress={accessAds} title="Voir annonce" /> */}
      {/* )} */}
    </View>
  );
};

export default AiResultCardComponent;
