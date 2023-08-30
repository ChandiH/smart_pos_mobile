import React from "react";
import { Text } from "react-native";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";
import defaultStyles from "../../config/customStyles";

function FormImagePicker({ name, label = "" }) {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const imageUris = values[name];

  const addImge = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
    console.log("imageUris", values);
  };

  const removeImage = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      {label && <Text style={defaultStyles.label}>{label}</Text>}
      <ImageInputList
        imageUris={imageUris}
        onAddImage={addImge}
        onRemoveImage={removeImage}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
