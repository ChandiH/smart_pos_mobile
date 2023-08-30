import React from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import { Form, SubmitButton, FormInputField } from "../../components/forms";
import Screen from "../../components/Screen";

import customStyles from "../../config/customStyles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("name"),
  contact: Yup.number().required().label("contact").positive(),
});

function AddCustomerScreen(props) {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Screen style={styles.container}>
      <Text style={[customStyles.header2, { alignSelf: "flex-start" }]}>
        Customer Details
      </Text>

      <Form
        initialValues={{ name: "", contact: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <FormInputField
          label="Name"
          name="name"
          placeholder="Name"
          icon="account"
          width="100%"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="name"
        />
        <FormInputField
          label="Contact"
          name="contact"
          placeholder="Contact"
          icon="cellphone"
          width="100%"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        />
        <SubmitButton title="Save" width="100%" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: customStyles.colors.background2,
    flex: 1,
    alignItems: "center",
  },
});

export default AddCustomerScreen;
