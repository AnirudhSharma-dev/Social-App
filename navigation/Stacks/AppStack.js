import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext } from "../../src/context/UserContext";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import LoadingScreen from "../../src/screens/LoadingScreen";
export default AppStack = () => {
  const appStack = createStackNavigator();
  const [user] = useContext(UserContext);

  return (
    <appStack.Navigator headerMode="none">
      {user.isLoggedIn === null ? (
        <appStack.Screen name="LoadingScreen" component={LoadingScreen} />
      ) : user.isLoggedIn ? (
        <appStack.Screen name="Main" component={MainStack} />
      ) : (
        <appStack.Screen name="Auth" component={AuthStack} />
      )}
    </appStack.Navigator>
  );
};

// export default AppStack;
