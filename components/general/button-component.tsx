import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  View,
} from "react-native";

interface ButtonComponentProps {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  white?: boolean;
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  title,
  onPress,
  secondary = false,
  disabled = false,
  white = false,
}) => {
  return (
    <View className="w-fit">
      <Pressable
        className="w-fit"
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          {
            // backgroundColor: pressed ? '#DDDDDD' : 'transparent',
            opacity: pressed ? 0.8 : 1,
          }, // Your existing styles
        ]}
      >
        {({ pressed }) => (
          <LinearGradient
            colors={["#CB9684", "#895442", "#CB9684"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderRadius: 10, overflow: "hidden", padding: 1 }}
          >
            <LinearGradient
              colors={
                pressed
                  ? secondary
                    ? ["#895442", "#CB9684", "#895442"] // Colors when pressed and secondary
                    : white
                    ? ["#895442", "#CB9684", "#895442"] // Colors when pressed and white
                    : ["#03050C", "#03050C", "#03050C"] // Colors when pressed and neither secondary nor white
                  : secondary
                  ? ["#03050C", "#03050C", "#03050C"] // Colors when not pressed and secondary
                  : white
                  ? ["#FFFFFF", "#FFFFFF", "#FFFFFF"] // Colors when not pressed and white
                  : ["#895442", "#CB9684", "#895442"] // Default colors when not pressed and neither secondary nor white
              }
              // colors={["#895442", "#CB9684", "#895442"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                padding: 15,
                borderRadius: 9,
                backgroundColor: "#03050C ",
              }}
            >
              <Text
                className="font-semibold w-fit"
                style={{
                  textAlign: "center",
                  color: white ? "#03050C" : "#FFFFFF",
                }}
              >
                {title}
              </Text>
            </LinearGradient>
          </LinearGradient>
        )}
      </Pressable>
    </View>
  );
};

export default ButtonComponent;
