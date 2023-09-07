import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { ButtonGroup, Card } from "@rneui/themed";
import AppButton from "../../components/AppButton";

import { getCustomers } from "../../services/fakeCustomerService";

import routes from "../../navigation/routes";

function CheckoutScreen({ navigation, route }) {
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
      const allCustomers = await getCustomers();
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
          c.name.toLowerCase().startsWith(query.toLowerCase()) ||
          c.contact === query
      );
      if (Customer.length) return setfilteredCustomer(Customer[0]);
    }
    setfilteredCustomer({
      name: "Guest Customer",
      contact: "00000000000",
    });
    console.log(Customer);
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
        {renderDetail("Name", filteredCustomer.name)}
        {renderDetail("Contact", filteredCustomer.contact)}
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
        <AppButton
          title="Pay"
          onPress={() =>
            navigation.push(routes.SALE_SUCCESS, {
              summary: {
                ...bill,
                paymentMethod: paymentMethod[paymentMethodIndex],
                paymentDetails: paymentDetails,
                customer: filteredCustomer,
              },
            })
          }
        />
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
