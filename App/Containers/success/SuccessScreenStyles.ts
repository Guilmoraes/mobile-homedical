import {StyleSheet, Platform} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.background
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
  textStyle: {
    marginTop: "7%",
    alignSelf: "center",
    textAlign: 'center',
    fontSize: Fonts.size.regular,
    color: Colors.darkBlueGrey,
    fontFamily: 'Roboto-Regular'
  },
  messageStyle: {
    marginTop: "4%",
    alignSelf: "center",
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    color: Colors.darkBlueGrey,
    fontFamily: 'Roboto-Light'
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: '10%'
  }
});
