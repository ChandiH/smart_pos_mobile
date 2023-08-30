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
  </Stack.Navigator>
);

export default HomeNavigator;
