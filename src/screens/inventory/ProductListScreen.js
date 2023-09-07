import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import { SearchBarAndroid } from "@rneui/base/dist/SearchBar/SearchBar-android";
import { getProducts } from "../../services/fakeProductService";
import colors from "../../config/colors";
import routes from "../../navigation/routes";

function ProductListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const products = await getProducts();
    setProducts(products);
    setFilteredData(products);
  }

  useEffect(() => {
    // fetch customers
    fetchProducts();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    filterProducts(text);
  };

  const filterProducts = (query) => {
    let filteredProducts = [...products];
    if (query !== "") {
      filteredProducts = products.filter(
        (item) =>
          item.name.toLowerCase().startsWith(query.toLowerCase()) ||
          item.barcode.toLowerCase().startsWith(query.toLowerCase())
      );
    }
    setFilteredData(filteredProducts);
  };

  return (
    <View style={styles.container}>
      <SearchBarAndroid
        containerStyle={{
          backgroundColor: colors.background2,
          borderRadius: 15,
          marginBottom: 10,
        }}
        placeholder="Search Products"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        style={{ marginBottom: 100 }}
        data={filteredData}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.PRODUCT_DETAIL, { product: item })
              }
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
        )}
        keyExtractor={(item) => item.product_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ProductListScreen;
