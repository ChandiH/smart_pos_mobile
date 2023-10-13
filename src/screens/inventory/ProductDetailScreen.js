import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ImageItem from "../../components/ImageItem";
import AppButton from "../../components/AppButton";
import PopUpModal from "../../components/PopUpModal";
import StockUpdateWindow from "../../components/inventory/StockUpdataWindow";
import UserContext from "../../context/UserContext";

import { getImageUrl } from "./../../services/imageHandler";
import {
  getInventoryByProduct,
  updateInventory,
} from "../../services/inventoryService";

function productDetailScreen({ route }) {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(route.params.product);
  const [branchStock, setBranchStock] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchStock = async () => {
    const product_id = route.params.product.product_id;
    try {
      const { data: inventory } = await getInventoryByProduct(product_id);
      const stock = inventory.find(
        (stock) => stock.branch_id === user.branch_id
      );
      const currentBranchStock = stock
        ? stock
        : {
            ...route.params.product,
            branch_id: user.branch_id,
            branch_name: user.branch_name,
            quantity: 0,
            reorder_level: 0,
          };
      setBranchStock(currentBranchStock);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const onStockUpdate = async (quantity) => {
    setModalVisible(false);
    // console.log(quantity);
    try {
      const promise = updateInventory({
        branch_id: user.branch_id,
        product_id: branchStock.product_id,
        quantity: branchStock.quantity + quantity,
        reorder_level: branchStock.reorder_level,
      });
      await promise;
      fetchData();
    } catch (e) {
      console.log("Error Occured", e.response);
    }
  };

  const onCancel = () => {
    setModalVisible(false);
  };
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

  const stockUpdateModal = () => (
    <PopUpModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <StockUpdateWindow
        product={branchStock}
        onUpdate={onStockUpdate}
        onCancel={onCancel}
      />
    </PopUpModal>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {product?.product_image && (
          <ImageItem
            imageUri={getImageUrl(product.product_image[0])}
            imageStyle={styles.leftImage}
            viewStyle={{ aspectRatio: 2, width: "100%", marginBottom: 10 }}
          />
        )}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {product?.product_image.slice(1).map((imgUri, index) => (
            <ImageItem
              key={index}
              imageUri={getImageUrl(imgUri)}
              imageStyle={styles.leftImage}
              viewStyle={{ width: "30%", aspectRatio: 1, marginLeft: 5 }}
            />
          ))}
        </View>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
          {product.product_name}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            fontStyle: "italic",
            marginBottom: 10,
          }}
        >
          {product.category_name}
        </Text>
        {renderDetail("Retail price", product.retail_price)}
        {renderDetail("Buying price", product.buying_price)}
        {renderDetail("Discount", product.discount)}
        {renderDetail("Barcode", product.product_barcode)}
        {renderDetail("Supplier", product.supplier_id)}
        <AppButton title="Edit" onPress={() => console.log("Edit")} />
        <AppButton title="UpdateStock" onPress={() => setModalVisible(true)} />
      </ScrollView>
      {stockUpdateModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    borderColor: "black",
    borderWidth: 2,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 25,
    marginBottom: 15,
    textAlign: "center",
  },
  leftImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 1,
  },
  detailLabel: {
    fontSize: 20,
  },
  detailValue: {
    fontSize: 20,
  },
});

export default productDetailScreen;
