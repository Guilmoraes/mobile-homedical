import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  roundedBackground: {
    backgroundColor: Colors.duckEggBlue,
    height: 130,
    width: 130,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    height: 80,
    width: 80
  },
  roundedIconContainer: {
    marginTop: "35%"
  },
  greetingText: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: "15%",
    marginTop: "12%",
    color: Colors.darkBlueGrey
  },
  waitText: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.darkBlueGrey,
    marginTop: "9%",
    marginHorizontal: "16%"
  },
  waitBoldText: {
    fontWeight: 'bold'
  }
});
