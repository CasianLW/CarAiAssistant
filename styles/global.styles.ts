// globalStyles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  primaryButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  secondaryButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lightInput: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#EEECE9",
    borderRadius: 5,
    fontFamily: "UrbanistMedium500",

    // backgroundColor: "#f5f5f5",
    // borderWidth: 1,
  },
  headerTitle: {
    fontFamily: "UrbanistSemiBold600",
    position: "absolute",
    top: 52,
    width: "100%",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  arrowBack: {
    position: "absolute",
    width: 40,
    height: 40,
    top: 52,
    left: 16,
    zIndex: 10,
  },
  title: {
    fontFamily: "UrbanistSemiBold600",
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    marginVertical: 10,
  },
  subtitle: {
    fontFamily: "UrbanistMedium500",
    fontSize: 20,
    marginVertical: 10,
    color: "#337AFF",
  },
  footerText: {
    fontFamily: "UrbanistMedium500",
    width: "100%",
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },

  gradient: {
    borderRadius: 5, // If you want rounded corners
    padding: 15, // Adjust the padding as needed
    alignItems: "center",
  },
});
