import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import { setToken, setUser } from "@/stores/slices/auth-slice";
import { RootState } from "@/stores/main-store";
import { apiLogin } from "@/utils/api";
import { DecodedToken, LoginPayload } from "@/interfaces/auth";
// import { decode as atob } from "base-64";
import JWT from "expo-jwt";

// const jwtDecode = require("jwt-decode");
// import { jwtDecode } from "jwt-decode";

const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );

  const handleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      const loginPayload: LoginPayload = { email, password };
      const response = await apiLogin(loginPayload);
      const { access_token } = response.data;

      if (access_token) {
        const decodedToken = JWT.decode(
          access_token,
          process.env.JWT_SECRET || ""
        );
        const userData: DecodedToken = {
          email: decodedToken.email,
          userId: decodedToken.userId,
          username: decodedToken.username,
          roles: decodedToken.roles,
          isBanned: decodedToken.isBanned,
          isPremium: decodedToken.isPremium,
        };
        dispatch(setUser(userData));
        dispatch(setToken(access_token));
      } else {
        throw new Error("No access token found in response");
      }
    } catch (error) {
      setError("Connexion échouée, vérifiez les identifiants et réeseyez.");
      setIsErrorModalVisible(true);
    } finally {
      setIsSigningIn(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isSigningIn,
    handleSignIn,
    error,
    isErrorModalVisible,
    setIsErrorModalVisible,
  };
};

export default useSignIn;
