import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/customStyles";
import colors from "../config/colors";

function AppTextInput({
  icon = "",
  label = "",
  style,
  width = "100%",
  placeholder = "",
  ...otherProps
}) {
  return (
    <View style={{ width }}>
      {label && <Text style={defaultStyles.label}>{label}</Text>}
      <View style={styles.container}>
        {icon && (
          <MaterialCommunityIcons style={styles.icon} name={icon} size={25} />
        )}
        <TextInput
          placeholder={placeholder}
          style={[defaultStyles.text, style]}
          placeholderTextColor={defaultStyles.colors.medium}
          {...otherProps}
        />
      </View>
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

export default AppTextInput;
