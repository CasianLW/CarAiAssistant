import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";
import React, { FC, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/main-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration";
import SignInScreen from "@/components/screens/sign-in.screen";
import SignUpScreen from "@/components/screens/sign-up.screen";
import ForgotPasswordScreen from "@/components/screens/forgot-password.screen";
import HomeScreen from "@/components/tabs/home-screen.tab";
import ProfileScreen from "@/components/tabs/profile-screen.tab";
import "react-native-reanimated";
import { clearUser, setUser } from "@/stores/slices/auth-slice";
import OnboardingScreen from "@/components/screens/onboarding.screen";

Amplify.configure(config);

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
};

type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
};

const AuthNavigator: FC<{ hasOnboarded: boolean }> = ({ hasOnboarded }) => (
  <AuthStack.Navigator
    initialRouteName={hasOnboarded ? "SignIn" : "Onboarding"}
    screenOptions={{ headerShown: false }}
  >
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
  </AuthStack.Navigator>
);

const MainAppNavigator: FC = () => (
  <MainTab.Navigator>
    <MainTab.Screen name="Home" component={HomeScreen} />
    <MainTab.Screen name="Profile" component={ProfileScreen} />
  </MainTab.Navigator>
);

const GuestAppNavigator: FC = () => {
  const dispatch = useDispatch();
  const handleLoginTabPress = (event: { defaultPrevented: boolean }) => {
    dispatch(clearUser());
    event.defaultPrevented = true;
  };

  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen
        name="Login"
        component={SignInScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            handleLoginTabPress(event);
            navigation.navigate("Login");
          },
        })}
      />
    </MainTab.Navigator>
  );
};

const RootLayout: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const { isAuthenticated, isGuest } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem("hasOnboarded");
      // console.log("Onboarding status from AsyncStorage:", onboarded); // Debug
      setHasOnboarded(onboarded === "true");
      setIsLoading(false);
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await Amplify.Auth.currentAuthenticatedUser();
        const userData = {
          email: user.attributes.email,
          emailVerified: user.attributes.email_verified,
          userId: user.username,
        };
        dispatch(setUser(userData));
      } catch (error) {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, []);

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || isLoading) {
    return null; // or a loading spinner
  }

  // console.log("hasOnboarded:", hasOnboarded); // Debug

  return (
    <NavigationContainer independent={true}>
      {isAuthenticated ? (
        <MainAppNavigator />
      ) : isGuest ? (
        <GuestAppNavigator />
      ) : (
        <AuthNavigator hasOnboarded={hasOnboarded} />
      )}
    </NavigationContainer>
  );
};

export default RootLayout;
