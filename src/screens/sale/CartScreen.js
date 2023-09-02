import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import AppButton from "../../components/AppButton";
import PopUpModal from "../../components/PopUpModal";
import { Card, ListItem, Avatar, Button } from "@rneui/themed";

import CartContext from "../../context/CartContext";
import routes from "../../navigation/routes";

function CartScreen({ navigation }) {
  const { cart, setCart } = useContext(CartContext);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    if (cart.length !== 0) {
      cart.forEach((product) => {
        totalPrice += parseFloat(
          (product.quantity * product.retailPrice.slice(4)).toFixed(2)
        );
      });
    }
    return parseFloat(totalPrice).toFixed(2);
  };

  const getDiscount = () => {
    let discount = 0;
    cart.forEach((product) => {
      discount += parseFloat(product.quantity * product.discount.toFixed(2));
    });
    return parseFloat(discount).toFixed(2);
  };

  const popUpSetQuantity = () => {
    return (
      <PopUpModal
        modalVisible={quantityModalVisible}
        setModalVisible={setQuantityModalVisible}
      >
        <Text style={styles.modalText}>{selectedProduct.name}</Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 30,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Quantity</Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="-"
              onPress={() =>
                quantity > 1
                  ? setQuantity(parseInt(quantity) - 1)
                  : setQuantity(1)
              }
              containerStyle={{ width: 40, aspectRatio: 1 }}
            />
            <TextInput
              style={{ height: 40, fontSize: 20, marginHorizontal: 10 }}
              value={quantity.toString()}
              onChangeText={(text) => setQuantity(text)}
              keyboardType="numeric"
            />
            <Button
              title="+"
              onPress={() => setQuantity(parseInt(quantity) + 1)}
              containerStyle={{
                width: 40,
                aspectRatio: 1,
              }}
            />
          </View>
        </View>
        <Button
          containerStyle={styles.button}
          buttonStyle={{ height: 50 }}
          onPress={() => {
            setQuantityModalVisible(!quantityModalVisible);
            addToCart({ ...selectedProduct, quantity: parseInt(quantity) });
            setQuantity(1);
          }}
          title="Add to Cart"
        />
        <Button
          containerStyle={styles.button}
          buttonStyle={{ height: 50, backgroundColor: "red" }}
          onPress={() => {
            setQuantityModalVisible(!quantityModalVisible);
            setQuantity(1);
          }}
          title="Cancel"
        />
      </PopUpModal>
    );
  };

  const renderBillDetail = (label, value) => (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 2,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.detailBillLabel}>{label}: </Text>
      <Text style={styles.detailBillValue}>{value}</Text>
    </View>
  );

  const renderListItem = ({ item }) => (
    <>
      <TouchableOpacity onPress={() => console.log("Pressed")}>
        <ListItem bottomDivider>
          <Avatar
            source={{
              uri: item.image[0],
            }}
          />
          <ListItem.Content>
            <ListItem.Title>
              <Text>{item.name}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              <Text>
                {item.retailPrice}
                {" * "}
                {item.quantity}
              </Text>
            </ListItem.Subtitle>
            <ListItem.Subtitle>
              <Text>
                {"Rs. "}
                {parseFloat(item.quantity * item.retailPrice.slice(4)).toFixed(
                  2
                )}
              </Text>
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
      <View style={{ width: "100%", height: 3 }} />
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginBottom: 250 }}
        data={cart}
        renderItem={renderListItem}
        keyExtractor={(item) => item.barcode}
      />

      {/* Button */}
      <View style={styles.bottomBtn}>
        <Card containerStyle={styles.billSummary}>
          <Card.Title>Bill Summary</Card.Title>
          <Card.Divider />
          {renderBillDetail("Total Items", getTotalQuantity())}
          {renderBillDetail("Subtotal", "Rs. " + getTotalPrice())}
          {renderBillDetail("Discount", "Rs. " + getDiscount())}
          {renderBillDetail(
            "Grand Total",
            "Rs. " + (getTotalPrice() - getDiscount()).toFixed(2)
          )}
        </Card>
        <AppButton
          title="Next"
          onPress={() =>
            navigation.push(routes.CHECKOUT, {
              bill: {
                quantity: getTotalQuantity(),
                totalPrice: getTotalPrice(),
                discount: getDiscount(),
              },
            })
          }
        />
        {popUpSetQuantity()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 25,
    marginBottom: 15,
    textAlign: "center",
  },
  detailBillLabel: {
    fontSize: 16,
  },
  detailBillValue: {
    fontSize: 14,
  },
  billSummary: {
    marginTop: 15,
    marginHorizontal: 5,
  },
  bottomBtn: {
    position: "absolute",
    width: "95%",
    bottom: 0,
    alignSelf: "center",
  },
});

export default CartScreen;
