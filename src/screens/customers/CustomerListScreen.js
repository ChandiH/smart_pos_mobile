import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "@rneui/themed";
import { SearchBarAndroid } from "@rneui/base/dist/SearchBar/SearchBar-android";
import colors from "../../config/colors";

import { getCustomers } from "../../services/customerService";

function CustomerListScreen(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [customers, setCustomers] = useState([]);

  async function fetchCustomers() {
    const { data: customers } = await getCustomers();
    setCustomers(customers);
    setFilteredData(customers);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    filterCustomers(text);
  };

  const filterCustomers = (query) => {
    let filteredCustomers = [...customers];
    if (query !== "") {
      filteredCustomers = customers.filter(
        (item) =>
          item.customer_name.toLowerCase().startsWith(query.toLowerCase()) ||
          item.customer_phone.toLowerCase().startsWith(query.toLowerCase())
      );
    }
    setFilteredData(filteredCustomers);
  };

  return (
    <View style={styles.container}>
      <SearchBarAndroid
        containerStyle={{
          backgroundColor: colors.background2,
          borderRadius: 15,
          marginBottom: 10,
        }}
        placeholder="Search Customers..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        style={{ marginBottom: 100 }}
        data={filteredData}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity onPress={() => console.log(item)}>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>
                    <Text>{item.customer_name}</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text>{item.customer_email}</Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
            <View style={{ width: "100%", height: 3 }} />
          </>
        )}
        keyExtractor={(item) => item.customer_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CustomerListScreen;
