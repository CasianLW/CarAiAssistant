import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import { useAuth } from "@/context/auth-context";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;

const useSignIn = (setIsAuthenticated: (value: boolean) => void) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      const user = await Auth.signIn(username, password);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Sign in error", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isSigningIn,
    handleSignIn,
  };
};

export default useSignIn;
