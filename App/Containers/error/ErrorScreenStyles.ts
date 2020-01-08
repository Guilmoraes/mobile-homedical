import {StyleSheet, Platform} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.background
  },
  roundedBackground: {
    backgroundColor: Colors.lightTan,
    height: 130,
    width: 130,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    height: 80,
    width: 80,
    resizeMode: "contain"
  },
  roundedIconContainer: {
    marginTop: "35%"
  },
  textStyle: {
    marginTop: "7%",
    marginHorizontal: "5%",
    alignSelf: "center",
    textAlign: 'center',
    fontSize: Fonts.size.regular,
    color: Colors.darkBlueGrey,
    fontFamily: 'Roboto-Regular'
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: '10%'
  }
});
