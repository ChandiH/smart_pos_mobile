import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import {
  Form,
  SubmitButton,
  FormInputField,
  ErrorMessage,
} from "../../components/forms";
import Screen from "../../components/Screen";

import customStyles from "../../config/customStyles";
import { addCustomer } from "../../services/customerService";

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required().label("Name"),
  customer_phone: Yup.number().required().label("Contact Number").positive(),
  customer_email: Yup.string().email().label("Email"),
  customer_address: Yup.string().label("Address"),
});

function AddCustomerScreen({ navigation }) {
  const [error, setError] = useState({});

  const onSubmit = async (values) => {
    console.log("Add Customer Screen", values);
    try {
      const { data } = await addCustomer(values);
      console.log("Customer Added Successfully", data);
      return navigation.goBack();
    } catch (e) {
      console.log(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={[customStyles.header2, { alignSelf: "flex-start" }]}>
        Customer Details
      </Text>

      <Form
        initialValues={{
          customer_name: "",
          customer_phone: "",
          customer_email: "",
          customer_address: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <FormInputField
          label="Name"
          name="customer_name"
          placeholder="Name"
          icon="account"
          width="100%"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="name"
        />
        <FormInputField
          label="Contact"
          name="customer_phone"
          placeholder="Phone Number"
          icon="cellphone"
          width="100%"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        />
        <ErrorMessage
          error={error["customer_phone"]}
          visible={error["customer_phone"]}
        />
        <FormInputField
          label="Email"
          name="customer_email"
          placeholder="Email"
          icon="mail"
          width="100%"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <ErrorMessage
          error={error["customer_email"]}
          visible={error["customer_email"]}
        />
        <FormInputField
          label="Address"
          name="customer_address"
          placeholder="Address"
          icon="home"
          width="100%"
          autoCapitalize="none"
          autoCorrect={false}
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
