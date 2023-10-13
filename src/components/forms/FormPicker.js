import React from "react";
import { useFormikContext } from "formik";
import { Text } from "react-native";
import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";
import defaultStyles from "../../config/customStyles";

function FormPicker({ items, label = "", name, placeholder, width }) {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  return (
    <>
      {label && <Text style={defaultStyles.label}>{label}</Text>}
      <AppPicker
        width={width}
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormPicker;
