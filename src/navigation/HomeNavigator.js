import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  AddCustomerScreen,
  CustomerListScreen,
  AddProduct,
  ProductListScreen,
  ProductDetailScreen,
  EmployeeListScreen,
  EmployeeDetailScreen,
  CashierScreen,
  SaleHistoryScreen,
  CheckoutScreen,
  SaleSuccessScreen,
  CartScreen,
} from "../screens";

import UserContext from "../context/UserContext";

const Stack = createStackNavigator();

function HomeNavigator() {
  const { user } = useContext(UserContext);

  return (
    <Stack.Navigator mode="modal" initialRouteName={user ? "Home" : "Login"}>
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          {/* customer */}
          <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
          <Stack.Screen name="CustomerList" component={CustomerListScreen} />
          {/* Inventory */}
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="ProductList" component={ProductListScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          {/* Employee */}
          <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
          <Stack.Screen
            name="EmployeeDetail"
            component={EmployeeDetailScreen}
          />
          {/* Sale */}
          <Stack.Screen name="Cashier" component={CashierScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="CheckOut" component={CheckoutScreen} />
          <Stack.Screen name="SaleSuccess" component={SaleSuccessScreen} />
          <Stack.Screen name="SaleHistory" component={SaleHistoryScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default HomeNavigator;
