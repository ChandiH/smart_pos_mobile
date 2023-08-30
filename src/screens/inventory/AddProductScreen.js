import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormPicker,
  SubmitButton,
  FormImagePicker,
  FormInputField,
} from "../../components/forms";
import Screen from "../../components/Screen";

import customStyles from "../../config/customStyles";

const categories = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Camera", value: 3 },
];

const suppliers = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Camera", value: 3 },
];

const initialValues = {
  title: "",
  retailPrice: "",
  buyingPrice: "",
  category: null,
  images: [],
  weight: "",
  units: "",
  barcode: "",
  supplier: null,
  description: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("name"),
  buyingPrice: Yup.number().required().min(1).max(10000).label("Buying Price"),
  retailPrice: Yup.number().required().min(1).max(10000).label("Retail Price"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
  weight: Yup.number().required().min(1).max(10000).label("Weight"),
  units: Yup.number().required().min(1).max(10000).label("Units"),
  barcode: Yup.string().required().min(1).max(10000).label("Barcode"),
  supplier: Yup.object().required().nullable().label("Supplier"),
  description: Yup.string().label("Description"),
});

function AddProduct(props) {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Screen style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={customStyles.header2}>Product Details</Text>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <FormInputField
            label="Name"
            name="title"
            placeholder="Name"
            width="100%"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="name"
          />
          <Text style={customStyles.label}>Prices</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <FormInputField
              keyboardType="numeric"
              maxLength={8}
              name="retailPrice"
              placeholder="Retails Price"
              width={160}
            />
            <FormInputField
              keyboardType="numeric"
              maxLength={8}
              name="buyingPrice"
              placeholder="Buying Price"
              width={160}
            />
          </View>
          <FormPicker
            label="choose Catagory"
            items={categories}
            name="category"
            placeholder="Category"
            width="50%"
          />
          <FormImagePicker name="images" label="Product Images" />
          <FormInputField
            keyboardType="numeric"
            maxLength={255}
            name="weight"
            label="Weight"
            placeholder="add weight in grams"
          />
          <FormInputField
            keyboardType="numeric"
            maxLength={255}
            name="units"
            label="Units"
            placeholder="number of products per item"
          />
          <FormInputField
            maxLength={255}
            name="barcode"
            label="Barcode"
            placeholder="type barcode"
          />

          <FormPicker
            label="choose supplier"
            items={suppliers}
            name="supplier"
            placeholder="choose supplier"
            width="75%"
          />
          <FormInputField
            label="Description"
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="short description (max length 255)"
          />
          <SubmitButton title="Save" width="100%" />
        </Form>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: customStyles.colors.background2,
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
});

export default AddProduct;
