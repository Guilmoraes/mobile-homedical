import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  labelStyleBlur: {
    fontFamily: 'Roboto-Regular',
    position: 'absolute',
    marginLeft: "14%",
    color: Colors.darkBlueGrey
  },
  labelStyleFocused: {
    fontFamily: 'Roboto-Regular',
    marginLeft: "14%",
    marginBottom: "25%",
    position: 'absolute',
    fontSize: Fonts.size.small,
    color: Colors.coolGrey
  },
  labelStyleWithoutMarginLeft: {
    marginLeft: "0%"
  },
  inputStyleWithoutPaddingLeft: {
    paddingLeft: "0%"
  },
  iconStyle: {
    position: 'absolute',
    height: 24,
    width: 24,
    resizeMode: "contain"
  },
  underlineStyle: {
    height: 1,
    marginTop: -10,
    backgroundColor: Colors.darkBlueGrey
  },
  underlineStyleFocused: {
    backgroundColor: Colors.tealish
  },
  underlineStyleError: {
    backgroundColor: Colors.waterMelon
  },
  inputStyle: {
    height: 65,
    paddingLeft: "14%",
    paddingRight: "18%",
    color: Colors.darkBlueGrey,
    fontFamily: 'Roboto-Regular'
  },
  inputValidationIcon: {
    width: 10,
    height: 10,
    position: 'absolute',
    right: 20,
  },
  floatingLabelStyle: {
    justifyContent: "center"
  }
});
