import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Button from "../Components/Button";
import { height, width } from "../Global/Constants";
import CircleDesign from "../Components/CircleDesign";
import { useNavigation } from "@react-navigation/native";
import Inputs from "../Components/Inputs";
import { commonStyle } from "../Global/commonstyles";
import Url from "../Url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../Global/Colors";
export default Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onPress = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(`${Url}/auth/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status !== "success") {
          setLoading(false);
          return setError(result.message);
        }
        const full_name = result.user.full_name;
        AsyncStorage.setItem("token", result.token);
        navigation.navigate("tasks", { full_name });
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={styles.container}>
      <CircleDesign />
      <View
        style={{
          marginTop: height / 4.5,

          paddingHorizontal: width / 40,
        }}
      >
        <Image
          source={require("../assets/Images/login.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <ScrollView style={[commonStyle]}>
          <Inputs
            placeholder="mary.eliot@gmail.com"
            label="Email"
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <Inputs
            placeholder="password"
            label="Password"
            value={password}
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true}
          />
        </ScrollView>
        {loading && <ActivityIndicator size={30} color={Colors.Primary} />}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <Button name="Login" onPress={onPress} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerImage: {
    height: height / 3.5,
    width: width / 2.6,
    alignSelf: "center",
  },
  container: {
    flex: 1,
  },
});
