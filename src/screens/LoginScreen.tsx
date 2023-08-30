import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

import { Form, FormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().label("name"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props: any) {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Screen style={styles.container}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: colors.white,
          padding: 10,
        }}
      >
        Login
      </Text>
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
      <Text
        style={{
          marginTop: 10,
          color: colors.white,
        }}
      >
        Forgot Password?
      </Text>
      <View
        style={{
          padding: 20,
          backgroundColor: colors.secondry,
          borderRadius: 20,
          margin: 15,
        }}
      >
        <Text style={{ color: colors.white, fontWeight: "bold", fontSize: 15 }}>
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
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default LoginScreen;
