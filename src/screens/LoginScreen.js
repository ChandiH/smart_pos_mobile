import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { Form, FormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";

import UserContext from "../context/UserContext";
import colors from "../config/colors";

import { authenticate, decodeJWT } from "../services/authenticationService";
import axios from "axios";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().label("name"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const { user, setUser } = React.useContext(UserContext);

  fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    setUser(decodeJWT(token));
  };

  useEffect(() => {
    fetchData();
  });

  const onSubmit = async (values) => {
    try {
      const { data: response } = await authenticate({
        username: values.userName,
        password: values.password,
      });
      console.log(response);
      await AsyncStorage.setItem("token", response.token);
      setUser(decodeJWT(response.token));
      console.log(user);
      navigation.replace("Home");
    } catch (e) {
      console.log("Error Occured", JSON.stringify(e.response?.data?.error));
      return alert("Invalid UserName or Password");
      // this.setState({ errors: { ...e.response.data.error } });
    }

    // const user = authenticate(values);
    // if (!user) {
    //   return alert("Invalid UserName or Password");
    // }
    // setUser(user);
    // navigation.replace("Home");
    // console.log(user);
  };
  return (
    <Screen style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <Form
        initialValues={{ userName: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          name="userName"
          placeholder="UserName"
          icon="account"
          width="100%"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="name"
        />
        <FormField
          name="password"
          placeholder="Password"
          icon="lock"
          width="100%"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
        />
        <SubmitButton title="Login" width="100%" />
      </Form>
      <Text style={styles.forgerPswrd}>Forgot Password?</Text>
      <View style={styles.noteContainer}>
        <Text style={styles.note}>
          Use the Employee ID that can be created by the Owner or Manager in
          Manage Store -{">"} Employee Code
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50,
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
  loginText: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.white,
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  forgerPswrd: {
    marginTop: 10,
    color: colors.white,
  },
  noteContainer: {
    padding: 20,
    backgroundColor: colors.secondry,
    borderRadius: 20,
    margin: 15,
  },
  note: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default LoginScreen;
