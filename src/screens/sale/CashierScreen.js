import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AppButton from "../../components/AppButton";
import PopUpModal from "../../components/PopUpModal";
import BarCodeReader from "../../components/BarCodeReader";
import { ListItem, Avatar, Button } from "@rneui/themed";
import { SearchBarAndroid } from "@rneui/base/dist/SearchBar/SearchBar-android";

import { getProducts } from "../../services/fakeProductService";

import CartContext from "../../context/CartContext";
import routes from "../../navigation/routes";
import colors from "../../config/colors";

function CashierScreen({ navigation }) {
  const { cart, setCart } = useContext(CartContext);

  const [barcodeModalVisible, setBarcodeModalVisible] = useState(false);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);

  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [products, setProducts] = useState([]);
  const [fliteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const allProduct = await getProducts();
      setProducts(allProduct);
      setFilteredProducts(allProduct);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (scanned) {
      setSearchQuery(barcode);
      filterProduct(barcode);
      setScanned(false);
      setBarcodeModalVisible(false);
    }
  }, [scanned]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    filterProduct(text);
  };

  const filterProduct = (query) => {
    let filteredProducts = [...products];
    if (query !== "") {
      filteredProducts = products.filter(
        (item) =>
          item.name.toLowerCase().startsWith(query.toLowerCase()) ||
          item.barcode.toLowerCase().startsWith(query.toLowerCase())
      );
    }
    setFilteredProducts(filteredProducts);
    console.log(filteredProducts);
  };

  const addToCart = (product) => {
    const productInCart = cart.find(
      (item) => item.product_id === product.product_id
    );
    const newCart = [...cart];
    if (productInCart) {
      const index = newCart.indexOf(productInCart);
      newCart[index].quantity += product.quantity;
      setCart(newCart);
      return;
    }
    newCart.push({ ...product });
    setCart(newCart);
    setQuantity(1);
    setSelectedProduct({});
  };

  const popUpBarcodeSanner = () => (
    <PopUpModal
      modalVisible={barcodeModalVisible}
      setModalVisible={setBarcodeModalVisible}
    >
      <BarCodeReader
        scanned={scanned}
        setScanned={setScanned}
        setBarcode={setBarcode}
      />
      <Button
        containerStyle={styles.button}
        buttonStyle={{ height: 50, backgroundColor: "red" }}
        onPress={() => setBarcodeModalVisible(!barcodeModalVisible)}
        title="Cancel"
      />
    </PopUpModal>
  );

  const popUpSetQuantity = () => {
    return (
      <PopUpModal
        modalVisible={quantityModalVisible}
        setModalVisible={setQuantityModalVisible}
      >
        <Text style={styles.modalText}>{selectedProduct.name}</Text>
        <View style={styles.quantityView}>
          <Text style={{ fontSize: 20 }}>Quantity</Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="-"
              onPress={() =>
                quantity > 1
                  ? setQuantity(parseInt(quantity) - 1)
                  : setQuantity(1)
              }
              containerStyle={styles.quantityBtn}
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
              containerStyle={styles.quantityBtn}
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

  const rederListItem = ({ item }) => (
    <>
      <TouchableOpacity
        onPress={() => {
          setSelectedProduct({ ...item, quantity: 1 });
          setQuantityModalVisible(true);
        }}
      >
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
              <Text>{item.category}</Text>
            </ListItem.Subtitle>
            <ListItem.Subtitle>
              <Text>{item.retailPrice}</Text>
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
      <View style={{ width: "100%", height: 3 }} />
    </>
  );

  return (
    <View style={styles.container}>
      <SearchBarAndroid
        placeholder="Add Product"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        style={{ marginBottom: 120 }}
        data={fliteredProducts}
        renderItem={rederListItem}
        keyExtractor={(item) => item.barcode}
      />

      {/* Button */}
      <View style={styles.bottomBtn}>
        <AppButton
          title="Barcode Scanner"
          onPress={() => {
            setBarcodeModalVisible(true);
            setScanned(false);
          }}
        />
        <AppButton title="Cart" onPress={() => navigation.push(routes.CART)} />
        {popUpSetQuantity()}
        {popUpBarcodeSanner()}
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
    borderRadius: 15,
    overflow: "hidden",
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
  bottomBtn: {
    position: "absolute",
    width: "95%",
    bottom: 0,
    alignSelf: "center",
  },
});

export default CashierScreen;
