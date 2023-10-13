import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/customStyles";
import { Alert } from "react-native";
import colors from "../config/colors";

function ImageInput({ imageUri, onChangeImage }) {
  const requestPermission = async () => {
    const { granted } = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY,
      Permissions.CAMERA
    );
    if (!granted) alert("You need to enable permission to access the library");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) onChangeImage(result.assets[0].uri);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  return (
    <TouchableWithoutFeedback testID="touchable" onPress={handlePress}>
      <View style={styles.inputBox}>
        <>
          {!imageUri && <MaterialCommunityIcons name="camera" size={30} />}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  inputBox: {
    alignItems: "center",
    borderColor: colors.textDark,
    borderWidth: 2,
    borderRadius: 10,
    height: 100,
    justifyContent: "center",
    margin: 5,
    overflow: "hidden",
    width: 100,
  },
});

export default ImageInput;
