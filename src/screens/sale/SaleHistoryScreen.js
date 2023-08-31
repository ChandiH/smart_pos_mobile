import React from "react";
import { StyleSheet, Text, View } from "react-native";

function SaleHistoryScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Purchase History Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default SaleHistoryScreen;
