import React, { FC, useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import globalStyles from "@/styles/global.styles";

export enum ChatStepType {
  UNKNOWN = "UNKNOWN",
  CAR = "CAR",
  CATEGORY = "CATEGORY",
}

interface ChatStepProps {
  setChatData: (data: string) => void;
  chatData: string;
  chatType?: ChatStepType;
}

const ChatStep: FC<ChatStepProps> = ({
  setChatData,
  chatData,
  chatType = ChatStepType.UNKNOWN,
}) => {
  const [input, setInput] = useState(chatData || "");
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
        placeholder={
          chatType === ChatStepType.CAR
            ? "Example d'indications: plus sportive, plus elegante, plus grande, plus optimisée pour ..."
            : chatType === ChatStepType.CATEGORY
            ? "Imaginez vous avec votre véhicule, comment vous l'utiliseriez ? Vous pouvez décrire une activité/situation ou/et donner des informations plus techniques"
            : " Imaginez vous avec votre véhicule, comment vous l'utiliseriez ? ex: Je cherche une voiture daily fiable mais aussi capable de partir à la campagne avec tous les week-ends..."
        }
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
