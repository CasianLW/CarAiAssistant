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
    width: "80%",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
  },

  gradient: {
    borderRadius: 5, // If you want rounded corners
    padding: 15, // Adjust the padding as needed
    alignItems: "center",
  },
});
