import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { height, width } from "../Global/Constants";
import Colors from "../Global/Colors";

const CircleDesign = ({ opacity, background }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        top: -height / 10,
        transform: [{ rotate: "145deg" }],
        left: -width / 4,
        flex: 1,
        marginBottom: height / 4.5,
      }}
    >
      <View
        style={[
          styles.circle1,
          {
            opacity: opacity || 0.7,
            backgroundColor: background || Colors.Primary,
          },
        ]}
      />
      <View
        style={[
          styles.circle2,
          {
            opacity: opacity || 0.7,
            backgroundColor: background || Colors.Primary,
          },
        ]}
      />
    </View>
  );
};
const commont_styles = {
  circle: {
    height: width / 2.4,
    width: width / 2.4,
    borderRadius: width / 2.4,
    backgroundColor: Colors.Primary,
  },
};
const styles = StyleSheet.create({
  circle1: {
    ...commont_styles.circle,
    marginTop: -height / 30,
  },
  circle2: {
    ...commont_styles.circle,
    marginLeft: -width / 6,
  },
});
export default CircleDesign;
