import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { ButtonGroup, Card } from "@rneui/themed";
import AppButton from "../../components/AppButton";

import routes from "../../navigation/routes";

function CheckoutScreen({ navigation, route }) {
  const { bill } = route.params;

  const paymentMethod = ["Cash", "Credit/Debit", "Mobile Pay", "Loyalty"];
  const [paymentMethodIndex, setPaymentMethodIndex] = React.useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [customerAdded, setCustomerAdded] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
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
        {renderDetail("Name", "John Doe")}
        {renderDetail("Contact", "09123456789")}
      </Card>
      <Card>
        <Card.Title>Payment Method</Card.Title>
        <Card.Divider />
        <ButtonGroup
          buttonStyle={{ width: 100 }}
          buttonContainerStyle={{}}
          buttons={paymentMethod.slice(0, 2)}
          onPress={(index) => setPaymentMethodIndex(index)}
          selectedIndex={paymentMethodIndex}
        />
        <ButtonGroup
          buttonStyle={{ width: 100 }}
          buttonContainerStyle={{}}
          buttons={paymentMethod.slice(2, 4)}
          disabled={customerAdded ? [0] : [0, 1]}
          onPress={(index) => setPaymentMethodIndex(index + 2)}
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
              onChangeText={handleSearch}
              value={searchQuery}
              keyboardType="numeric"
            />
          </View>
        )}
        {paymentMethodIndex === 1 && (
          <TextInput
            style={styles.textInput}
            placeholder="Bill Reference Number"
            onChangeText={handleSearch}
            value={searchQuery}
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
                cashGiven: 0,
                change: 0,
                referenceNumber: "0000000-1111111",
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
