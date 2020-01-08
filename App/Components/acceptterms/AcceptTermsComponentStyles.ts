import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: 'center'
  },
  boxContainer: {
    height: "40%",
    width: "90%",
    backgroundColor: Colors.background,
    alignSelf: 'center',
    borderRadius: 10
  },
  titleStyle: {
    fontSize: Fonts.size.title,
    color: Colors.darkBlueGrey,
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
    marginTop: "5%"
  },
  messageContainer: {
    alignSelf: 'center',
    marginTop: "10%",
    marginHorizontal: "5%"
  },
  messageStyle: {
    fontFamily: 'Roboto-Light',
    fontSize: Fonts.size.input,
    color: Colors.darkBlueGrey,
    textAlign: 'center'
  },
  hyperLinkStyle: {
      fontFamily: 'Roboto-Light',
      fontSize: Fonts.size.input,
      color: Colors.darkBlueGrey,
      textAlign: 'center',
      textDecorationLine: 'underline'
  },
  buttonViewStyle: {
    marginTop: "15%",
    alignSelf: "center"
  }
});
