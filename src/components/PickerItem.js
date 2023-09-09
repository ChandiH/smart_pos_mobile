import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "./AppText";

function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity testID="touchable" onPress={onPress}>
      <AppText style={styles.text}>{label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
    color: "black",
  },
});

export default PickerItem;
