import React, { useEffect, useRef, FC } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface AdvancementBarProps {
  currentStep: number;
  totalSteps: number;
}

const AdvancementBar: FC<AdvancementBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  // Animated value for progress width
  const widthAnim = useRef(new Animated.Value(0)).current;

  // Calculate the width of the bar based on current step
  const barWidth = (currentStep + 1) / totalSteps;

  useEffect(() => {
    // Animate the width change when the current step updates
    Animated.timing(widthAnim, {
      toValue: barWidth,
      duration: 300, // Animation duration
      useNativeDriver: false, // 'width' is not supported by native animated module
    }).start();
  }, [currentStep, barWidth]);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Animated.View
          style={[
            styles.progress,
            {
              width: widthAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"], // Map the animated value to width percentage
              }),
            },
          ]}
        />
      </View>
      {/* <Text style={styles.text}>
        Step {currentStep + 1} of {totalSteps}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 40,
    justifyContent: "center",
  },
  bar: {
    height: 6,
    backgroundColor: "#BAD3FF",
    overflow: "hidden",
    borderRadius: 10,
  },
  progress: {
    height: 6,
    backgroundColor: "#337AFF",
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
});

export default AdvancementBar;
