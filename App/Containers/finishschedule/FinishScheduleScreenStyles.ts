import {StyleSheet, Platform} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%"
  },
  inputTypePatientContainer: {
    marginTop: Platform.OS === "ios" ? "23%" :"20%",
    marginHorizontal: "5%",
    marginBottom: "1%",
  },
  inputTypeDutyTimeContainer: {
    marginHorizontal: "5%",
  },
  cardItemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    flexDirection: 'column',
    borderWidth: 1,
    height: 120,
    width: "91%",
    marginHorizontal: "5%",
    marginVertical: "1%",
    borderColor: Colors.whiteTwo,
    justifyContent: "center",
  },
  cardTitle: {
    alignSelf: "center",
    fontSize: Fonts.size.smallerTitle,
    marginTop: Metrics.baseMargin,
    fontFamily: 'Roboto-Light'
  },
  headerComponentInitialCalendarContainer: {
    height: 55,
    width: 142,
  },
  headerComponentCalendarIconStyle: {
    height: 25,
    width: 25,
  },
  finishScheduleImage: {
    height: 56,
    width: 56,
    resizeMode: 'contain'
  },
  headerComponentCalendarIncreaseLabelMarginLeft: {
    marginLeft: "23%",
  },
  headerComponentCalendarIncreaseMarginBottomFocused: {
    marginBottom: "70%",
  },
  headerComponentCalendarIncreaseInputPaddingLeft: {
    paddingLeft: "23%",
    color: Colors.tealish,
  },
  headerComponentCalendarStyle: {
    height: 55,
    width: 150,
  },
  headerInputStyle: {
    paddingBottom: 20,
    height: 75,
  },
  inputTextStyle: {
    fontSize: Fonts.size.regular,
  },
  headerComponentCalendarContainer: {
    flexDirection: "row",
    marginHorizontal: "7%",
    marginBottom: "6%",
    marginTop: "1%",
    justifyContent: "space-between",
  },
  clockContainer: {
    marginVertical: Metrics.section,
    alignItems: "center",
  },
  inDutyText: {
    fontSize: Fonts.size.biggerTitle,
    color: Colors.waterMelon,
    marginTop: Metrics.baseMargin,
    fontFamily: 'Roboto-Medium'
  },
  buttonContainer: {
    alignItems: "center",
  },
  viewButtonStyle: {
    alignSelf: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.aquaBlue,
  }
});
