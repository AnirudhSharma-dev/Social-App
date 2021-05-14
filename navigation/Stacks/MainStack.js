import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../../src/screens/HomeScreen";
import MessageScreen from "../../src/screens/MessageScreen";
import NotificationScreen from "../../src/screens/NotificationScreen";
import PostScreen from "../../src/screens/PostScreen";
import ProfileScreen from "../../src/screens/ProfileScreen";

export default MainStack = () => {
  const mainStack = createBottomTabNavigator();
  const tabBarOptions = {
    showLabel: false,
    style: {
      backgroundColor: "#222222",
    },
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = "ios-home";

      switch (route.name) {
        case "Home":
          iconName = "ios-home";
          break;
        case "Message":
          iconName = "ios-chatbox";
          break;
        case "Notification":
          iconName = "ios-notifications";
          break;
        case "Profile":
          iconName = "ios-person";
          break;

        default:
          iconName = "ios-home";
      }

      if (route.name === "Post") {
        return (
          <Ionicons
            name="ios-add-circle"
            size={48}
            color="#23a8d9"
            style={{
              shadowColor: "#23a8d9",
              shadowOffset: { width: 0, height: 10 },
              shadowRadius: 10,
              shadowOpacity: 0.3,
            }}
          />
        );
      }

      return (
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? "#ffffff" : "#666666"}
        />
      );
    },
  });
  return (
    <mainStack.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
    >
      <mainStack.Screen name="Home" component={HomeScreen} />
      <mainStack.Screen name="Message" component={MessageScreen} />
      <mainStack.Screen name="Post" component={PostScreen} />
      <mainStack.Screen name="Notification" component={NotificationScreen} />
      <mainStack.Screen name="Profile" component={ProfileScreen} />
    </mainStack.Navigator>
  );
};

// export default MainStack;
