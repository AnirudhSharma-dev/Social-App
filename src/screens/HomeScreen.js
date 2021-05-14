import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import tempData from "../../tempData/tempData";
import { Image } from "react-native";

const HomeScreen = () => {
  const renderPost = ({ item }) => (
    <View style={styles.PostContainer}>
      <View style={styles.PostHeaderContainer}>
        <Image
          style={styles.PostProfilePhoto}
          source={{ uri: item.user.profilePhotoUrl }}
        />
        <View style={styles.PostInfoContainer}>
          <Text style={{ fontSize: 16 }}>{item.user.username}</Text>
          <Text
            style={{
              fontSize: 11,
              color: "#c1c3cc",
              marginTop: 4,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,
            }}
          >
            {item.postedAt}
          </Text>
        </View>
        <View style={styles.Options}>
          <Entypo name="dots-three-horizontal" size={16} color="#73788b" />
        </View>
      </View>
      <View style={styles.Post}>
        <Text>{item.post}</Text>
        <Image style={styles.PostPhoto} source={{ uri: item.photoUrl }} />
        <View style={styles.PostDetails}>
          <View style={styles.PostLikes}>
            <Ionicons name="ios-heart" size={24} color="#73788b" />
            <Text
              style={{
                fontSize: 11,
                marginTop: 0,
                marginLeft: 0,
                marginBottom: 8,
                marginRight: 0,
              }}
            >
              {item.likes}
            </Text>
          </View>
          <View style={styles.PostComments}>
            <Ionicons name="ios-chatbox-ellipses" size={24} color="#73788b" />
            <Text
              style={{
                fontSize: 11,
                marginTop: 0,
                marginLeft: 0,
                marginBottom: 8,
                marginRight: 0,
              }}
            >
              {item.comments}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.feedConatiner}>
        <Text style={styles.Header}>Feed</Text>
        <FlatList
          data={tempData}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebecf3",
    paddingTop: 30,
  },
  Header: {
    fontSize: 24,
    fontWeight: "200",
    textAlign: "center",
  },
  PostContainer: {
    marginTop: 16,
    marginRight: 16,
    marginBottom: 0,
    marginLeft: 16,
    backgroundColor: "white",
    borderRadius: 6,
    padding: 8,
  },
  PostHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  PostProfilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  PostInfoContainer: {
    flex: 1,
    marginTop: 0,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 0,
  },
  Options: {},
  Post: {
    marginLeft: 64,
  },
  PostPhoto: {
    width: "100%",
    height: 150,
    borderRadius: 6,
  },
  PostDetails: {
    flexDirection: "row",
    marginTop: 8,
  },
  PostLikes: {
    flexDirection: "row",
    alignItems: "center",
  },
  PostDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
});
