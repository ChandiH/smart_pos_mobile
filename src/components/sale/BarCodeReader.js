import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

function BarCodeReader({ setBarcode, scanned, setScanned }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcode(data);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.camera}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    borderColor: "red",
    borderWidth: 3,
    alignSelf: "center",
    width: 200,
    aspectRatio: 3 / 4,
  },
});
export default BarCodeReader;
