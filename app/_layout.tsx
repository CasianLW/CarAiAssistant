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
import SearchUnknownScreen from "@/components/screens/categories/unknown.search";
import SearchCarScreen from "@/components/screens/categories/car.search";
import SearchCategoryScreen from "@/components/screens/categories/category.search";
import { sharedScreens } from "@/components/tabs/sharedScreens";

Amplify.configure(config);

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
  // SearchUnknown: undefined;
  // SearchCar: undefined;
  // SearchCategory: undefined;
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
    {/* <MainTab.Screen name="SearchUnknown" component={SearchUnknownScreen} />
    <MainTab.Screen name="SearchCar" component={SearchCarScreen} />
    <MainTab.Screen name="SearchCategory" component={SearchCategoryScreen} /> */}
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
    <MainTab.Navigator
    // styles for the bottom tab bar (menu)
    // screenOptions={{
    //   tabBarStyle: {
    //     backgroundColor: "#337AFF", // Adjust the background color as needed
    //     borderTopWidth: 0, // Remove the top border
    //     elevation: 0, // Remove shadow on Android
    //     shadowOpacity: 0, // Remove shadow on iOS
    //     borderWidth: 0,
    //     shadowRadius: 0,
    //     shadowOffset: {
    //       width: 0,
    //       height: 0,
    //     },
    //   },
    //   tabBarActiveTintColor: "#FFFFFF",
    //   tabBarInactiveTintColor: "#BBBBBB",
    // }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
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

      {/* <MainTab.Screen name="SearchUnknown" component={SearchUnknownScreen} />
      <MainTab.Screen name="SearchCar" component={SearchCarScreen} />
      <MainTab.Screen name="SearchCategory" component={SearchCategoryScreen} /> */}

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
    // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // Urbanist: require("../assets/fonts/Urbanist-VariableFont_wght.ttf"),
    // UrbanistItalic: require("../assets/fonts/Urbanist-Italic-VariableFont_wght.ttf"),
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

  // console.log("hasOnboarded:", hasOnboarded); // Debug

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
