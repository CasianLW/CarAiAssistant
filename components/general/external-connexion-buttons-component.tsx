import AppleIcon from "@/assets/images/icons/apple.icon";
import GoogleIcon from "@/assets/images/icons/google.icon";
import { signInWithFacebook, signInWithGoogle } from "@/services/auth.service";
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
  facebook?: boolean;
  register?: boolean;
  soon?: boolean;
}

const ExternalConnexionButtons: FC<ButtonComponentProps> = ({
  google = true,
  facebook = true,
  register = false,
  soon = true,
}) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Google Login Success:", result);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithFacebook();
      console.log("Facebook Login Success:", result);
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };
  return (
    <View>
      {soon && (
        <View className="z-50 bg-app-black-200 opacity-60 absolute h-[100%] w-full rounded-2xl">
          <Text className="text-app-white-100 text-xl text-center my-auto -rotate-12">
            Coming soon..
          </Text>
        </View>
      )}
      {google && (
        <TouchableOpacity style={[styles.button]} onPress={handleGoogleLogin}>
          <GoogleIcon />

          <Text style={[styles.buttonText]}>Connextion avec Google</Text>
        </TouchableOpacity>
      )}
      {facebook && (
        <TouchableOpacity style={[styles.button]} onPress={handleFacebookLogin}>
          <AppleIcon fill={"#000"} />
          <Text style={[styles.buttonText]}>Connextion avec facebook</Text>
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
