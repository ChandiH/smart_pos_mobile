import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "@rneui/themed";
import AppButton from "../components/AppButton";

import UserContext from "../context/UserContext";

import { getBranch } from "../services/fakeBranchService";

function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const branch = getBranch(user.branch_id);
    setUserDetails({
      ...user,
      branch_name: branch.name,
      image:
        "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
    });
  }, []);

  useEffect(() => {
    console.log("userDetails", userDetails);
  }, [userDetails]);

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

  const handleProfileEdit = () => {
    console.log("edit");
  };

  const handleChangePassword = () => {
    console.log("change password");
  };

  const handleLogOut = () => {
    setUser(null);
    console.log("logout");
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={styles.image}
        source={{
          uri: userDetails.image,
        }}
        size={"xlarge"}
      />
      <View style={{ width: "100%", padding: 10 }}>
        {renderDetail("User Name", userDetails.userName)}
        {renderDetail("Name", userDetails.name)}
        {renderDetail("Email", userDetails.email)}
        {renderDetail("Phone", userDetails.phone)}
        {renderDetail("Assigned Branch", userDetails.branch_name)}
        {renderDetail("Role", userDetails.userRole_name)}

        <AppButton title="Edit" onPress={handleProfileEdit} />
        <AppButton title="Change Password" onPress={handleChangePassword} />
        <AppButton title="Logout" onPress={handleLogOut} />
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

export default ProfileScreen;
