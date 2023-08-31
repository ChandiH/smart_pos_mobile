import React from "react";
import { StyleSheet, Text, View } from "react-native";

function EmployeeDetailScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Employee Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default EmployeeDetailScreen;
