import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CircleDesign from "../Components/CircleDesign";
import { height, width } from "../Global/Constants";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";

export default GetStarted = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <CircleDesign />
      <View style={{ flex: 1, marginTop: height / 4.5, alignItems: "center",paddingHorizontal:width/40 }}>
        <Image
          source={require("../assets/Images/getStarted.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <View style={{ alignItems: "center",marginBottom:height/7 }}>
          <Text style={styles.headerTitle}>Get Things done with TODO</Text>
          <Text
            style={{
              textAlign: "center",
              width: width / 1.4,
              fontSize: 12,
              marginTop: height / 50,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere
            gravida purus id eu condimentum est diam quam. Condimentum blandit
            diam.
          </Text>
        </View>
        <Button name="Get Started" onPress={onPress} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: height / 3.5,
    width: width / 2.6,
    alignSelf: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
