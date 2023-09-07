import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormPicker,
  SubmitButton,
  FormImagePicker,
  FormInputField,
} from "../../components/forms";
import Screen from "../../components/Screen";

import { saveProduct } from "../../services/fakeProductService";
import customStyles from "../../config/customStyles";
import { Icon, Button } from "@rneui/themed";
import PopUpModal from "../../components/PopUpModal";
import BarCodeReader from "../../components/sale/BarCodeReader";
// import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

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
  barcode: Yup.string().min(1).max(10000).label("Barcode"),
  supplier: Yup.object().required().nullable().label("Supplier"),
  description: Yup.string().label("Description"),
});

function AddProduct(props) {
  const [values, setValues] = React.useState(initialValues);
  const [barcodeModalVisible, setBarcodeModalVisible] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);
  const [barcode, setBarcode] = React.useState("");

  useEffect(() => {
    if (scanned) {
      setValues({ ...values, barcode: barcode });
      setBarcodeModalVisible(false);
    }
  }, [scanned]);

  mapToModel = (values) => {
    const product = {
      name: values.title,
      retailPrice: values.retailPrice,
      buyingPrice: values.buyingPrice,
      category: values.category.label,
      image: values.images,
      weight: values.weight,
      unit: values.units,
      barcode: values.barcode,
      supplier_id: values.supplier.value,
      description: values.description,
    };
    return product;
  };

  const onSubmit = (values) => {
    if (scanned) values.barcode = barcode;
    console.log("values", values);
    const product = mapToModel(values);
    console.log("product", product);
    saveProduct(product);
    console.log("got", product);
  };

  const popUpBarcodeSanner = () => (
    <PopUpModal
      modalVisible={barcodeModalVisible}
      setModalVisible={setBarcodeModalVisible}
    >
      <BarCodeReader
        scanned={scanned}
        setScanned={setScanned}
        setBarcode={setBarcode}
      />
      <Button
        containerStyle={styles.button}
        buttonStyle={{ height: 50, backgroundColor: "red" }}
        onPress={() => setBarcodeModalVisible(!barcodeModalVisible)}
        title="Cancel"
      />
    </PopUpModal>
  );

  return (
    <Screen style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={customStyles.header2}>Product Details</Text>
        <Form
          initialValues={values}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: "80%" }}>
              <FormInputField
                maxLength={255}
                name="barcode"
                value={values.barcode}
                label="Barcode"
                placeholder="type or scan barcode"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setScanned(false);
                setBarcodeModalVisible(true);
              }}
              style={styles.barcodeBtn}
            >
              <Icon
                color="blue"
                name="barcode-scan"
                type="material-community"
                size={30}
              />
            </TouchableOpacity>
          </View>
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
      {popUpBarcodeSanner()}
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
  button: {
    margin: 5,
    borderRadius: 15,
    overflow: "hidden",
  },
  barcodeBtn: {
    backgroundColor: customStyles.colors.linearbtn1,
    justifyContent: "center",
    margin: 10,
    width: "15%",
    aspectRatio: 1,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});

export default AddProduct;
