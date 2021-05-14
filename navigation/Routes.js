import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./Stacks/AppStack";
import { UserProvider } from "../src/context/UserContext";
import { FirebaseProvider } from "../src/context/FirebaseContext";
export default Routes = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  );
};

// export default Routes;
