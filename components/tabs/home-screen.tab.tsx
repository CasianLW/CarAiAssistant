import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";
import { useAuth } from "@/context/auth-context";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/main-store";
import { useDispatch } from "react-redux";
import { clearUser } from "@/stores/slices/auth-slice";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicles } from "@/helpers/vehicle-query-list";
import { VehicleRecord } from "@/interfaces/vehicle-interface";
import SelectMake from "../vehicle/make-select-component";

type SignInNavigationProp = StackNavigationProp<AuthStackParamList, "SignIn">;
type HomeScreenProps = {
  setIsAuthenticated: (value: boolean) => void;
};
const HomeScreen: FC = () => {
  // const [make, setMake] = useState("");
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["vehicles", make],
  //   queryFn: () => fetchVehicles(make),
  //   enabled: !!make, // This will ensure the query only runs when 'make' is not empty
  // });

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
      {/* <Button title="LOG USER" onPress={() => logUser(user)} /> */}
      <Button title="Sign Out" onPress={signOutAppp} />
      {/* <View> */}
      {/* <TextInput
        style={styles.input}
        placeholder="Enter car make"
        placeholderTextColor={"gray"}
        onChangeText={setMake}
      />
      {data?.records.map((vehicle: VehicleRecord) => (
        <Text key={vehicle.recordid}>
          {vehicle.fields.make} - {vehicle.fields.model} ({vehicle.fields.year})
        </Text>
      ))} */}
      {/* </View> */}
      <SelectMake />
      {/* Add your home screen content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "70%",
    marginHorizontal: "auto",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default HomeScreen;
