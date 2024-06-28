import AsyncStorage from "@react-native-async-storage/async-storage";

const jwtDecode = require("jwt-decode");
const TOKEN_KEY = "yourjwtsecret";

export const storeToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getStoredToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const decodeToken = (token: string) => {
  return jwtDecode(token);
};

export const removeStoredToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};
