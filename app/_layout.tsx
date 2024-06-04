import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  EventArg,
  NavigationContainer,
  ThemeProvider,
  useFocusEffect,
} from "@react-navigation/native";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";

import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as SplashScreen from "expo-splash-screen";
import { FC, useCallback, useEffect, useState } from "react";

import { useColorScheme } from "@/components/use-color-scheme";
import SignInScreen from "@/components/screens/sign-in.screen";
import SignUpScreen from "@/components/screens/sign-up.screen";
import ForgotPasswordScreen from "@/components/screens/forgot-password.screen";
import HomeScreen from "@/components/tabs/home-screen.tab";
import ProfileScreen from "@/components/tabs/profile-screen.tab";
import { AuthProvider } from "@/context/auth-context";

// import Amplify from 'aws-amplify';
import config from "../amplifyconfiguration"; // Adjust the path to where your amplifyconfiguration.js is located
import { Amplify } from "aws-amplify";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "@/stores/main-store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/helpers/query-client";
import "react-native-reanimated";
import { clearUser, setUser } from "@/stores/slices/auth-slice";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

// Amplify.configure(config);
Amplify.configure(config);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated, isGuest } = useSelector(
    (state: RootState) => state.auth
  );

  // Dummy authentication check function
  useEffect(() => {
    // Actual check for current authenticated user
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
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // return <RootLayoutNav />;
  return (
    <NavigationContainer independent={true}>
      {isAuthenticated ? (
        <MainAppNavigator />
      ) : isGuest ? (
        <GuestAppNavigator />
      ) : (
        <AuthNavigator />
      )}
      {/* <RootLayoutNav /> */}
    </NavigationContainer>
  );
}

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack.Navigator
//         initialRouteName="(tabs)"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="(tabs)" component={MainAppNavigator} />
//         <Stack.Screen
//           name="SignIn"
//           component={SignInScreen}
//           options={{ title: "Sign In" }}
//         />
//         <Stack.Screen
//           name="SignUp"
//           component={SignUpScreen}
//           options={{ title: "Sign Up" }}
//         />
//         <Stack.Screen
//           name="ForgotPassword"
//           component={ForgotPasswordScreen}
//           options={{ title: "Forgot Password" }}
//         />
//       </Stack.Navigator>
//     </ThemeProvider>
//   );
// }
const AuthNavigator: FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <AuthStack.Screen name="SignIn" component={SignInScreen} /> */}
      <AuthStack.Screen name="SignIn">
        {() => <SignInScreen />}
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUp">
        {() => <SignUpScreen />}
      </AuthStack.Screen>
      {/* <AuthStack.Screen name="SignUp" component={SignUpScreen} /> */}
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      {/* Add more auth screens as needed */}
    </AuthStack.Navigator>
  );
};
const MainAppNavigator: FC = () => {
  return (
    <MainTab.Navigator>
      {/* <MainTab.Screen name="Home" component={HomeScreen} /> */}
      <MainTab.Screen name="Home">{() => <HomeScreen />}</MainTab.Screen>
      <MainTab.Screen name="Profile" component={ProfileScreen} />
      {/* Add more MainTabs as needed */}
    </MainTab.Navigator>
  );
};

const GuestAppNavigator: FC = () => {
  const dispatch = useDispatch();
  const handleLoginTabPress = (event: EventArg<"tabPress">) => {
    dispatch(clearUser());
  };

  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home">{() => <HomeScreen />}</MainTab.Screen>
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

const LoginScreenWithClearUser: FC = () => {
  const dispatch = useDispatch();
  dispatch(clearUser());

  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(clearUser());
  //   }, [dispatch])
  // );

  return <SignInScreen />;
};
