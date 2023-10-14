import React, { useRef, useState } from "react";
import ImageInput from "./ImageInput";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native";

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();
  return (
    <ScrollView
      testID="scrollView"
      ref={scrollView}
      horizontal
      onContentSizeChange={() => scrollView.current.scrollToEnd()}
    >
      <View style={styles.container}>
        {imageUris &&
          imageUris.map((uri) => (
            <ImageInput
              imageUri={uri}
              onChangeImage={() => onRemoveImage(uri)}
            />
          ))}
        <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
export default ImageInputList;
