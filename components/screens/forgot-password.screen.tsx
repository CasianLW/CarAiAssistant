import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import { useNavigation } from "@react-navigation/native";
import useForgotPassword from "@/hooks/use-forgot-password.hook";
import globalStyles from "@/styles/global.styles";
import InputComponent from "../general/input-component";
import ButtonComponent from "../general/button-component";
import MailIcon from "@/assets/images/icons/mail.icon";
import LockIcon from "@/assets/images/icons/lock.icon";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;

const ForgotPasswordScreen: FC = () => {
  const {
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    isResetModalVisible,
    setIsResetModalVisible,
    handleForgotPassword,
    handlePasswordResetConfirm,
    isProcessing,
    errors,
    showSuccessMessage,
  } = useForgotPassword();
  const navigation = useNavigation<SignInNavigationProp>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.screenRegistrationContainer}>
        {isProcessing && (
          <View style={globalStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View>
          <Text style={globalStyles.title} className="mb-6 text-center">
            Mot de passe oublié ?
          </Text>
          <Text className="mb-6 mt-2 text-center" style={globalStyles.subtitle}>
            Entrez votre adresse email pour réinitialiser votre mot de passe
          </Text>
          <InputComponent
            onChangeText={(text) => setEmail(text)}
            placeholder="monemail@mail.com"
            value={email}
            icon={<MailIcon fill="#808080" />}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          {errors.message && (
            <Text style={styles.errorText}>{errors.message}</Text>
          )}
          <ButtonComponent
            onPress={handleForgotPassword}
            title="Recevoir le code"
          />
          {showSuccessMessage && (
            <View>
              <Text className="text-green-500">Réinitialisation réussie !</Text>
            </View>
          )}
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
              <InputComponent
                onChangeText={setCode}
                placeholder="Confirmation Code"
                value={code}
                icon={<MailIcon fill="#808080" />}
              />
              <InputComponent
                onChangeText={setNewPassword}
                placeholder="Nouveau mot de passe"
                value={newPassword}
                secure={true}
                icon={<LockIcon fill={"#808080"} />}
              />
              {errors.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              )}
              {errors.message && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
});

export default ForgotPasswordScreen;
