import React from "react";
import { StyleSheet, Text, View } from "react-native";

function CustomerListScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Customer List Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CustomerListScreen;
