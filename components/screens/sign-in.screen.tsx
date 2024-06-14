// src/components/screens/SignInScreen.tsx
import React, { FC, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import globalStyles from "@/styles/global.styles";
import ButtonComponent from "../general/button-component";
import useSignIn from "@/hooks/use-sign-in.hook";
import { logAsGuest } from "@/stores/slices/auth-slice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputComponent from "../general/input-component";
import MailIcon from "@/assets/images/icons/mail.icon";
import LockIcon from "@/assets/images/icons/lock.icon";
import ExternalConnexionButtons from "../general/external-connexion-buttons-component";

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
    <View className="" style={globalStyles.screenRegistrationContainer}>
      <View className="bg-app-white-100 w-full ">
        {/* <Image
          source={require('@/assets/images/app-ressources/login-image.webp')}
          className="bg-cover w-full mt-44"
        /> */}
      </View>
      <View className="">
        <View>
          <Text
            className="text-app-black-300 mb-6 text-center"
            style={globalStyles.title}
          >
            Connexion
          </Text>
          <Text
            className="text-app-black-300 mb-6 mt-2 text-center"
            style={globalStyles.subtitle}
          >
            Profitez de plus de fonctionnalités gratuites en vous connectant
          </Text>
          {/* <Text>Current Onboarding State: {hasOnboardedValue}</Text> */}

          {/* <TextInput
            className="mx-auto"
            style={globalStyles.lightInput}
            placeholder="Username"
            placeholderTextColor="#888"
            onChangeText={(text) => setUsername(text)}
            value={username}
          /> */}
          <InputComponent
            onChangeText={(text) => setUsername(text)}
            placeholder="monemail@mail.com"
            value={username}
            icon={<MailIcon fill="#808080" />}
          />
          {/* <TextInput
            className="mx-auto"
            style={globalStyles.lightInput}
            placeholder="Password"
            placeholderTextColor="#888"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          /> */}
          <InputComponent
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="*********"
            secure={true}
            icon={<LockIcon fill={"#808080"} />}
          />
          <ButtonComponent
            onPress={handleSignIn}
            title="Je me connecte !"
            disabled={isSigningIn}
            // secondary={false}
            // white={false}
          />
          <View className="mt-2 mb-4">
            <Button
              color={"#80AFFF"}
              title="Mot de passe oublié ?"
              onPress={() => navigation.navigate("ForgotPassword")}
            />
          </View>
        </View>

        <ExternalConnexionButtons />
        <Text className="text-center text-app-blue-300 text-base ">Ou</Text>
        <View>
          <ButtonComponent
            onPress={() => navigation.navigate("SignUp")}
            secondary={true}
            title="Créer mon compte !"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(logAsGuest());
          }}
        >
          <Text className="text-xl text-center text-app-blue-200 underline mt-4">
            Continuer sans compte
          </Text>
        </TouchableOpacity>
        {/* <View className=" mt-4">
          <ButtonComponent
            onPress={handleResetOnboarding}
            secondary={true}
            white={false}
            title="False onboarding local storage"
          />
        </View> */}
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
