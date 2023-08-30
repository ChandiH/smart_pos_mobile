import React from "react";
import { StyleSheet, Text, View } from "react-native";

function productDetailScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Product Detauls Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default productDetailScreen;
