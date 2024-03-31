import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;

const useForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation<SignInNavigationProp>();
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  const handleForgotPassword = async () => {
    try {
      await Auth.forgotPassword(username);
      setIsResetModalVisible(true);
    } catch (error) {
      console.error("Forgot password error", error);
    }
  };

  const handlePasswordResetConfirm = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
      setIsResetModalVisible(false);
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Password reset confirmation error", error);
    }
  };

  return {
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
  };
};

export default useForgotPassword;
