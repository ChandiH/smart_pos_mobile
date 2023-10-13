import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LoginScreen, AddNewProduct } from "../screens";

import colors from "../config/colors";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: colors.light,
      activeTintColor: colors.primary,
      inactiveBackgroundColor: colors.light,
      inactiveTintColor: colors.medium,
    }}
  >
    <Tab.Screen
      name="AddProduct"
      component={AddNewProduct}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Add"
      component={AddCustomerScreen}
      options={{
        tabBarButton: NewListingButton,
      }}
    /> */}
    <Tab.Screen
      name="Login"
      component={LoginScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
