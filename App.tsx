import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./src/navigation/HomeNavigator";

import UserContext from "./src/context/UserContext";
import CartContext from "./src/context/CartContext";

import { getEmployees } from "./src/services/fakeServices/fakeEmployeeService";

export default function App() {
  const [user, setUser] = React.useState(null);
  // const [user, setUser] = React.useState(
  //   getEmployees().find((c) => c.id === 1)
  // );
  const [cart, setCart] = React.useState([]);

  console.log(process.env.EXPO_PUBLIC_API_URL);

  const storeData = async () => {
    try {
      const result = await AsyncStorage.getItem("my-key");
      if (result !== null) {
        // value previously stored
        console.log(result);
      }
    } catch (e) {
      // saving error
    }
  };
  useEffect(() => {
    storeData();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <NavigationContainer>
          <HomeNavigator />
        </NavigationContainer>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}
