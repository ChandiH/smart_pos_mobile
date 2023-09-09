import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../config/colors";

function SubmitButton({ title, width }) {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableOpacity testID="submit" onPress={handleSubmit} style={{ width }}>
      <LinearGradient style={styles.button} colors={colors.linearBtn}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default SubmitButton;
