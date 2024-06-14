import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/app/_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "@/context/auth-context";
import ButtonComponent from "../general/button-component";
import useSignUp from "@/hooks/use-sign-up.hook";
import globalStyles from "@/styles/global.styles";
import InputComponent from "../general/input-component";
import MailIcon from "@/assets/images/icons/mail.icon";
import ProfileIcon from "@/assets/images/icons/profile.icon";
import LockIcon from "@/assets/images/icons/lock.icon";
import { useDispatch } from "react-redux";
import { logAsGuest } from "@/stores/slices/auth-slice";
import ExternalConnexionButtons from "../general/external-connexion-buttons-component";

type SignUpNavigationProp = StackNavigationProp<AuthStackParamList, "SignUp">;

const SignUpScreen: FC = () => {
  const navigation = useNavigation<SignUpNavigationProp>();
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    isConfirmModalVisible,
    setIsConfirmModalVisible,
    confirmationCode,
    setConfirmationCode,
    handleSignUp,
    handleConfirmSignUp,
  } = useSignUp();
  const dispatch = useDispatch();

  return (
    <View style={globalStyles.screenRegistrationContainer}>
      <View className="bg-app-white-100 w-full">
        {/* <Image
          source={require("@/assets/images/app-ressources/register-img.webp")}
          className="bg-cover w-full mt-32 "
        /> */}
      </View>
      <View>
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
              <Text style={globalStyles.title}>Enter Confirmation Code</Text>
              {/* <TextInput
                style={globalStyles.lightInput}
                placeholder="Confirmation Code"
                placeholderTextColor="#888"
                value={confirmationCode}
                onChangeText={setConfirmationCode}
              /> */}
              <InputComponent
                onChangeText={setConfirmationCode}
                placeholder="Confirmation Code"
                value={confirmationCode}
                icon={<MailIcon fill="#808080" />}
              />
              {/* <Button title="Confirm" onPress={handleConfirmSignUp} /> */}
              <ButtonComponent
                onPress={handleConfirmSignUp}
                title="Confirmer"
              />
              <Text>*vérifie tes mails</Text>
            </View>
          </View>
        </Modal>
        <Text
          style={globalStyles.title}
          className="text-app-black-300 mb-6 text-center"
        >
          Création de compte
        </Text>
        <Text
          className="text-app-black-300 mb-6 mt-2 text-center"
          style={globalStyles.subtitle}
        >
          Profitez de plus de fonctionnalités gratuites en vous connectant
        </Text>
        {/* <TextInput
          style={globalStyles.lightInput}
          placeholder="Username"
          placeholderTextColor="#888"
          onChangeText={(text) => setUsername(text)}
          value={username}
        /> */}
        <InputComponent
          onChangeText={(text) => setUsername(text)}
          placeholder="surnom"
          value={username}
          icon={<ProfileIcon fill="#808080" />}
        />
        <InputComponent
          onChangeText={(text) => setEmail(text)}
          placeholder="monemail@mail.com"
          value={email}
          icon={<MailIcon fill="#808080" />}
        />
        {/* <TextInput
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
        {/* <Button title="Sign Up" onPress={handleSignUp} /> */}
        <ButtonComponent
          onPress={handleSignUp}
          title="Je crée mon compte !"
          secondary={false}
        />
        <View className="mt-2 mb-4">
          <Button
            title="J’ai déjà un compte !"
            color={"#80AFFF"}
            onPress={() => navigation.navigate("SignIn")}
          />
        </View>
        <ExternalConnexionButtons />
        <Text className="text-center text-app-blue-300 text-base ">Ou</Text>

        <TouchableOpacity
          onPress={() => {
            dispatch(logAsGuest());
          }}
        >
          <Text className="text-xl text-center text-app-blue-200 underline mt-4">
            Continuer sans compte
          </Text>
        </TouchableOpacity>
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
