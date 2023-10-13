import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./src/navigation/HomeNavigator";

import UserContext from "./src/context/UserContext";
import CartContext from "./src/context/CartContext";

export default function App() {
  const [user, setUser] = React.useState(null);
  const [cart, setCart] = React.useState([]);

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
