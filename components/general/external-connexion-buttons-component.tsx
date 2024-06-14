import AppleIcon from "@/assets/images/icons/apple.icon";
import GoogleIcon from "@/assets/images/icons/google.icon";
import React, { FC } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface ButtonComponentProps {
  google?: boolean;
  apple?: boolean;
  register?: boolean;
}

const ExternalConnexionButtons: FC<ButtonComponentProps> = ({
  google = true,
  apple = true,
  register = false,
}) => {
  return (
    <View className="gap-2">
      {google && (
        <TouchableOpacity style={[styles.button]}>
          <GoogleIcon />

          <Text style={[styles.buttonText]}>Connextion avec Google</Text>
        </TouchableOpacity>
      )}
      {apple && (
        <TouchableOpacity style={[styles.button]}>
          <AppleIcon fill={"#000"} />
          <Text style={[styles.buttonText]}>Connextion avec Apple</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderRadius: 16,
    // paddingVertical: 15,
    // paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    maxWidth: "100%",
    fontFamily: "UrbanistMedium500",
    height: 52,
    // flex: 1,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "UrbanistSemiBold600",
  },
  buttonPrimary: {
    backgroundColor: "#337AFF",
    borderColor: "#FFFFFF",
  },
  buttonSecondary: {
    backgroundColor: "#FFFFFF",
    borderColor: "#337AFF",
  },
});

export default ExternalConnexionButtons;
