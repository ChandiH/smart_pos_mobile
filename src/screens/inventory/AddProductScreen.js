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
import { Icon, Button } from "@rneui/themed";
import PopUpModal from "../../components/PopUpModal";
import BarCodeReader from "../../components/sale/BarCodeReader";

import customStyles from "../../config/customStyles";

import { saveProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { getSuppliers } from "../../services/supplierService";

const initialValues = {
  product_name: "",
  product_desc: "",
  category_id: "",
  buying_price: "",
  retail_price: "",
  discount: "",
  product_barcode: "",
  supplier_id: "",
  images: [],
};

const validationSchema = Yup.object().shape({
  product_name: Yup.string().required().label("Name"),
  product_desc: Yup.string().label("Description"),
  category_id: Yup.object().required().nullable().label("Category"),
  buying_price: Yup.string().label("Buying Price"),
  retail_price: Yup.string().label("Retail Price"),
  discount: Yup.string().label("Discount"),
  product_barcode: Yup.string().label("Barcode"),
  supplier_id: Yup.object().required().nullable().label("Supplier"),
  images: Yup.array().min(1, "Please select at least one image."),
});

function AddProduct(props) {
  const [values, setValues] = React.useState(initialValues);
  const [barcodeModalVisible, setBarcodeModalVisible] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);
  const [barcode, setBarcode] = React.useState("");

  const [categories, setCategories] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);

  const fetchData = async () => {
    try {
      const { data: categories } = await getCategories();
      const { data: suppliers } = await getSuppliers();
      const formattedCategories = categories.map((category) => ({
        value: category.category_id,
        label: category.category_name,
      }));
      const formattedSuppliers = suppliers.map((supplier) => ({
        value: supplier.supplier_id,
        label: supplier.supplier_name,
      }));
      setCategories(formattedCategories);
      setSuppliers(formattedSuppliers);
    } catch (e) {
      console.log("Error in fetching Categories");
      alert(e.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (scanned) {
      setValues({ ...values, product_barcode: barcode });
      setBarcodeModalVisible(false);
    }
  }, [scanned]);

  mapToModel = (values) => {
    const product = {
      ...values,
      category_id: values.category_id.value,
      supplier_id: values.supplier_id.value,
    };
    return product;
  };

  const onSubmit = async (values) => {
    if (scanned) values.product_barcode = barcode;
    console.log("values", values);
    const product = mapToModel(values);
    try {
      const { data } = await saveProduct(product);
      console.log(data);
    } catch (ex) {
      console.log(JSON.stringify(ex.response.data.error));
    }
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
            name="product_name"
            placeholder="Name"
            width="100%"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="name"
          />
          <FormInputField
            label="Description"
            maxLength={255}
            multiline
            name="product_desc"
            numberOfLines={3}
            placeholder="short description (max length 255)"
          />
          <Text style={customStyles.label}>Prices</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <FormInputField
              keyboardType="numeric"
              maxLength={8}
              name="retail_price"
              placeholder="Retails Price"
              width={160}
            />
            <FormInputField
              keyboardType="numeric"
              maxLength={8}
              name="buying_price"
              placeholder="Buying Price"
              width={160}
            />
          </View>
          <FormInputField
            label="Discount"
            keyboardType="numeric"
            maxLength={8}
            name="discount"
            placeholder="Discount"
            width={160}
          />
          <FormPicker
            label="choose Catagory"
            items={categories}
            name="category_id"
            placeholder="Category"
            width="50%"
          />
          <FormImagePicker name="images" label="Product Images" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: "80%" }}>
              <FormInputField
                maxLength={255}
                name="product_barcode"
                value={values.product_barcode}
                label="Barcode"
                placeholder="scan barcode"
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
            name="supplier_id"
            placeholder="choose supplier"
            width="75%"
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
    // backgroundColor: customStyles.colors.background2,
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
