import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  buttonStyle: {
    height: 56,
    width: 240,
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: Colors.duckEggBlue,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: Colors.darkBlueGrey,
    fontSize: Fonts.size.regular,
    fontFamily: 'Roboto-Medium'
  },
  iconStyle: {
    height: 24,
    width: 24,
    marginRight: "3%",
    resizeMode: "contain"
  }
});
