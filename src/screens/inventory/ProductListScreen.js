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
import { getProducts } from "../../services/productService";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import { getImageUrl } from "./../../services/imageHandler";

function ProductListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const { data: products } = await getProducts();
    setProducts(products);
    setFilteredData(products);
  }

  useEffect(() => {
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
          item.product_name.toLowerCase().startsWith(query.toLowerCase()) ||
          item.product_barcode.toLowerCase().startsWith(query.toLowerCase())
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
                    uri: getImageUrl(item.product_image[0]),
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text>{item.product_name}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text>{item.category_name}</Text>
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    <Text>{item.retail_price}</Text>
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
