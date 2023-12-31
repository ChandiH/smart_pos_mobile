import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "@rneui/themed";
import { getImageUrl } from "../../services/imageHandler";

function EmployeeDetailScreen({ route }) {
  const [employee, setEmployee] = useState(route.params.employee);

  useEffect(() => {
    setEmployee({
      ...route.params.employee,
      image:
        "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
    });
  }, []);

  console.log(getImageUrl(employee.employee_image));
  const renderDetail = (label, value) => (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 10,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.detailLabel}>{label}: </Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={styles.image}
        source={{
          uri: employee.employee_image
            ? getImageUrl(employee.employee_image)
            : employee.image,
        }}
        size={"xlarge"}
      />
      <View style={{ width: "100%", padding: 10 }}>
        {renderDetail("Name", employee.employee_name)}
        {renderDetail("Email", employee.employee_email)}
        {renderDetail("Phone", employee.employee_phone)}
        {renderDetail("Assigned Branch", employee.branch_name)}
        {renderDetail("Role", employee.role_name)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    marginVertical: 30,
    borderRadius: 45,
    overflow: "hidden",
  },
  detailLabel: {
    fontSize: 20,
  },
  detailValue: {
    fontSize: 20,
  },
});

export default EmployeeDetailScreen;
