import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "../Screens/GetStarted";
import Register from "../Screens/Register";
import Task from "../Screens/Task";
import Login from "../Screens/Login";
export const StackNavigation = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="GetStarted" component={GetStarted} />
      <stack.Screen name="Register" component={Register} />
      <stack.Screen name="tasks" component={Task} />
      <stack.Screen name="Login" component={Login} />
    </stack.Navigator>
  );
};
