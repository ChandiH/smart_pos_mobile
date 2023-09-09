import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ImageItem from "../../components/ImageItem";
import AppButton from "../../components/AppButton";
import PopUpModal from "../../components/PopUpModal";
import StockUpdateWindow from "../../components/inventory/StockUpdataWindow";
import UserContext from "../../context/UserContext";

import { getInventoryByProduct } from "../../services/fakeInventoryService";
import { getBranches } from "../../services/fakeBranchService";

// const product = {
//   product_id: 1,
//   name: "Muffin Chocolate Individual Wrap",
//   description: "Pork - Tenderloin, Frozen",
//   category: "Comedy|Drama|Romance",
//   image: [
//     "https://placehold.co/600x400/png",
//     "https://placehold.co/200x200/png",
//     "https://placehold.co/200x200/png",
//   ],
//   weight: 100,
//   unit: 1,
//   buyingPrice: "Rs. 48.67",
//   retailPrice: "Rs. 8.85",
//   discount: 1,
//   barcode: "55154-5980",
//   supplier_id: 98,
// };

function productDetailScreen({ route }) {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(route.params.product);
  const [modalVisible, setModalVisible] = useState(false);
  const [branches, setBranches] = useState([]);

  const fetchStock = async () => {
    const product_id = route.params.product.product_id;
    const detailedProduct = await getInventoryByProduct(product_id);
    const branch = await getBranches();
    const currentBranch = branch.find((b) => b.branch_id === user.branch_id);
    setBranches(branch);

    if (detailedProduct) {
      const branchStock = detailedProduct.stock.find(
        (b) => b.branch_id === user.branch_id
      );
      setProduct({
        ...detailedProduct,
        branchName: currentBranch.name,
        branchStock: branchStock,
      });
    } else {
      setProduct({
        ...product,
        branchName: currentBranch.name,
        branchStock: { updatedAt: "never", quantity: 0 },
      });
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const onStockUpdate = (quantity) => {
    setModalVisible(false);
    const newProduct = { ...product };
    newProduct.branchStock.quantity += quantity;
    newProduct.branchStock.updatedAt = new Date().toDateString();
    setProduct(newProduct);
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
        product={product}
        onUpdate={onStockUpdate}
        onCancel={onCancel}
      />
    </PopUpModal>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {product?.image && (
          <ImageItem
            imageUri={product.image[0]}
            imageStyle={styles.leftImage}
            viewStyle={{ aspectRatio: 2, width: "100%", marginBottom: 10 }}
          />
        )}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          {product.image.slice(1).map((imgUri, index) => (
            <ImageItem
              key={index}
              imageUri={imgUri}
              imageStyle={styles.leftImage}
              viewStyle={{ width: "30%", aspectRatio: 1 }}
            />
          ))}
        </View>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
          {product.name}
        </Text>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          {product.category}
        </Text>
        {renderDetail("Retail price", product.retailPrice)}
        {renderDetail("Buying price", product.buyingPrice)}
        {renderDetail("Weight", product.weight)}
        {renderDetail("Unit", product.unit)}
        {renderDetail("Discount", product.discount)}
        {renderDetail("Barcode", product.barcode)}
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
