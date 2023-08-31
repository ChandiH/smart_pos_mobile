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

import { getEmployees } from "../../services/fakeEmployeeService";
import { getBranches } from "../../services/fakeBranchService";
import colors from "../../config/colors";

function EmployeesListScreen(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [branch, setBranch] = useState([]);

  async function fetchEmployees() {
    const employees = await getEmployees();
    setEmployees(employees);
    setFilteredData(employees);
    const branch = await getBranches();
    setBranch(branch);
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
        item.name.toLowerCase().startsWith(query.toLowerCase())
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
            <TouchableOpacity onPress={() => console.log(employee)}>
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
                      <Text>{employee.name}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      <Text>
                        {
                          branch.find((b) => b.branch_id === employee.branch_id)
                            ?.name
                        }
                      </Text>
                    </ListItem.Subtitle>
                  </View>
                  <ListItem.Subtitle>
                    <Text style={{ fontWeight: "bold" }}>
                      {employee.userRole_name}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
            <View style={{ width: "100%", height: 3 }} />
          </>
        )}
        keyExtractor={(employee) => employee.id.toString()}
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
