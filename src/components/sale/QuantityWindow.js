import React, { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { Text, View, StyleSheet, TextInput } from "react-native";

const QuantityWindow = ({ product, onAddCart, onCancel }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(product.quantity);
  }, []);

  const handleIncrement = () => {
    const newQuantity = parseInt(quantity) + 1;
    setQuantity(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 1 ? parseInt(quantity) - 1 : 1;
    setQuantity(newQuantity);
  };

  const hadleTextInput = (value) => {
    const newQuantity = value < 1 ? 1 : parseInt(value);
    setQuantity(newQuantity);
  };

  return (
    <View>
      <Text style={styles.modalText}>{product.product_name}</Text>
      <View style={styles.quantityView}>
        <Text style={{ fontSize: 20 }}>Quantity</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            title="-"
            onPress={handleDecrement}
            containerStyle={styles.quantityBtn}
          />
          <TextInput
            style={{ height: 40, fontSize: 20, marginHorizontal: 10 }}
            value={quantity.toString()}
            onChangeText={hadleTextInput}
            keyboardType="numeric"
          />
          <Button
            title="+"
            onPress={handleIncrement}
            containerStyle={styles.quantityBtn}
          />
        </View>
      </View>
      <Button
        containerStyle={styles.button}
        buttonStyle={{ height: 50 }}
        onPress={() => {
          onAddCart(quantity);
          setQuantity(1);
        }}
        title="Add to Cart"
      />
      <Button
        containerStyle={styles.button}
        buttonStyle={{ height: 50, backgroundColor: "red" }}
        onPress={onCancel}
        title="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quantityView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  quantityBtn: {
    width: 40,
    aspectRatio: 1,
  },
  button: {
    margin: 5,
    borderRadius: 15,
    overflow: "hidden",
  },
  modalText: {
    fontSize: 25,
    marginBottom: 15,
    textAlign: "center",
  },
});
export default QuantityWindow;
