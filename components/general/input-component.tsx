import React, { FC, FunctionComponent, ReactElement } from "react";
import { TextInput, View, StyleSheet, ViewStyle, Image } from "react-native";
import { ScreenContainer } from "react-native-screens";
import { SvgProps } from "react-native-svg";

interface InputComponentProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  white?: boolean;
  icon?: ReactElement; // We are using react-native-svg
  style?: ViewStyle;
  secure?: boolean;
  number?: boolean;
}

const InputComponent: FC<InputComponentProps> = ({
  placeholder,
  value,
  onChangeText,
  disabled = false,
  white = false,
  icon = null,
  style = {},
  secure = false,
  number = false,
}) => {
  const inputStyle = () => {
    if (white) {
      return styles.whiteInput;
    } else {
      return styles.defaultInput;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {icon ? icon : ""}
      <TextInput
        keyboardType={number ? "numeric" : "default"}
        placeholder={placeholder}
        placeholderTextColor={"#808080"}
        value={value}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        style={[inputStyle(), disabled ? styles.disabledInput : null]}
        editable={!disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 12,
    // borderWidth: 1,
    // borderColor: "#ccc",
    borderRadius: 16,
    backgroundColor: "#EBF2FF",
    marginVertical: 8,
  },

  defaultInput: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: "#337AFF",
  },
  whiteInput: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: "#808080",
    backgroundColor: "#FFF",
  },
  disabledInput: {
    backgroundColor: "#e0e0e0",
  },
  iconStyle: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

export default InputComponent;
