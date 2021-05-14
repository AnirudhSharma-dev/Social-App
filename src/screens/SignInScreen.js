import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const signIn = async () => {
    setLoading(true);

    try {
      await firebase.signIn(email, password);
      const uid = firebase.getCurrentUser().uid;
      const userInfo = await firebase.getUserInfo(uid);
      setUser({
        username: userInfo.username,
        email: userInfo.email,
        uid,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true,
      });
    } catch (error) {
      alert(error.message);
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
            Welcome
          </Text>
        </Main>

        <Auth>
          <AuthConatiner>
            <AuthTitle>Email Address</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              autoFocus={true}
              keybordType="email-address"
              onChangeText={(email) => setEmail(email.trim())}
              value={email}
            />
          </AuthConatiner>
          <AuthConatiner>
            <AuthTitle>Password</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="password"
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
          onPress={signIn}
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
              SignIn
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 25, marginBottom: 30 }}>
          <Text style={{ fontSize: 13, textAlign: "center" }}>
            New To The Social App?{" "}
            <Text
              style={{ fontWeight: "bold", color: "#8022d9" }}
              onPress={() => navigation.navigate("SignUp")}
            >
              SignUp
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

export default SignInScreen;

const Container = styled.View`
  flex: 1;
`;

const Main = styled.View`
  margin-top: 192px;
`;

const Auth = styled.View`
  margin: 45px 32px 32px;
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
