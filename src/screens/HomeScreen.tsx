import React from "react";
import { Text, Button } from "react-native";
import Screen from "../components/Screen";
import routes from "../navigation/routes";

function HomeScreen({ navigation }: any) {
  return (
    <Screen style={{}}>
      <Text>Common</Text>
      <Button title="Login" onPress={() => navigation.navigate(routes.LOGIN)} />
      <Text>Customer</Text>

      <Button
        title="Add Customer"
        onPress={() => navigation.navigate(routes.ADD_CUSTOMER)}
      />
      <Button
        title="Customer List"
        onPress={() => navigation.navigate(routes.CUSTOMER_LIST)}
      />
      <Text>Inventory</Text>

      <Button
        title="Add Product"
        onPress={() => navigation.navigate(routes.ADD_PRODUCT)}
      />
      <Button
        title="Product List"
        onPress={() => navigation.navigate(routes.PRODUCT_LIST)}
      />
      <Button
        title="Product Detail"
        onPress={() => navigation.navigate(routes.PRODUCT_DETAIL)}
      />
    </Screen>
  );
}

export default HomeScreen;
