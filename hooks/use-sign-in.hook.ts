import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import { useAuth } from "@/context/auth-context";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/slices/auth-slice";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/main-store";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;

const useSignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { setUser } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      const user = await Auth.signIn(username, password);
      // console.log("User signed in", user);
      const userData = {
        // id: user.attributes.sub,
        email: user.attributes.email,
        emailVerified: user.attributes.email_verified,
        userId: user.username,
      };
      // console.log("User data", userData);
      dispatch(setUser(userData));
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
