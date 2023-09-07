import React, { useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button, Divider } from "@rneui/themed";
import AppButton from "../../components/AppButton";

import CartContext from "../../context/CartContext";
import colors from "../../config/colors";
import routes from "../../navigation/routes";

function SaleSuccessScreen({ navigation, route }) {
  const { summary } = route.params;
  console.log(summary);
  const { cart, setCart } = useContext(CartContext);

  const getNextOrder = () => {
    setCart([]);
    navigation.popToTop();
  };

  const printReciept = () => {
    console.log("Printing...");
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <Image
          source={require("../../assets/images/success.png")}
          style={styles.image}
        />
        <Text style={styles.successText}>Transaction Successful!</Text>
        <Text style={styles.note}>NOTE: Do not forget to give smile</Text>
        <Text style={[styles.note, { marginBottom: 15 }]}>to the customer</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Payment Method: {summary.paymentMethod.toUpperCase()}
          </Text>
          {summary.paymentMethod.toLowerCase() === "cash" && (
            <>
              <Divider style={{ marginVertical: 5 }} />
              <Text style={styles.infoText}>
                Money Changes: Rs.{" "}
                {(
                  parseInt(summary.paymentDetails) -
                  parseFloat(summary.totalPrice) +
                  parseFloat(summary.discount)
                ).toFixed(0)}
                .00
              </Text>
            </>
          )}
          {summary.paymentMethod.toLowerCase() === "credit/debit" && (
            <>
              <Divider style={{ marginVertical: 5 }} />
              <Text style={styles.infoText}>
                Reference: {summary.paymentDetails}
              </Text>
            </>
          )}
        </View>

        <View style={{ marginTop: 20, width: "80%", alignSelf: "center" }}>
          <Button
            disabled
            containerStyle={{ width: "100%", marginBottom: 10 }}
            buttonStyle={styles.middleBtn}
            titleStyle={{ color: colors.black }}
            title="Email"
            onPress={() => navigation.navigate(routes.HOME)}
          />
          <Button
            containerStyle={{ width: "100%" }}
            buttonStyle={styles.middleBtn}
            titleStyle={{ color: colors.blue }}
            title="Send Reciept"
            onPress={() => navigation.navigate(routes.HOME)}
          />
        </View>
      </View>
      <View style={styles.bottomBtn}>
        <AppButton title="Print Reciept" onPress={printReciept} />
        <AppButton title="Next Order" onPress={getNextOrder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCard: {
    marginTop: 30,
    paddingVertical: 20,
    width: "90%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 25,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "stretch",
    alignSelf: "center",
    marginBottom: 10,
  },
  successText: {
    color: colors.blue,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  note: {
    alignSelf: "center",
  },
  infoCard: {
    backgroundColor: colors.blue,
    width: "90%",
    padding: 20,
    alignSelf: "center",
    borderRadius: 20,
  },
  infoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  middleBtn: {
    height: 50,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
  },
  bottomBtn: {
    alignSelf: "center",
    position: "absolute",
    width: "90%",
    bottom: 10,
  },
});

export default SaleSuccessScreen;
