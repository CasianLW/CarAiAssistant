// globalStyles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screenRegistrationContainer: {
    marginTop: 80,
    marginHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  screenAppContainer: {
    marginHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },

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
    width: 42,
    height: 42,
    top: 52,
    left: 16,
    zIndex: 10,
  },
  title: {
    fontFamily: "UrbanistBold700",
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

  // Search global styles

  searchContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  loadingOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
