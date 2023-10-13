import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { ButtonGroup, Card } from "@rneui/themed";
import AppButton from "../../components/AppButton";

import { getCustomers } from "../../services/customerService";

import routes from "../../navigation/routes";
import UserContext from "../../context/UserContext";
import CartContext from "../../context/CartContext";
import { submitOrder } from "../../services/orderService";

function CheckoutScreen({ navigation, route }) {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const { bill } = route.params;

  const paymentMethod = ["Cash", "Credit/Debit", "Mobile Pay", "Loyalty"];
  const [paymentMethodIndex, setPaymentMethodIndex] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState("");

  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomer, setfilteredCustomer] = useState({
    name: "Guest Customer",
    contact: "00000000000",
  });
  const [customerAdded, setCustomerAdded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: allCustomers } = await getCustomers();
      setCustomers(allCustomers);
    }
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    filterCustomers(text);
  };

  const filterCustomers = (query) => {
    let Customer = [...customers];
    if (query !== "") {
      Customer = customers.filter(
        (c) =>
          c.customer_name.toLowerCase().startsWith(query.toLowerCase()) ||
          c.customer_phone === query
      );
      if (Customer.length) {
        setCustomerAdded(true);
        return setfilteredCustomer(Customer[0]);
      }
    }
    setfilteredCustomer({
      name: "Guest Customer",
      contact: "00000000000",
    });
    setCustomerAdded(false);
    console.log(Customer);
  };

  const getProfit = () => {
    let profit = 0;
    cart.forEach((product) => {
      profit += parseFloat(
        product.quantity * (product.retail_price - product.buying_price) -
          product.discount
      );
    });
    return parseFloat(profit).toFixed(2);
  };

  const placeOrder = async () => {
    const order = {
      customer_id: filteredCustomer.customer_id,
      cashier_id: user.employee_id,
      total_amount: bill.totalPrice,
      profit: getProfit(),
      payment_method_id: "1",
      reference_id: paymentDetails,
      branch_id: user.branch_id,
    };

    const products = cart.map((product) => {
      return {
        product_id: product.product_id,
        quantity: product.quantity,
      };
    });

    console.log("order", order);
    console.log("Products", products);
    try {
      await submitOrder({
        salesData: {
          order,
          products,
        },
      });
      console.log("order placed");
      setCart([]);
      handleSearch("");
      setPaymentDetails("");
      navigation.push(routes.SALE_SUCCESS, {
        summary: {
          ...bill,
          paymentMethod: paymentMethod[paymentMethodIndex],
          paymentDetails: paymentDetails,
          customer: filteredCustomer,
        },
      });
    } catch (e) {
      console.log("error ocured");
      console.log(e.response.data);
    }
  };

  const renderDetail = (label, value) => (
    <View style={styles.detailView}>
      <Text style={styles.detailLabel}>{label}: </Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  const renderBillDetail = (label, value) => (
    <View style={styles.billDetailView}>
      <Text style={styles.detailBillLabel}>{label}: </Text>
      <Text style={styles.detailBillValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>Add customer</Card.Title>
        <Card.Divider />
        <TextInput
          style={styles.textInput}
          placeholder="Search Customer by name or contact"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        {renderDetail("Name", filteredCustomer.customer_name)}
        {renderDetail("Contact", filteredCustomer.customer_phone)}
      </Card>
      <Card>
        <Card.Title>Payment Method</Card.Title>
        <Card.Divider />
        <ButtonGroup
          buttonStyle={{ width: 100 }}
          buttonContainerStyle={{}}
          buttons={paymentMethod.slice(0, 2)}
          onPress={(index) => {
            setPaymentMethodIndex(index);
            setPaymentDetails("");
          }}
          selectedIndex={paymentMethodIndex}
        />
        <ButtonGroup
          buttonStyle={{ width: 100 }}
          buttonContainerStyle={{}}
          buttons={paymentMethod.slice(2, 4)}
          disabled={customerAdded ? [0] : [0, 1]}
          onPress={(index) => {
            setPaymentMethodIndex(index + 2);
            setPaymentDetails("");
          }}
          selectedIndex={paymentMethodIndex - 2}
        />
        {paymentMethodIndex === 0 && (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Text
              style={[
                styles.detailLabel,
                {
                  alignSelf: "center",
                  fontSize: 18,
                  marginHorizontal: 15,
                },
              ]}
            >
              Cash Given :
            </Text>
            <TextInput
              style={[styles.textInput, { width: "50%" }]}
              placeholder="Enter amount"
              onChangeText={(text) => setPaymentDetails(text)}
              value={paymentDetails}
              keyboardType="numeric"
            />
          </View>
        )}
        {paymentMethodIndex === 1 && (
          <TextInput
            style={styles.textInput}
            placeholder="Bill Reference Number"
            onChangeText={(text) => setPaymentDetails(text)}
            value={paymentDetails}
          />
        )}
      </Card>
      <Card>
        <Card.Title>Bill Details</Card.Title>
        <Card.Divider />
        {renderBillDetail("Total Items", bill.quantity)}
        {renderBillDetail("Subtotal", "Rs. " + bill.totalPrice)}
        {renderBillDetail("Discount", "Rs. " + bill.discount)}
        {renderBillDetail(
          "Grand Total",
          "Rs. " + (bill.totalPrice - bill.discount).toFixed(2)
        )}
      </Card>
      <View style={styles.bottomBtn}>
        <AppButton title="Pay" onPress={placeOrder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paymentButton: {
    margin: 5,
  },
  detailView: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  detailBillLabel: {
    fontSize: 16,
  },
  detailBillValue: {
    fontSize: 14,
  },
  billDetailView: {
    flexDirection: "row",
    marginBottom: 2,
    width: "100%",
    justifyContent: "space-between",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 10,
    marginVertical: 10,
  },
  bottomBtn: {
    alignSelf: "center",
    position: "absolute",
    width: "95%",
    zIndex: 2,
    bottom: 0,
  },
});
export default CheckoutScreen;
