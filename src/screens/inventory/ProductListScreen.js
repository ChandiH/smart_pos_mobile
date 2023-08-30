import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ProductListScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Product List Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ProductListScreen;
