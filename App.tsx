import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./src/navigation/HomeNavigator";

import UserContext from "./src/context/UserContext";
import CartContext from "./src/context/CartContext";

import { getEmployees } from "./src/services/fakeEmployeeService";

export default function App() {
  // const [user, setUser] = React.useState(null);
  const [user, setUser] = React.useState(
    getEmployees().find((c) => c.id === 1)
  );
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
