import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%"
  },
  titleStyle: {
    fontSize: Fonts.size.title,
    color: Colors.darkBlueGrey,
    alignSelf: 'center',
    marginTop: '30%',
    marginBottom: '10%',
    fontFamily: 'Roboto-Regular'
  },
  inputStyle: {
    marginHorizontal: '22%'
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: '10%'
  }
});
