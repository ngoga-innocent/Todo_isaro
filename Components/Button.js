import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Colors from "../Global/Colors";
import { height, width } from "../Global/Constants";

export default Button = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary,
    width: "100%",
    paddingVertical: height / 70,
    alignItems: "center",
    borderRadius: width / 60,
    marginVertical: height / 70,
  },
  name: {
    fontWeight: "bold",
  },
});
