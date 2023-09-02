import { Platform } from "react-native";
import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.white,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  label: {
    color: colors.textDark,
    fontWeight: "bold",
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  header2: {
    color: colors.textDark,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 25,
  },
};
