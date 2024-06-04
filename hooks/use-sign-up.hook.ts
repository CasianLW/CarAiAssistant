import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "@/app/_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/slices/auth-slice";
// import { useAuth } from "@/context/auth-context";

type SignUpNavigationProp = StackNavigationProp<AuthStackParamList, "SignUp">;

const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  // const { setUser } = useAuth();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      await Auth.signUp({ username, password });
      setIsConfirmModalVisible(true);
    } catch (error) {
      console.error("Sign up error", error);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      const user = await Auth.signIn(username, password);
      // setUser(user);
      dispatch(setUser(user));

      // setIsAuthenticated(true);
    } catch (error) {
      console.error("Error confirming sign up:", error);
    } finally {
      setIsConfirmModalVisible(false);
    }
  };

  return {
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
  };
};

export default useSignUp;
