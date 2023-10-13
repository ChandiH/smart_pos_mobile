import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import colors from "../config/colors";

type propstype = {
  imageUri: string;
  onPress?: () => void;
  viewStyle?: any;
  imageStyle?: any;
  mainColor?: string;
};

const ImageItem = ({
  imageUri,
  onPress,
  viewStyle,
  imageStyle,
  mainColor,
}: propstype) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View
      style={[viewStyle, { justifyContent: "center", alignItems: "center" }]}
    >
      {isLoading && (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={mainColor ? mainColor : "skyblue"}
        />
      )}
      <Image
        source={{ uri: imageUri }}
        style={[imageStyle, styles.image, isLoading && styles.hidden]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    alignSelf: "center",
  },
  image: {
    resizeMode: "cover",
  },
  hidden: {
    opacity: 0,
  },
});

export default ImageItem;
