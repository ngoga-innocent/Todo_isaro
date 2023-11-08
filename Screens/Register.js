import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CircleDesign from "../Components/CircleDesign";
import { commonStyle } from "../Global/commonstyles";
import { height, width } from "../Global/Constants";
import Inputs from "../Components/Inputs";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Global/Colors";
import Url from "../Url";

export default Register = () => {
  const navigation = useNavigation();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const Register = () => {
    //Api Call
    if (password !== password1) {
      return setError("Passwords are not matching ");
    }
    setLoading(!Loading);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      full_name: fullname,
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Url}/auth/create-account`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        result.status == "success"
          ? navigation.navigate("Login")
          : console.log(result);
        setLoading(!Loading);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CircleDesign />

      <ScrollView
        style={[commonStyle.container, { paddingHorizontal: width / 40 }]}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}> Welcome Onboard</Text>
          <Text>Lets help you in completing your tasks</Text>
        </View>
        <Inputs
          placeholder="Marry Elliot"
          label="Full name"
          value={fullname}
          onChangeText={(val) => setFullName(val)}
        />
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
        <Inputs
          placeholder="Confirm password"
          label="Confirm Password"
          value={password1}
          onChangeText={(val) => setPassword1(val)}
          secureTextEntry={true}
        />
        {Loading && <ActivityIndicator size={20} color={Colors.Primary} />}
        <Button name="Register" onPress={Register} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // marginTop: height / 150,
          }}
        >
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: Colors.Primary }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
});
