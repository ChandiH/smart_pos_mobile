import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../config/colors";

type propTypes = {
  title: string;
  onPress: () => void;
};
const AppButton = ({ title, onPress }: propTypes) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.linearbtn1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 5,
    height: 50,
  },
  text: { color: colors.white, fontSize: 18, textTransform: "uppercase" },
});

export default AppButton;
