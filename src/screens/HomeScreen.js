import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../components/Screen";

import UserContext from "../context/UserContext";
import routes from "../navigation/routes";
import colors from "../config/colors";

import { checkAccess } from "../services/authorizationService";

function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const accessFreeList = ["sale", "profile", "logout"];

  useEffect(() => {
    if (!user) navigation.replace(routes.LOGIN);
  }, [user]);

  const Button = ({ title, onPress, accessKey }) => {
    const accessGranted =
      checkAccess(user?.user_access, accessKey) ||
      accessFreeList.includes(accessKey);
    const alert = () =>
      Alert.alert(
        "Access Denied",
        "You are not allowed to access this feature, please contact your branch manager or Owner"
      );
    return (
      <TouchableOpacity
        testID="button"
        style={accessGranted ? styles.button : styles.disabledBtn}
        onPress={accessGranted ? onPress : alert}
      >
        <Text testID="label" style={styles.btnTitle}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Screen style={{}}>
      <ScrollView>
        {/* CUSTOMER */}
        <Text style={styles.text}>Customer Management</Text>
        <Button
          title="Add Customer"
          accessKey="customerForm"
          onPress={() => navigation.navigate(routes.ADD_CUSTOMER)}
        />
        <Button
          title="Customer List"
          accessKey="customers"
          onPress={() => navigation.navigate(routes.CUSTOMER_LIST)}
        />
        {/* INVENTORY */}
        <Text style={styles.text}>Inventory Management</Text>
        {/*
         * error in uploading images
         */}
        <Button
          title="Add Product"
          accessKey="productForm"
          onPress={() => navigation.navigate(routes.ADD_PRODUCT)}
        />
        <Button
          title="Product Catelog"
          accessKey="inventory"
          onPress={() => navigation.navigate(routes.PRODUCT_LIST)}
        />
        {/* EMPLOYEE */}
        <Text style={styles.text}>Employee Management</Text>
        <Button
          title="Employee List"
          accessKey="employee"
          onPress={() => navigation.navigate(routes.EMPLOYEE_LIST)}
        />
        <Button
          title="Employee Detail"
          accessKey="employeeDetails"
          onPress={() =>
            Alert.alert("please, navigate through employee list screen")
          }
        />
        {/* ORDER */}
        <Text style={styles.text}>Sale Processing</Text>
        <Button
          title="Cashier Page"
          accessKey="sale"
          onPress={() => navigation.navigate(routes.CASHIER)}
        />
        <Button
          title="Cart"
          accessKey="sale"
          onPress={() => navigation.navigate(routes.CART)}
        />
        <Button
          title="Sale History"
          accessKey="saleHistory"
          onPress={() => navigation.navigate(routes.SALE_HISTORY)}
        />
        {/* Common */}
        <Text style={styles.text}>Common</Text>
        <Button
          title="Profile"
          accessKey="profile"
          onPress={() => navigation.navigate(routes.PROFILE)}
        />
        <Button
          title="Log Out"
          accessKey="logout"
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            setUser(null);
          }}
        />
        <View style={{ height: 50 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.androidBtnBlue,
    padding: 5,
    margin: 5,
  },
  disabledBtn: {
    alignItems: "center",
    padding: 5,
    margin: 5,
    backgroundColor: colors.background,
  },
  btnTitle: {
    color: "white",
    fontSize: 15,
    margin: 5,
    fontWeight: "600",
  },
});

export default HomeScreen;
