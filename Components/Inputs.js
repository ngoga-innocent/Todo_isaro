import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { height, width } from "../Global/Constants";
import Colors from "../Global/Colors";

export default Inputs = ({
  placeholder,
  label,
  secureTextEntry,
  value,
  onChangeText,
}) => {
  return (
    <View style={{width:'100%'}}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.inputs}
        placeholderTextColor={Colors.black}
        secureTextEntry={secureTextEntry || false}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    borderRadius: width / 35,
    borderWidth: 1,
    paddingVertical: height / 120,
    paddingHorizontal: width / 60,
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: height / 80,
    marginLeft: width / 60,
  },
});
