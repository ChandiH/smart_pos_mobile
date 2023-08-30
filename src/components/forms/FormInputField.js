import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ErrorMessage from "./ErrorMessage";
import colors from "../../config/colors";
import defaultStyles from "../../config/customStyles";

function FormInputField({ name, label, width, icon = "", ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <View style={{ width }}>
      {label && <Text style={defaultStyles.label}>{label}</Text>}
      <View style={[styles.container, { width: width }]}>
        {icon && (
          <MaterialCommunityIcons style={styles.icon} name={icon} size={25} />
        )}
        <TextInput
          style={[defaultStyles.text]}
          placeholderTextColor={colors.white}
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          {...otherProps}
        />
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondry,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
});

export default FormInputField;
