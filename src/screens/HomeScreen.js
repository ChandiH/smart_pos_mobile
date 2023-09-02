import React, { useContext, useEffect } from "react";
import { Text, Button } from "react-native";
import Screen from "../components/Screen";

import UserContext from "../context/UserContext";
import routes from "../navigation/routes";

function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) navigation.replace(routes.LOGIN);
  }, [user]);

  return (
    <Screen style={{}}>
      <Text>Common</Text>
      <Button title="Login" onPress={() => navigation.navigate(routes.LOGIN)} />
      <Button
        title="Profile"
        onPress={() => navigation.navigate(routes.PROFILE)}
      />
      {/* CUSTOMER */}
      <Text>Customer</Text>
      <Button
        title="Add Customer"
        onPress={() => navigation.navigate(routes.ADD_CUSTOMER)}
      />
      <Button
        title="Customer List"
        onPress={() => navigation.navigate(routes.CUSTOMER_LIST)}
      />
      {/* INVENTORY */}
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
        onPress={() =>
          navigation.navigate(routes.PRODUCT_DETAIL, {
            product: {
              product_id: 1,
              name: "Muffin Chocolate Individual Wrap",
              description: "Pork - Tenderloin, Frozen",
              category: "Comedy|Drama|Romance",
              image: [
                "https://placehold.co/600x400/png",
                "https://placehold.co/200x200/png",
                "https://placehold.co/200x200/png",
              ],
              weight: 100,
              unit: 1,
              buyingPrice: "Rs. 48.67",
              retailPrice: "Rs. 8.85",
              discount: 1,
              barcode: "55154-5980",
              supplier_id: 98,
            },
          })
        }
      />
      {/* EMPLOYEE */}
      <Text>Employee</Text>
      <Button
        title="Employee List"
        onPress={() => navigation.navigate(routes.EMPLOYEE_LIST)}
      />
      <Button
        title="Employee Detail"
        onPress={() => navigation.navigate(routes.EMPLOYEE_DETAIL)}
      />
      {/* ORDER */}
      <Text>Order</Text>
      <Button
        title="Cashier Sale"
        onPress={() => navigation.navigate(routes.CASHIER)}
      />
      <Button title="Cart" onPress={() => navigation.navigate(routes.CART)} />
      <Button
        title="Sale History"
        onPress={() => navigation.navigate(routes.SALE_HISTORY)}
      />
    </Screen>
  );
}

export default HomeScreen;
