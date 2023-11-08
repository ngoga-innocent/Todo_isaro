import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import CircleDesign from "../Components/CircleDesign";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../Global/Colors";
import { height, width } from "../Global/Constants";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Url from "../Url";
import Button from "../Components/Button";
import { useNavigation } from "@react-navigation/native";

export default Task = ({ route }) => {
  const { full_name } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [create, setCreate] = useState(false);
  const [newtodo, setNewTodo] = useState("");
  const [message, setMessage] = useState("");
  const [Tasks, setTasks] = useState([]);
  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.log("error in retrieving Token", error);
      return null;
    }
  }
  //calling Function
  useEffect(() => {
    fetchTodo();
  }, []);
  //Getting All To Do
  const fetchTodo = async () => {
    const token = await getToken();
    if (token == null) {
      navigation.navigate("Login");
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Url}/todo/get-todos/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "success") {
          console.log(result), setTasks(result.todos);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
  //Adding New To Do
  const AddTodo = async () => {
    const token = await getToken();
    if (token == null) {
      return navigation.navigate("Login");
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`); // Correct string interpolation

    var raw = JSON.stringify({
      task: newtodo,
      completed: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${Url}/todo/add-todo`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else {
          return Promise.reject("Failed to add a todo");
        }
      })
      .then((data) => {
        // Handle the successful response here
        setMessage("Todo added successfully");
        setCreate(false);
        fetchTodo();
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Failed to add a todo");
      });
  };

  //testing Ui

  const UpdateTasks = async (id) => {
    const token = await getToken();
    if (token == null) {
      navigation.navigate("Login");
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${Url}/todo/${id}/completed/true`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "success") {
          setTasks((prevState) =>
            prevState.map((task) =>
              task.id == id ? { ...task, completed: !task.completed } : task
            )
          );
        }
      })
      .catch((error) => console.log("error", error));
  };
  const CreateTodoUi = () => {
    return (
      <View style={{}}>
        <TextInput
          value={newtodo}
          onChangeText={(val) => setNewTodo(val)}
          multiline
          placeholder="What do you like to do?"
          autoCapitalize="none"
          style={{
            width: "100%",
            borderWidth: 1,
            paddingHorizontal: width / 50,
            borderRadius: width / 50,
            elevation: 10,
            paddingVertical: height / 80,
            backgroundColor: Colors.white,
          }}
        />
        {message && <Text style={{ color: "orange" }}>{message}</Text>}
        <Button name="Add Todo" onPress={AddTodo} />
      </View>
    );
  };
  const renderTask = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => UpdateTasks(item.id)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: height / 100,
        }}
      >
        <View
          style={{
            width: width / 30,
            height: width / 30,
            backgroundColor: item.completed ? Colors.Primary : null,
            borderRadius: 2,
            borderWidth: 1,
            marginRight: 5,
          }}
        />
        <Text style={{ fontWeight: "600" }}>{item.task}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.Primary,
          height: height / 2.7,
          opacity: 0.8,
        }}
      >
        <CircleDesign background={Colors.CircleBg} />
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/Images/tasks.png")}
            style={styles.image}
          />
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            Welcome {full_name}
          </Text>
        </View>
      </View>
      <View>
        <Image
          source={require("../assets/Images/watch.png")}
          resizeMode="contain"
          style={{
            width: width / 3.2,
            height: height / 9,
            alignSelf: "center",
            marginTop: height / 30,
          }}
        />
      </View>
      <View style={{ paddingHorizontal: width / 40 }}>
        <Text style={{ fontWeight: "bold", marginBottom: height / 60 }}>
          Tasks List
        </Text>
        <View
          style={{
            backgroundColor: Colors.white,
            paddingHorizontal: width / 25,
            paddingVertical: height / 60,
            borderRadius: width / 50,
            zIndex: 10,
            shadowColor: Colors.black,
            shadowRadius: 20,
            shadowOffset: 20,
            elevation: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: height / 50,
            }}
          >
            <Text style={{ fontWeight: "800" }}>Daily Tasks</Text>
            <TouchableOpacity onPress={() => setCreate(!create)}>
              <AntDesign name="pluscircleo" size={20} color={Colors.Primary} />
            </TouchableOpacity>
          </View>
          {create && <CreateTodoUi />}
          {loading ? (
            <ActivityIndicator color={Colors.Primary} size={30} />
          ) : (
            <FlatList data={Tasks} renderItem={(item) => renderTask(item)} />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: height / 6,
    //to add styles for circling the images retrieved form database
  },
});
