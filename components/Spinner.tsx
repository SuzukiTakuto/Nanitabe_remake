import { View, Text, StyleSheet, Animated } from "react-native";
import React from "react";

const spinValue = new Animated.Value(0);

Animated.loop(
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  })
).start();

const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});

// nativewindではまだアニメーションは実験段階のため、styleSheetで実装
const Spinner = () => {
  return (
    <Animated.View
      style={[styles.springSpinnerRotator, { transform: [{ rotate: spin }] }]}
    />
  );
};

const styles = StyleSheet.create({
  springSpinnerRotator: {
    width: 60,
    height: 60,
    borderWidth: 60 / 7,
    borderColor: "transparent",
    borderRightColor: "#6750B9",
    borderTopColor: "#6750B9",
    borderRadius: 30,
  },
});

export default Spinner;
