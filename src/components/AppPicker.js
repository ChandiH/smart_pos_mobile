import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import PickerItem from "./PickerItem";

import defaultStyles from "../config/customStyles";

function AppPicker({
  icon,
  items,
  placeholder,
  selectedItem,
  onSelectItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width: width }]}>
          {icon && (
            <MaterialCommunityIcons style={styles.icon} name={icon} size={25} />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            style={styles.icon}
            name="chevron-down"
            size={20}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <PickerItem
              label={item.label}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.secondry,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
  },
  icon: {
    color: defaultStyles.colors.white,
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.white,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
