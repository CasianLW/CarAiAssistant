import { Alert, Linking } from "react-native";

export const openURI = async (url: string) => {
  const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
  if (supported) {
    await Linking.openURL(url); // It will open the URL on browser.
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};
