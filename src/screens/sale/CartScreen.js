import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AppButton from "../../components/AppButton";
import PopUpModal from "../../components/PopUpModal";
import QuantityWindow from "../../components/sale/QuantityWindow";
import { Card, ListItem, Avatar, Button } from "@rneui/themed";

import CartContext from "../../context/CartContext";
import routes from "../../navigation/routes";

function CartScreen({ navigation }) {
  const { cart, setCart } = useContext(CartContext);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState({});

  console.log(selectedProduct);
  console.log(cart);
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
          (product.quantity * product.retail_price).toFixed(2)
        );
      });
    }
    return parseFloat(totalPrice).toFixed(2);
  };

  const getDiscount = () => {
    let discount = 0;
    cart.forEach((product) => {
      discount += parseFloat(product.quantity * product.discount);
    });
    return parseFloat(discount).toFixed(2);
  };

  const addToCart = (quantity) => {
    setQuantityModalVisible(!quantityModalVisible);
    const newCart = [...cart];
    const index = newCart.findIndex(
      (product) => product.product_id === selectedProduct.product_id
    );
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const removeFromCart = (product) => {
    const newCart = [...cart];
    const index = newCart.findIndex((p) => p.product_id === product.product_id);
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const popUpSetQuantity = () => {
    return (
      <PopUpModal
        modalVisible={quantityModalVisible}
        setModalVisible={setQuantityModalVisible}
      >
        <QuantityWindow
          product={selectedProduct}
          onAddCart={addToCart}
          onCancel={() => {
            setQuantityModalVisible(!quantityModalVisible);
          }}
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
      <TouchableOpacity
        onPress={() => {
          setSelectedProduct(item);
          setQuantityModalVisible(true);
        }}
      >
        <ListItem bottomDivider>
          <Avatar
            source={{
              uri: item.product_image[0],
            }}
          />
          <ListItem.Content>
            <ListItem.Title>
              <Text>{item.product_name}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              <Text>
                {item.retail_price}
                {" * "}
                {item.quantity}
              </Text>
            </ListItem.Subtitle>
            <ListItem.Subtitle>
              <Text>
                {"Rs. "}
                {parseFloat(item.quantity * item.retail_price).toFixed(2)}
              </Text>
            </ListItem.Subtitle>
          </ListItem.Content>
          <Button
            title={"Remove"}
            color={"red"}
            onPress={() => removeFromCart(item)}
          />
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
        keyExtractor={(item) => item.product_barcode}
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
