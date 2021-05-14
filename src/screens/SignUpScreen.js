import React, { useContext, useState } from "react";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
//import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await MediaLibrary.requestPermissionsAsync(); //await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) {
        setProfilePhoto(result.uri);
      }
    } catch (error) {
      console.log("Error @pickImage: ", error);
    }
  };

  const addProfilePhoto = async () => {
    const status = await getPermission();
    if (status !== "granted") {
      alert("We need permission to access you camera roll.");
      return;
    }

    pickImage();
  };

  const signUp = async () => {
    setLoading(true);

    const user = { username, email, password, profilePhoto };

    try {
      const createdUser = await firebase.createUser(user);

      setUser({ ...createdUser, isLoggedIn: true });
    } catch (error) {
      console.log("Error @signUp: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Container>
        <Main>
          <Text
            style={{ fontSize: 32, textAlign: "center", fontWeight: "300" }}
          >
            Sign up to get Started
          </Text>
        </Main>

        <TouchableOpacity
          style={{
            backgroundColor: "#e1e2e6",
            width: 80,
            height: 80,
            borderRadius: 40,
            alignSelf: "center",
            marginTop: 14,
            overflow: "hidden",
          }}
          onPress={addProfilePhoto}
        >
          {/* profilePhoto */}

          {profilePhoto ? (
            <Image source={{ uri: profilePhoto }} style={{ flex: 1 }} />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <AntDesign name="plus" color="#ffffff" size={24} />
            </View>
          )}
        </TouchableOpacity>

        <Auth>
          <AuthConatiner>
            <AuthTitle>Username</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              keybordType="email-address"
              onChangeText={(username) => setUsername(username.trim())}
              value={username}
            />
          </AuthConatiner>
          <AuthConatiner>
            <AuthTitle>Email Address</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              keybordType="email-address"
              onChangeText={(email) => setEmail(email.trim())}
              value={email}
            />
          </AuthConatiner>
          <AuthConatiner>
            <AuthTitle>Password</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password.trim())}
              value={password}
            />
          </AuthConatiner>
        </Auth>

        <TouchableOpacity
          style={{
            marginTop: -30,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 32,
            backgroundColor: "#8022d9",
            borderRadius: 6,
          }}
          disabled={loading}
          onPress={signUp}
        >
          {loading ? (
            <Loading />
          ) : (
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              SignUp
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 25, marginBottom: 30 }}>
          <Text style={{ fontSize: 13, textAlign: "center" }}>
            Already have an Account?{" "}
            <Text
              style={{ fontWeight: "bold", color: "#8022d9" }}
              onPress={() => navigation.navigate("SignIn")}
            >
              SignIn
            </Text>
          </Text>
        </TouchableOpacity>
        <HeaderGraphics>
          <RightCircle />
          <LeftCircle />
        </HeaderGraphics>
        <StatusBar barStyle="light-content" />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const Container = styled.View`
  flex: 1;
`;

const Main = styled.View`
  margin-top: 160px;
`;

const Auth = styled.View`
  margin: 16px 32px 32px;
`;

const AuthConatiner = styled.View`
  margin-bottom: 20px;
`;
const AuthTitle = styled(Text)`
  color: #8e93a1;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
`;
const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;
const HeaderGraphics = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;
const RightCircle = styled.View`
  background-color: #8022d9;
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  right: -100px;
  top: -200px;
`;
const LeftCircle = styled.View`
  background-color: #23a6d5;
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const StatusBar = styled.StatusBar``;
