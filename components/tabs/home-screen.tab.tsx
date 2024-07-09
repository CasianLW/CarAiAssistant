import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  ImageSourcePropType,
} from "react-native";
import ButtonComponent from "../general/button-component";
import SearchIcon from "@/assets/images/icons/search.icon";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/main-store";
import { Auth } from "aws-amplify";
import { clearUser } from "@/stores/slices/auth-slice";
import globalStyles from "@/styles/global.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { SharedTabParamList } from "./sharedScreens";
import { openURI } from "@/helpers/open-uri";

const HomeScreen: FC = () => {
  const user = useSelector((state: RootState) => state.auth.userData);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<SharedTabParamList>>();

  const signOut = async () => {
    try {
      await Auth.signOut();
      dispatch(clearUser());
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        className="ml-24 mt-24"
        source={require("@/assets/images/onboarding/decapotable.png")}
        style={styles.heroImage}
      />
      <View className="absolute mt-28 w-full ">
        <Text className="mb-16 text-left" style={styles.heroText}>
          Allons-y, trouvons la voiture à votre pied!
        </Text>
        <View className="w-[75%] mx-auto">
          <ButtonComponent
            style={{ width: "80%", margin: "auto" }}
            title="Recherche rapide"
            onPress={() => navigation.navigate("SearchUnknown")}
            icon={<SearchIcon stroke={"#337AFF"} strokeWidth={2} />}
            secondary
          />
        </View>
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={globalStyles.title}>Recherche par:</Text>

        <ScrollView
          horizontal
          className=""
          showsHorizontalScrollIndicator={false}
        >
          <CategoryButton
            onPress={() => navigation.navigate("SearchUnknown")}
            title="Aucune idée"
            description="Pour les personnes qui veulent découvrir"
            image={require("@/assets/images/app-ressources/homepage/unknown-search.png")}
          />
          <CategoryButton
            onPress={() => navigation.navigate("SearchCar")}
            title="Voiture"
            description="Déjà un modèle particulier en tête?"
            image={require("@/assets/images/app-ressources/homepage/car-search.png")}
          />
          <CategoryButton
            onPress={() => navigation.navigate("SearchCategory")}
            title="Catégorie"
            description="Pour les personnes ayant un type en tête"
            image={require("@/assets/images/app-ressources/homepage/category-search.png")}
          />
        </ScrollView>
        <View>
          <Text style={globalStyles.title}>Pour profiter pleinement:</Text>
          <ButtonComponent onPress={signOut} title="Je crée mon compte !" />
        </View>
        {/* {user?<View>
          <Text style={globalStyles.title}>Pour profiter pleinement:</Text>
          <ButtonComponent onPress={signOut} title="Je crée mon compte !" />
        </View>:<View>
          <Text style={globalStyles.title}>Autres fonctionnalités:</Text>
          <ButtonComponent onPress={() => navigation.navigate("SearchCategory")} title="Anciennes recherches" />
        </View>} */}

        <Text className="text-center text-app-blue-300 text-base my-2 ">
          Fonctionnalités gratuites grâce a :
        </Text>
        <TouchableOpacity onPress={() => openURI("https://bit.ly/michelin-ad")}>
          <View className="h-[120px] relative overflow-hidden rounded-3xl ">
            <Text
              className="absolute z-10  text-white mt-2 ml-4 text-xl shadow-black"
              style={{ fontFamily: "UrbanistSemiBold600" }}
            >
              Michelin: le top du pneu
            </Text>
            {/* <View className="h-full w-full bg-[rgba(00,000,000,50)]" /> */}
            <Image
              source={require("@/assets/images/ads/michelin-ad.png")}
              // source={require("@/assets/images/ads/ouipneu-michelin.png")}
              className="bg-contain h-36 w-full"
            />
          </View>
        </TouchableOpacity>
        {/* <ButtonComponent
          onPress={() => navigation.navigate("SearchResults")}
          secondary={true}
          white={false}
          title="Search Results"
        /> */}
      </View>
      <View style={styles.bottomContainer}>
        {/* <Text className="text-center" style={styles.signInText}>
          You are now signed in! {user?.email ?? ""}
        </Text> */}
        <Button
          color={"white"}
          title="Sign Out"
          onPress={signOut}
          // style={styles.signOutButton}
        />
      </View>
    </ScrollView>
  );
};

const CategoryButton: FC<{
  title: string;
  description: string;
  image: ImageSourcePropType;
  onPress: () => void;
}> = ({ title, description, image, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View className="flex content-between justify-between rounded-2xl bg-app-blue-200 mt-1 ml-1 mr-2 p-2 h-[120px] w-[140px] overflow-hidden">
      <Text
        style={[{ fontFamily: "UrbanistSemiBold600" }]}
        className="text-xl text-app-white-100"
      >
        {title}
      </Text>
      <Image className="absolute -right-4 -z-10 top-6" source={image} />
      <Text className="text-xs text-app-white-100 ">{description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D68E3",
  },
  heroImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  heroText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    // textAlign: "center",
    paddingLeft: 24,
    // marginTop: 20,
  },

  categoriesContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    // marginTop: 50,
    // marginHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: "#337AFF",
    padding: 15,
    borderRadius: 32,
    marginTop: 4,
    marginLeft: 4,
  },

  categoryDescription: {
    fontSize: 14,
    color: "#666",
  },
  bottomContainer: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  signInText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: "#FF6347", // Adjust the sign out button color
    borderRadius: 10,
    padding: 10,
  },
});

export default HomeScreen;
