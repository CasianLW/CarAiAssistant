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
import InputComponent from "../general/input-component";
import MailIcon from "@/assets/images/icons/mail.icon";
import LockIcon from "@/assets/images/icons/lock.icon";
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
    <View style={globalStyles.screenRegistrationContainer}>
      <View>
        <Text
          style={globalStyles.title}
          className="text-app-black-300 mb-6 text-center"
        >
          Mot de passe oublié ?
        </Text>
        <Text
          className="text-app-black-300 mb-6 mt-2 text-center"
          style={globalStyles.subtitle}
        >
          Entrez votre adresse email pour réinitialiser votre mot de passe
        </Text>
      </View>
      <View>
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
              <Text style={globalStyles.title}>Reset Password</Text>
              {/* <TextInput
                style={globalStyles.lightInput}
                className="w-[240px]"
                placeholder="Confirmation Code"
                placeholderTextColor="#888"
                value={code}
                onChangeText={setCode}
              /> */}
              <InputComponent
                onChangeText={setCode}
                placeholder="Confirmation Code"
                value={code}
                icon={<MailIcon fill="#808080" />}
              />
              {/* <TextInput
                style={globalStyles.lightInput}
                className="w-[240px]"
                placeholder="New Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              /> */}
              <InputComponent
                onChangeText={setNewPassword}
                placeholder="Nouveau mot de passe"
                value={newPassword}
                secure={true}
                icon={<LockIcon fill={"#808080"} />}
              />
              {/* <Button
                title="Confirm Reset"
                onPress={handlePasswordResetConfirm}
              /> */}
              <ButtonComponent
                onPress={handlePasswordResetConfirm}
                title="Confirm Reset"
              />

              <Button
                title="Cancel"
                color={"#FF0000"}
                onPress={() => setIsResetModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        {/* <TextInput
          className="placeholder-gray-500"
          placeholderTextColor="#888"
          style={globalStyles.lightInput}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        /> */}
        <InputComponent
          onChangeText={(text) => setUsername(text)}
          placeholder="monemail@mail.com"
          value={username}
          icon={<MailIcon fill="#808080" />}
        />
        {/* <Button title="Submit" onPress={handleForgotPassword} /> */}
        <View>
          <ButtonComponent
            onPress={handleForgotPassword}
            title="Recevoir le code"
          />
        </View>
        <Text className="text-center text-app-blue-300 text-base ">Ou</Text>

        <ButtonComponent
          onPress={() => navigation.navigate("SignUp")}
          title="Je crée mon compte !"
          secondary={true}
        />
        <ButtonComponent
          onPress={() => navigation.navigate("SignIn")}
          title="Je me connecte !"
          secondary={true}
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
