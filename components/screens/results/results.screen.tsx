import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Linking,
  Alert,
} from "react-native";
import NavSearch from "../categories/nav.search";
import globalStyles from "@/styles/global.styles";
import {
  MobiledeCarCardProps,
  MobiledeResultsCarCardProps,
} from "@/interfaces/mobilede-car";
import { calculateLeasing } from "@/helpers/calculate-leasing";
import ButtonComponent from "@/components/general/button-component";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// APP_API_URL=http://localhost:3000/
// const apiUrl = process.env.APP_API_URL;
// const apiUrl = "http://localhost:3000/";
const apiUrl = "https://vehicle-buy-assistant.onrender.com/";

const bearerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyQWRtaW4iLCJzdWIiOiI2NjVkZjQ1NTNhYzFmYjkzNmIzYzg4ZTIiLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3MTg4MzU2MDgsImV4cCI6MTcxODgzOTIwOH0.Z5XcHpbN0jFp6_qGw7uTxfUFxb3XgfuCPtV4JgL1a0s";
const SearchResultsScreen = () => {
  // Mock data, replace with your actual data fetching logic
  const results: MobiledeCarCardProps[] = [
    {
      makeId: 1,
      make: "Toyota",
      modelId: 101,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
    {
      makeId: 1,
      make: "Toyota",
      modelId: 1011,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
    {
      makeId: 1,
      make: "Toyota",
      modelId: 1011,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
    {
      makeId: 1,
      make: "Toyota",
      modelId: 10211,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
    {
      makeId: 1,
      make: "Toyota",
      modelId: 10111,
      model: "Corolla",
      year: 2022,
      price: 20000,
      consumption: 6,
      fuel_cost: 1.5,
      annual_maintenance: 600,
      registration_cost: 250,
      estimated_insurance: 800,
      max_km: 300000,
      description:
        "Reliable family car with good fuel efficiency and low maintenance costs.",
    },
    // Additional entries can be added here
  ];
  const mobiledeResults: MobiledeResultsCarCardProps[] = [
    {
      title: "Maserati Maserati Ghibli V6 250CV Diesel NO SUPERBOLLO",
      price: "150 € (TTC)",
      details:
        "04/2018, 178 000 km, 184 kW (250 Ch DIN), Berline, Diesel, Boîte automatique, Couleur extérieure: Bleu, Nombre de portes: 4/5, , , , ",
      location: "83035 GROTTAMINARDA, Professionnel",
      imgSrc:
        "https://img.classistatic.de/api/v1/mo-prod/images/f6/f6c50875-7b54-4ac1-94c8-becfd2b5542c?rule=mo-640.jpg",
      href: "https://www.automobile.fr/Voiture/Maserati-Maserati-Ghibli-V6-250CV-Diesel-NO/vhc:car,srt:price,sro:asc,frn:2017,dmg:false/pg:vipcar/395498924.html",
    },
    {
      title: "Alfa Romeo ALFA ROMEO STELVIO 2.2 210CV AT8 Q4 EXECUTIVE",
      price: "150 € (TTC)",
      details:
        "07/2018, 118 000 km, 154 kW (209 Ch DIN), SUV / Off-road Vehicle / Pickup Truck, Diesel, Boîte automatique, Couleur extérieure: Gris, Nombre de portes: 4/5, , , , ",
      location: "AVELLINO AVELLINO, Professionnel",
      imgSrc:
        "https://img.classistatic.de/api/v1/mo-prod/images/f6/f6c50875-7b54-4ac1-94c8-becfd2b5542c?rule=mo-640.jpg",
      href: "https://www.automobile.fr/Voiture/Alfa-Romeo-ALFA-ROMEO-STELVIO-2.2-210CV-AT8/vhc:car,srt:price,sro:asc,frn:2017,dmg:false/pg:vipcar/394970259.html",
    },
    {
      title: "Renault Renault Trafic PASSENGER 9 POSTI X NOLEGGIO",
      price: "150 € (TTC)",
      details:
        "04/2024, 1 000 km, 110 kW (150 Ch DIN), Monospace / Ludospace, Diesel, Boîte manuelle, Couleur extérieure: Gris, Nombre de portes: 4/5, , , , ",
      location: "83020 SANTA LUCIA DI SERINO, Professionnel",
      imgSrc:
        "https://img.classistatic.de/api/v1/mo-prod/images/f6/f6c50875-7b54-4ac1-94c8-becfd2b5542c?rule=mo-640.jpg",
      href: "https://www.automobile.fr/Voiture/Renault-Renault-Trafic-PASSENGER-9-POSTI-X/vhc:car,srt:price,sro:asc,frn:2017,dmg:false/pg:vipcar/394952916.html",
    },
  ];

  const [activeAdsResults, setActiveAdsResults] = useState<
    MobiledeResultsCarCardProps[]
  >(mobiledeResults || []);

  const [openResults, setOpenResults] = useState(false);

  return (
    <View className="bg-app-blue-100">
      <NavSearch
        goBack={openResults ? () => setOpenResults(false) : undefined}
      />

      <ScrollView className="h-full " style={globalStyles.searchContainer}>
        <Text style={globalStyles.title}>
          {openResults ? "Liste annonces:" : "Propositions modeles:"}
        </Text>
        {openResults ? (
          <MobiledeSearchResultsComponent
            results={activeAdsResults}
            open={openResults}
          />
        ) : (
          <View className="mb-40">
            {results.map((result, index) => (
              <CarCardComponent
                onButton={() => setOpenResults(true)}
                car={result}
                key={`${result.makeId}-${result.modelId}-${index}`}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const CarCardComponent: FC<{
  car: MobiledeCarCardProps;
  onButton: () => void;
}> = ({ car, onButton }) => {
  const [fetchEnabled, setFetchEnabled] = useState(false); // State to control query fetching

  const fetchAds = async () => {
    const response = await axios.get(`${apiUrl}mobilede-cars`, {
      params: { make: car.make, model: car.model, year: car.year },
      headers: {
        bearer: bearerToken,
      },
    });
    return response.data; // Make sure to return data here
  };

  const {
    data: ads,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchAds", car.make, car.model, car.year],
    queryFn: fetchAds,
    enabled: fetchEnabled, // initially set to false, can be triggered by a button
  });

  useEffect(() => {
    if (ads) {
      console.log("Ads fetched successfully:", ads);
    }
  }, [ads]);

  useEffect(() => {
    if (isError && error) {
      console.error("Error fetching ads:", error);
    }
  }, [isError, error]);

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
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <ButtonComponent onPress={onButton} title="Voir annonce" />
        // <ButtonComponent onPress={accessAds} title="Voir annonce" />
      )}
    </View>
  );
};

interface MobiledeSearchResultsComponentProps {
  results: MobiledeResultsCarCardProps[];
  open: boolean;
}

const MobiledeSearchResultsComponent: FC<
  MobiledeSearchResultsComponentProps
> = ({ results, open }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: open ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [open]);

  const openURI = async (url: string) => {
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  return (
    <Animated.View
      className={" mb-44"}
      style={[styles.fadeContainer, { opacity: fadeAnim }]}
    >
      {results.map((result, index) => (
        <View key={index} style={styles.resultCard}>
          <View className="rounded-2xl overflow-hidden">
            <Image
              // width={200}
              // height={200}
              style={styles.imageStyle}
              source={{
                uri: result.imgSrc,
              }}
              onError={(e) =>
                console.error("Error loading image:", e.nativeEvent.error)
              } // Logging error if image fails to load
            />
          </View>
          <View className="px-4 pt-2">
            <Text style={styles.resultTitle}>{result.title}</Text>
            <Text>{result.details}</Text>
            <Text>{result.location}</Text>
          </View>
          <ButtonComponent
            style={{ marginHorizontal: 32, marginVertical: 16 }}
            onPress={() => openURI(result.href)}
            title="Voir annonce"
          />
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    // borderRadius: 16,
    width: 350, // Example width
    minHeight: 200, // Example height
    // minHeight: 200, // Minimum height
    resizeMode: "cover", // Cover is usually a good resizeMode for images
  },
  fadeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultCard: {
    // padding: 10,
    marginVertical: 8,
    backgroundColor: "#EBF2FF",
    borderRadius: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default SearchResultsScreen;
