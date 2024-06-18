import React, { FC, useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import globalStyles from "@/styles/global.styles";

interface ChatStepProps {
  setChatData: (data: string) => void;
}

const ChatStep: FC<ChatStepProps> = ({ setChatData }) => {
  const [input, setInput] = useState("");
  useEffect(() => {
    setChatData(input);
  }, [input]);
  return (
    <View>
      <Text style={[globalStyles.subtitle]}>
        Décrivez comment vous aller utiliser le véhicule selon votre
        imagination:
      </Text>
      <TextInput
        value={input}
        multiline={true}
        onChangeText={setInput}
        onBlur={() => setChatData(input)}
        placeholder="J’aime les grands véhicules, moteur capable de faire du tout terrain si nécessaire et besoin de confort car je compte faire des aller - retours Turquie - France avec ...."
        placeholderTextColor="#808080"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 220,
    backgroundColor: "#EBF2FF",
    borderRadius: 16,
    padding: 12,
    textAlignVertical: "top",
    fontSize: 16,
  },
});

export default ChatStep;
