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
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import { useNavigation } from "@react-navigation/native";
import ButtonComponent from "../general/button-component";
import useForgotPassword from "@/hooks/use-forgot-password.hook";
import globalStyles from "@/styles/global.styles";
type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;

const ForgotPasswordScreen: FC = () => {
  const {
    username,
    setUsername,
    code,
    setCode,
    newPassword,
    setNewPassword,
    isResetModalVisible,
    setIsResetModalVisible,
    handleForgotPassword,
    handlePasswordResetConfirm,
  } = useForgotPassword();
  const navigation = useNavigation<SignInNavigationProp>();

  return (
    <View style={styles.container}>
      <View className="bg-app-black-300 w-full -z-20 ">
        <Text>Test</Text>
        <Image
          source={require("@/assets/images/app-ressources/forgot-pwd-img.webp")}
          className="bg-cover  w-full mt-36"
        />
      </View>
      <View className="z-10 absolute bg-app-white-100 w-11/12 p-4 rounded-3xl top-[180px]">
        <Modal
          animationType="slide"
          transparent={true}
          visible={isResetModalVisible}
          onRequestClose={() => {
            setIsResetModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Reset Password</Text>
              <TextInput
                style={globalStyles.lightInput}
                className="w-[240px]"
                placeholder="Confirmation Code"
                placeholderTextColor="#888"
                value={code}
                onChangeText={setCode}
              />
              <TextInput
                style={globalStyles.lightInput}
                className="w-[240px]"
                placeholder="New Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              {/* <Button
                title="Confirm Reset"
                onPress={handlePasswordResetConfirm}
              /> */}
              <View className="w-1/2 m-auto mb-2">
                <ButtonComponent
                  onPress={handlePasswordResetConfirm}
                  title="Confirm Reset"
                  secondary={false}
                  white={false}
                />
              </View>

              <Button
                title="Cancel"
                color={"#FF0000"}
                onPress={() => setIsResetModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
        <Text className="text-center text-2xl mb-4">Forgot Password</Text>
        <TextInput
          className="placeholder-gray-500"
          placeholderTextColor="#888"
          style={globalStyles.lightInput}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        {/* <Button title="Submit" onPress={handleForgotPassword} /> */}
        <View className="w-1/2 m-auto mb-5">
          <ButtonComponent
            onPress={handleForgotPassword}
            title="Submit"
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
    // width: "100%",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#EEECE9",
    borderRadius: 5,
    // borderColor: "gray",
    // borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -124,
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

export default ForgotPasswordScreen;
