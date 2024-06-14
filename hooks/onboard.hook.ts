import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;

export function useOnboard(titles: string[]) {
  const navigation = useNavigation<SignInNavigationProp>();
  const offsetX = useRef(new Animated.Value(0)).current;
  const offsetX2 = useRef(new Animated.Value(380)).current;
  const [slide, setSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const moveDistance = 380;

  const dotWidths = titles.map(() => useRef(new Animated.Value(8)).current);

  const handlePrevious = () => {
    if (slide > 0) {
      Animated.timing(offsetX, {
        toValue: -(slide - 1) * moveDistance,
        duration: 300,
        useNativeDriver: true,
      }).start();

      if (slide === 2) {
        Animated.timing(offsetX2, {
          toValue: 380,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      setSlide(slide - 1);
    }
  };

  const handleNext = async () => {
    if (slide === 2) {
      await AsyncStorage.setItem("hasOnboarded", "true");
      navigation.replace("SignIn");
    } else {
      Animated.timing(offsetX, {
        toValue: -(slide + 1) * moveDistance,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (slide === 1) {
          Animated.timing(offsetX2, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            delay: 50,
          }).start();
        }
      });

      setSlide(slide + 1);
    }
  };

  useEffect(() => {
    // Run animations with proper handling
    titles.forEach((_, index) => {
      Animated.timing(dotWidths[index], {
        toValue: index === slide ? 28 : 8,
        duration: 200, // Ensuring this is applied both ways
        useNativeDriver: false,
      }).start();
    });
  }, [slide]);

  return {
    slide,
    navigation,
    modalVisible,
    setModalVisible,
    offsetX,
    offsetX2,
    handlePrevious,
    handleNext,
    dotWidths,
  };
}
