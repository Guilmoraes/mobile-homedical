import {StyleSheet, Platform} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  imageSchedule: {
    marginTop: "25%",
    height: 130,
    width: 130,
    resizeMode: "contain",
    alignSelf: 'center'
  },
  titleText: {
    marginTop: "15%",
    fontSize: Fonts.size.biggerTitle,
    color: Colors.darkTeal,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular'
  },
  patientContainer: {
    marginTop: "10%",
    alignSelf: 'center'
  },
  hourContainer: {
    marginTop: "5%",
    alignSelf: 'center',
    textAlign: 'center'
  },
  label: {
    marginTop: "10%",
    fontSize: Fonts.size.regular,
    color: Colors.darkBlueGrey,
    textAlign: 'center',
    fontFamily: 'Roboto-Light'
  },
  value: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: "5%",
    marginTop: "20%",
    justifyContent: 'space-between'
  },
  positiveButton: {
    marginTop: "5%",
    alignSelf: 'center'
  },
  positiveButtonStyle: {
    width: Platform.OS === "ios" ? 140 : 160
  },
  negativeButton: {
    marginTop: "5%",
    alignSelf: "center",
  },
  negativeButtonTextStyle: {
    color: Colors.tealish
  },
  negativeButtonStyle: {
    borderColor: Colors.tealish,
    borderWidth: 1,
    width: Platform.OS === "ios" ? 140 : 160,
    backgroundColor: Colors.background
  },
});
