import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

const LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setTimeout(async () => {
      const user = firebase.getCurrentUser();

      if (user) {
        const userInfo = await firebase.getUserInfo(user.uid);

        setUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: user.uid,
          username: userInfo.username,
          profilePhotoUrl: userInfo.profilePhotoUrl,
        });
      } else {
        setUser((state) => ({ ...state, isLoggedIn: false }));
      }
    }, 4500);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>SocialApp</Text>
      <LottieView
        source={require("../../assets/9844-loading-40-paperplane.json")}
        autoPlay
        loop
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222222",
  },
  Text: {
    fontSize: 32,
    color: "white",
  },
});
