import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%"
  },
  titleContainer: {
    height: Platform.OS === 'ios' ? 100 : 80,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Platform.OS === 'ios' ? "22%" : "14%",
  },
  imageHouseAndNurseStyle: {
    height: 50,
    width: 50,
    alignSelf: "center"
  },
  firstLabelTitle: {
    fontSize: Fonts.size.biggerTitle,
    color: Colors.darkTeal,
    includeFontPadding: false,
    marginBottom: -12,
    fontFamily: 'Roboto-Regular',
    textAlignVertical: "center",
    alignSelf: "flex-end"
  },
  secondLabelTitle: {
    textAlignVertical: "center",
    includeFontPadding: false,
    fontSize: Fonts.size.biggerTitle2,
    color: Colors.darkTeal,
    fontFamily: 'Roboto-Bold'
  },
  inputStyle: {
    marginHorizontal: "5%"
  },
  inputPasswordStyle: {
    marginTop: "3%"
  },
  emailAndPasswordContainer: {
    marginTop: "10%"
  },
  circleImageContainer: {
    borderRadius: 100,
    marginLeft: "2%",
    height: 59,
    width: 59,
    backgroundColor: Colors.duckEggBlue
  },
  buttonStyle: {
    alignSelf: "center",
    marginTop: "10%"
  },
  labelButtonStyle: {
    color: Colors.tealish,
    fontSize: Fonts.size.medium,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    height: 25
  },
  labelContainer: {
    marginTop: '7%'
  }
});
