import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Amplify, Auth } from "aws-amplify";
import { useAuth } from "@/context/auth-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";

import globalStyles from "@/styles/global.styles";
import { LinearGradient } from "expo-linear-gradient";
import ButtonComponent from "./general/button-component";
import useSignIn from "@/hooks/use-sign-in.hook";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;

type SigninScreenProps = {
  setIsAuthenticated: (value: boolean) => void;
};
const SignInScreen: FC<SigninScreenProps> = ({ setIsAuthenticated }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    isSigningIn,
    handleSignIn,
  } = useSignIn(setIsAuthenticated);
  const navigation = useNavigation<SignInNavigationProp>();

  return (
    <View className={"bg-app-black-200 "} style={styles.container}>
      <View className="bg-app-white-100 w-full ">
        <Image
          source={require("@/assets/images/app-ressources/login-image.webp")}
          className="bg-cover w-full mt-44 "
        />
      </View>
      <View className="absolute z-10 w-11/12 top-[180px]">
        <View className="bg-app-white-100 mt-auto  rounded-3xl p-4">
          <Text
            className="text-app-black-300 mb-6 mt-2 text-center"
            style={globalStyles.title}
          >
            Sign In
          </Text>
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
          {/* <Button title="Sign In" onPress={handleSignIn} disabled={isSigningIn} /> */}
          <Button
            color={"#03050C"}
            title="Forgot Password?"
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </View>
        {/* <View className="mb-44 ">
          <LinearGradient
            colors={["#9A6B36", "#CCA373", "#9A6B36"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={globalStyles.gradient}
          >
            <Button
              color={"#03050C"}
              title="Don't have an account? Sign Up"
              onPress={() => navigation.navigate("SignUp")}
            />
          </LinearGradient>
        </View> */}
        <View className="mb-44 mt-4 ">
          <ButtonComponent
            onPress={() => navigation.navigate("SignUp")}
            secondary={true}
            white={false}
            title="Don't have an account? Sign Up"
          />
          {/* <Pressable
            onPress={() => navigation.navigate("SignUp")}
            style={({ pressed }) => [
              {
                // backgroundColor: pressed ? '#DDDDDD' : 'transparent',
                opacity: pressed ? 0.8 : 1,
              }, // Your existing styles
            ]}
          >
            {({ pressed }) => (
              <LinearGradient
                colors={["#CB9684", "#895442", "#CB9684"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ borderRadius: 10, overflow: "hidden", padding: 1 }}
              >
                <LinearGradient
                  colors={
                    !pressed
                      ? ["#895442", "#CB9684", "#895442"]
                      : ["#03050C", "#03050C", "#03050C"]
                  }
                  // colors={["#895442", "#CB9684", "#895442"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    padding: 15,
                    borderRadius: 9,
                    backgroundColor: "#03050C ",
                  }}
                >
                  <Text
                    className="font-semibold"
                    style={{ textAlign: "center", color: "#fff" }}
                  >
                    Don't have an account? Sign Up
                  </Text>
                </LinearGradient>
              </LinearGradient>
            )}
          </Pressable> */}
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
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default SignInScreen;
