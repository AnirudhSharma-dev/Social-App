import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../../src/screens/SignInScreen";
import SignUpScreen from "../../src/screens/SignUpScreen";

const authStack = createStackNavigator();
export default AuthStack = () => {
  return (
    <authStack.Navigator headerMode="none">
      <authStack.Screen name="SignIn" component={SignInScreen} />
      <authStack.Screen name="SignUp" component={SignUpScreen} />
    </authStack.Navigator>
  );
};

// export default AuthStack;
