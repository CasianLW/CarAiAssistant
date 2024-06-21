import ButtonComponent from "@/components/general/button-component";
import { View } from "@/components/themed";
import { MobiledeResultsCarCardProps } from "@/interfaces/mobilede-car";
import { FC, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Linking,
  StyleSheet,
  Text,
} from "react-native";

interface AdsResultsComponentProps {
  results: MobiledeResultsCarCardProps[];
  open: boolean;
}

const AdsResultsComponent: FC<AdsResultsComponentProps> = ({
  results,
  open,
}) => {
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
      className={"mb-44"}
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
          <View className="px-4 pt-2 bg-transparent">
            <Text style={styles.resultTitle}>{result.title}</Text>
            <Text className="text-app-blue-200" style={styles.resultPrice}>
              {result.price}
            </Text>
            {result.details.map((detail, index) => (
              <Text key={index}>{detail}</Text>
            ))}
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
  resultPrice: {
    width: "100%",
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AdsResultsComponent;
