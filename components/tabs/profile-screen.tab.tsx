import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  ScrollView,
} from "react-native";
import ButtonComponent from "../general/button-component";
import { useDispatch } from "react-redux";
import NavSearch from "../screens/categories/nav.search";
import globalStyles from "@/styles/global.styles";
import conditionsAppText from "@/constants/conditions-de-vente.text";
import { openURI } from "@/helpers/open-uri";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/main-store";
import { signOut } from "@/helpers/sign-out.helper";

const ProfileScreen: FC = () => {
  const user = useSelector((state: RootState) => state.auth.userData);

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View className="bg-app-blue-100">
      <NavSearch />
      <View style={globalStyles.searchContainer}>
        <Text style={globalStyles.title}>Informations utilisateur:</Text>
        <Text>Pseudo: {user?.username}</Text>

        <Text>Email: {user?.email}</Text>
        {/* Status compte: {user?.isBanned ? "Banni" : "Actif"} */}
        <Text>Premium: {user?.isPremium ? "Actif" : "Non actif"}</Text>
        <Text className="mt-12" style={globalStyles.title}>
          Mot de passe oublié?
        </Text>
        <Text>Utilisez le portail prévu a cela via la page de connexion:</Text>
        <ButtonComponent
          secondary
          title="Mot de passe oublié"
          onPress={() => signOut(dispatch)}
          style={{ width: "80%", margin: "auto" }}
        />
        <Text className="mt-12" style={globalStyles.title}>
          Liens utiles
        </Text>
        <View>
          <Text style={styles.underline} onPress={() => setModalVisible(true)}>
            Termes et conditions
          </Text>
          <Text
            style={styles.underline}
            onPress={() =>
              openURI(
                process.env.LANDING_PAGE_URL ||
                  "https://carai-landing-admin.netlify.app"
              )
            }
          >
            Contactez le support
          </Text>
        </View>
        <View className="pt-10">
          <ButtonComponent
            title="Deconnexion"
            onPress={() => signOut(dispatch)}
            style={{ width: "80%", margin: "auto" }}
          />
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Termes et Conditions</Text>
            <ScrollView style={styles.modalBody}>
              <Text>{conditionsAppText}</Text>
            </ScrollView>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  underline: {
    marginVertical: 4,
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#0066FF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontFamily: "UrbanistSemiBold600",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalBody: {
    fontFamily: "UrbanistMedium500",
    maxHeight: 360,
    marginBottom: 20,
  },
});

export default ProfileScreen;
