import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ErrorMessage from "./ErrorMessage";

import colors from "../../config/colors";
import defaultStyles from "../../config/customStyles";

function FormField({ name, width, icon, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <View style={[styles.container, { width: width }]} testID="modal">
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
    borderColor: colors.white,
    borderWidth: 2,
  },
  icon: {
    marginRight: 10,
    color: colors.white,
  },
});

export default FormField;
