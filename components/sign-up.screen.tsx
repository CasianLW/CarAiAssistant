import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/app/_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "@/context/auth-context";
import ButtonComponent from "./general/button-component";
import useSignUp from "@/hooks/use-sign-up.hook";
import globalStyles from "@/styles/global.styles";

type SignUpNavigationProp = StackNavigationProp<AuthStackParamList, "SignUp">;

type SignUpScreenProps = {
  setIsAuthenticated: (value: boolean) => void;
};
const SignUpScreen: FC<SignUpScreenProps> = ({ setIsAuthenticated }) => {
  const navigation = useNavigation<SignUpNavigationProp>();
  const {
    username,
    setUsername,
    password,
    setPassword,
    isConfirmModalVisible,
    setIsConfirmModalVisible,
    confirmationCode,
    setConfirmationCode,
    handleSignUp,
    handleConfirmSignUp,
  } = useSignUp(setIsAuthenticated);

  return (
    <View style={styles.container}>
      <View className="bg-app-white-100 w-full">
        <Image
          source={require("@/assets/images/app-ressources/register-img.webp")}
          className="bg-cover w-full mt-32 "
        />
      </View>
      <View className="z-10 absolute bg-app-white-100 top-[180px] w-11/12 p-4 rounded-3xl">
        <Modal
          animationType="slide"
          transparent={true}
          visible={isConfirmModalVisible}
          onRequestClose={() => {
            setIsConfirmModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Enter Confirmation Code</Text>
              <TextInput
                style={globalStyles.lightInput}
                placeholder="Confirmation Code"
                placeholderTextColor="#888"
                value={confirmationCode}
                onChangeText={setConfirmationCode}
              />
              <Button title="Confirm" onPress={handleConfirmSignUp} />
              <Text>*check your email</Text>
            </View>
          </View>
        </Modal>
        <Text className="text-center text-2xl mb-4">Sign Up</Text>
        <TextInput
          style={globalStyles.lightInput}
          placeholder="Username"
          placeholderTextColor="#888"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={globalStyles.lightInput}
          placeholder="Password"
          placeholderTextColor="#888"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {/* <Button title="Sign Up" onPress={handleSignUp} /> */}
        <View className="w-1/2 m-auto mb-2">
          <ButtonComponent
            onPress={handleSignUp}
            title="Sign Up"
            secondary={false}
            white={false}
          />
        </View>
        <Button
          title="Already have an account? Sign In"
          color={"#03050C"}
          onPress={() => navigation.navigate("SignIn")}
        />
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
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
});

export default SignUpScreen;
