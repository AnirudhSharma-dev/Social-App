import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

const ProfileScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const logOut = async () => {
    const loggedOut = await firebase.logOut();
    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.ProfilePhotoContainer}>
        <Image
          style={styles.ProfilePhoto}
          source={
            user.profilePhotoUrl === "default"
              ? require("../../assets/defaultProfilePhoto.jpg")
              : { uri: user.profilePhotoUrl }
          }
        />
      </View>
      <Text style={styles.TextUsername}>{user.username}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.TextStats}>21</Text>
          <Text style={styles.TextStatsTitle}>Post</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.TextStats}>111</Text>
          <Text style={styles.TextStatsTitle}>Followers</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.TextStats}>21</Text>
          <Text style={styles.TextStatsTitle}>Following</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutContainer} onPress={logOut}>
        <Text style={styles.TextLogout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    alignItems: "center",
    flex: 1,
  },
  ProfilePhotoContainer: {
    shadowOpacity: 0.8,
    shadowRadius: 30,
    shadowColor: "#222222",
  },
  ProfilePhoto: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  TextUsername: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginRight: 0,
    marginBottom: 32,
    marginLeft: 0,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    marginRight: 32,
    marginLeft: 32,
    marginBottom: 0,
    flex: 1,
  },
  statContainer: {
    alignItems: "center",
    flex: 1,
  },
  TextStats: {
    fontSize: 24,
    fontWeight: "200",
  },
  TextStatsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#c2c4cd",
  },
  logoutContainer: {
    marginBottom: 32,
  },
  TextLogout: {
    fontSize: 16,
    fontWeight: "600",
    color: "#23a8d9",
  },
});
