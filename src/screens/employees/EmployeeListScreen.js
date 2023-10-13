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

import { getEmployees } from "../../services/employeeService";
import { getBranches } from "../../services/fakeServices/fakeBranchService";
import colors from "../../config/colors";
import routes from "../../navigation/routes";

function EmployeesListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [employees, setEmployees] = useState([]);

  async function fetchEmployees() {
    const { data: employees } = await getEmployees();
    setEmployees(employees);
    setFilteredData(employees);
    console.log(employees[0]);
  }

  useEffect(() => {
    // fetch employees
    fetchEmployees();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    filterEmployees(text);
  };

  const filterEmployees = (query) => {
    let filteredEmployees = [...employees];
    if (query !== "") {
      filteredEmployees = employees.filter((item) =>
        item.employee_name.toLowerCase().startsWith(query.toLowerCase())
      );
    }
    setFilteredData(filteredEmployees);
  };

  return (
    <View style={styles.container}>
      <SearchBarAndroid
        containerStyle={{
          backgroundColor: colors.background2,
          borderRadius: 15,
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="Search Employees..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        style={{ marginBottom: 100 }}
        data={filteredData}
        renderItem={({ item: employee }) => (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.push(routes.EMPLOYEE_DETAIL, { employee })
              }
            >
              <ListItem bottomDivider>
                <ListItem.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <ListItem.Title>
                      <Text>{employee.employee_name}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      <Text>{employee.branch_name}</Text>
                    </ListItem.Subtitle>
                  </View>
                  <ListItem.Subtitle>
                    <Text style={{ fontWeight: "bold" }}>
                      {employee.role_name}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
            <View style={{ width: "100%", height: 3 }} />
          </>
        )}
        keyExtractor={(employee) => employee.employee_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default EmployeesListScreen;
