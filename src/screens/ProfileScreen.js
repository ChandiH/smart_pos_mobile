import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "@rneui/themed";
import AppButton from "../components/AppButton";

import UserContext from "../context/UserContext";
import { getImageUrl } from "./../services/imageHandler";

function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

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

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("token");
    navigation.goBack();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Avatar
        containerStyle={styles.image}
        source={{
          uri: getImageUrl(user.employee_image),
        }}
        size={"xlarge"}
      />
      <View style={{ width: "100%", padding: 10 }}>
        {renderDetail("User Name", user.employee_username)}
        {renderDetail("Name", user.employee_name)}
        {renderDetail("Email", user.employee_email)}
        {renderDetail("Phone", user.employee_phone)}
        {renderDetail("Assigned Branch", user.branch_name)}
        {renderDetail("Role", user.role_name)}

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
