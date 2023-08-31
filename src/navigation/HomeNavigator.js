import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  HomeScreen,
  LoginScreen,
  AddCustomerScreen,
  CustomerListScreen,
  AddProduct,
  ProductListScreen,
  ProductDetailScreen,
  EmployeeListScreen,
  EmployeeDetailScreen,
  CashierScreen,
  SaleHistoryScreen,
} from "../screens";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator mode="modal" initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    {/* customer */}
    <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
    <Stack.Screen name="CustomerList" component={CustomerListScreen} />
    {/* Inventory */}
    <Stack.Screen name="AddProduct" component={AddProduct} />
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    {/* Employee */}
    <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
    <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
    {/* Sale */}
    <Stack.Screen name="Cashier" component={CashierScreen} />
    <Stack.Screen name="SaleHistory" component={SaleHistoryScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
