// src/components/screens/SignInScreen.tsx
import React, { FC, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import globalStyles from "@/styles/global.styles";
import ButtonComponent from "../general/button-component";
import useSignIn from "@/hooks/use-sign-in.hook";
import { logAsGuest } from "@/stores/slices/auth-slice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;

const SignInScreen: FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    isSigningIn,
    handleSignIn,
  } = useSignIn();
  const navigation = useNavigation<SignInNavigationProp>();
  const dispatch = useDispatch();

  const handleResetOnboarding = async () => {
    await AsyncStorage.setItem("hasOnboarded", "false");
    navigation.replace("Onboarding");
  };
  const [hasOnboardedValue, setHasOnboardedValue] = useState<string | null>(
    null
  );

  useEffect(() => {
    const getHasOnboarded = async () => {
      const value = await AsyncStorage.getItem("hasOnboarded");
      setHasOnboardedValue(value);
    };

    getHasOnboarded();
  }, []);

  return (
    <View className="bg-app-black-200" style={styles.container}>
      <View className="bg-app-white-100 w-full">
        {/* <Image
          source={require('@/assets/images/app-ressources/login-image.webp')}
          className="bg-cover w-full mt-44"
        /> */}
      </View>
      <View className="absolute z-10 w-11/12 top-[180px]">
        <View className="bg-app-white-100 mt-auto rounded-3xl p-4">
          <Text
            className="text-app-black-300 mb-6 mt-2 text-center"
            style={globalStyles.title}
          >
            Sign In
          </Text>
          <Text>Current Onboarding State: {hasOnboardedValue}</Text>

          <TextInput
            className="mx-auto"
            style={globalStyles.lightInput}
            placeholder="Username"
            placeholderTextColor="#888"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            className="mx-auto"
            style={globalStyles.lightInput}
            placeholder="Password"
            placeholderTextColor="#888"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <View className="w-1/2 m-auto mb-5">
            <ButtonComponent
              onPress={handleSignIn}
              title="Log in"
              disabled={isSigningIn}
              secondary={false}
              white={false}
            />
          </View>
          <Button
            color={"#03050C"}
            title="Forgot Password?"
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </View>
        <View className="mb-44 mt-4">
          <ButtonComponent
            onPress={() => navigation.navigate("SignUp")}
            secondary={true}
            white={false}
            title="Don't have an account? Sign Up"
          />
        </View>
        <View className="mb-44 mt-4">
          <ButtonComponent
            onPress={() => {
              dispatch(logAsGuest());
            }}
            secondary={true}
            white={false}
            title="Continuer sans compte"
          />
        </View>
        <View className="mb-44 mt-4">
          <ButtonComponent
            onPress={handleResetOnboarding}
            secondary={true}
            white={false}
            title="False onboarding local storage"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignInScreen;
