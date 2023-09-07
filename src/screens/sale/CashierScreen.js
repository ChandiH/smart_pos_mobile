import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppButton from "../../components/AppButton";
import PopUpModal from "../../components/PopUpModal";
import BarCodeReader from "../../components/sale/BarCodeReader";
import QuantityWindow from "../../components/sale/QuantityWindow";
import { ListItem, Avatar, Button } from "@rneui/themed";
import { SearchBarAndroid } from "@rneui/base/dist/SearchBar/SearchBar-android";

import { getProducts } from "../../services/fakeProductService";

import CartContext from "../../context/CartContext";
import routes from "../../navigation/routes";

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
  };

  const addToCart = (quantity) => {
    setQuantityModalVisible(!quantityModalVisible);
    const productInCart = cart.find(
      (item) => item.product_id === selectedProduct.product_id
    );
    const newCart = [...cart];
    if (productInCart) {
      const index = newCart.indexOf(productInCart);
      newCart[index].quantity += quantity;
      setCart(newCart);
    } else {
      newCart.push({ ...selectedProduct, quantity });
      setCart(newCart);
    }
    setSelectedProduct({});
    setSearchQuery("");
    filterProduct("");
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
