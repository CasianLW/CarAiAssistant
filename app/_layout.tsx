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
import SignInScreen from "@/components/screens/sign-in.screen";
import SignUpScreen from "@/components/screens/sign-up.screen";
import ForgotPasswordScreen from "@/components/screens/forgot-password.screen";
import HomeScreen from "@/components/tabs/home-screen.tab";
import ProfileScreen from "@/components/tabs/profile-screen.tab";
import "react-native-reanimated";
import { clearUser, setUser } from "@/stores/slices/auth-slice";
import OnboardingScreen from "@/components/screens/onboarding.screen";
import SearchUnknownScreen from "@/components/screens/categories/unknown.search";
import SearchCarScreen from "@/components/screens/categories/car.search";
import SearchCategoryScreen from "@/components/screens/categories/category.search";
import { sharedScreens } from "@/components/tabs/sharedScreens";
import { apiGetUserProfile } from "@/utils/api";
import { decodeToken, getStoredToken } from "@/helpers/auth-helpers";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
};

export type MainTabParamList = {
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
    {sharedScreens}
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
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#1D68E3",
            borderWidth: 0,
            shadowRadius: 0,
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
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
      {sharedScreens}
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
      setHasOnboarded(onboarded === "true");
      setIsLoading(false);
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getStoredToken();
        if (token) {
          const decodedToken = decodeToken(token);
          const userProfile = await apiGetUserProfile(decodedToken.userId);
          dispatch(setUser(userProfile));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [dispatch]);

  const [loaded, error] = useFonts({
    UrbanistBlack900: require("../assets/fonts/Urbanist-Black.ttf"),
    UrbanistBlackItalic900: require("../assets/fonts/Urbanist-BlackItalic.ttf"),
    UrbanistBold700: require("../assets/fonts/Urbanist-Bold.ttf"),
    UrbanistBoldItalic700: require("../assets/fonts/Urbanist-BoldItalic.ttf"),
    UrbanistExtraBold800: require("../assets/fonts/Urbanist-ExtraBold.ttf"),
    UrbanistExtraBoldItalic800: require("../assets/fonts/Urbanist-ExtraBoldItalic.ttf"),
    UrbanistExtraLight200: require("../assets/fonts/Urbanist-ExtraLight.ttf"),
    UrbanistExtraLightItalic200: require("../assets/fonts/Urbanist-ExtraLightItalic.ttf"),
    UrbanistItalicVariable: require("../assets/fonts/Urbanist-Italic-VariableFont_wght.ttf"),
    UrbanistItalic400: require("../assets/fonts/Urbanist-Italic.ttf"),
    UrbanistLight300: require("../assets/fonts/Urbanist-Light.ttf"),
    UrbanistLightItalic300: require("../assets/fonts/Urbanist-LightItalic.ttf"),
    UrbanistMedium500: require("../assets/fonts/Urbanist-Medium.ttf"),
    UrbanistMediumItalic500: require("../assets/fonts/Urbanist-MediumItalic.ttf"),
    UrbanistRegular400: require("../assets/fonts/Urbanist-Regular.ttf"),
    UrbanistSemiBold600: require("../assets/fonts/Urbanist-SemiBold.ttf"),
    UrbanistSemiBoldItalic600: require("../assets/fonts/Urbanist-SemiBoldItalic.ttf"),
    UrbanistThin100: require("../assets/fonts/Urbanist-Thin.ttf"),
    UrbanistThinItalic100: require("../assets/fonts/Urbanist-ThinItalic.ttf"),
    UrbanistVariable: require("../assets/fonts/Urbanist-VariableFont_wght.ttf"),

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

  return (
    <NavigationContainer independent={true} theme={AppTheme}>
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

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};
