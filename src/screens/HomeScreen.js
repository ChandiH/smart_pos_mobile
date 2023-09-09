import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import Screen from "../components/Screen";

import UserContext from "../context/UserContext";
import routes from "../navigation/routes";
import colors from "../config/colors";
import { getUserRole } from "../services/fakeAuthorizationService";

function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [access, setAccess] = useState([]);
  const accessFreeList = ["productList", "productDetail", "profile", "logout"];

  useEffect(() => {
    if (!user) navigation.replace(routes.LOGIN);
    else setAccess(getUserRole(user.userRole_id).access);
  }, [user]);

  const Button = ({ title, onPress, accessKey }) => {
    const disable =
      access.find((a) => a === accessKey) ||
      accessFreeList.find((a) => a === accessKey)
        ? false
        : true;
    const alert = () =>
      Alert.alert(
        "Access Denied",
        "You are not allowed to access this feature, please contact your branch manager or Owner"
      );
    return (
      <TouchableOpacity
        testID="button"
        style={disable ? styles.disabledBtn : styles.button}
        onPress={disable ? alert : onPress}
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
        <Button
          title="Add Product"
          accessKey="productForm"
          onPress={() => navigation.navigate(routes.ADD_PRODUCT)}
        />
        <Button
          title="Product List"
          accessKey="productList"
          onPress={() => navigation.navigate(routes.PRODUCT_LIST)}
        />
        <Button
          title="Product Detail"
          accessKey="productDetail"
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
        <Text style={styles.text}>Employee Management</Text>
        <Button
          title="Employee List"
          accessKey="employee"
          onPress={() => navigation.navigate(routes.EMPLOYEE_LIST)}
        />
        <Button
          title="Employee Detail"
          accessKey="employeeDetail"
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
          onPress={() => setUser(null) && navigation.navigate(routes.LOGIN)}
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
