import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import { useAuth } from "@/context/auth-context";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/main-store";
import { useDispatch } from "react-redux";
import { clearUser } from "@/stores/slices/auth-slice";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;
type HomeScreenProps = {
  setIsAuthenticated: (value: boolean) => void;
};
const HomeScreen: FC<HomeScreenProps> = ({ setIsAuthenticated }) => {
  // const { user, signOut } = useAuth(); // Use the useAuth hook to access user and signOut function
  const user = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch();

  const logUser = (userPassed: any) => {
    console.log(userPassed);
  };
  const signOutAppp = async () => {
    try {
      // await signOut();
      await Auth.signOut(); // Sign out of the Auth module
      // Reset the navigation state to the Auth stack
      dispatch(clearUser());

      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out: ", error); // Handle sign-out errors heres
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen</Text>
      <Text style={styles.text}>
        You are now signed in! {user?.email ?? ""}
        {/* {user?.signInUserSession?.idToken?.payload?.email ?? ""} */}
      </Text>
      <Button title="LOG USER" onPress={() => logUser(user)} />
      <Button title="Sign Out" onPress={signOutAppp} />
      {/* Add your home screen content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
