import {StyleSheet, Platform} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%",
    marginTop: Platform.OS === "ios" ? "16%" : "12%"
  },
  flatList: {
    height: "110%",
    borderWidth: 2,
    borderColor: Colors.silver,
    backgroundColor: Colors.paleGrey
  },
  navbarAddButtonContainer: {
    width: 70,
    height: Platform.OS === "ios" ? 32 : 47
  },
  navbarAddButtonRounded: {
    height: Platform.OS === "ios" ? 35 : 40,
    width: Platform.OS === "ios" ? 35 : 40,
    marginBottom: "10%",
    backgroundColor: Colors.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navbarAddButtonImage: {
    height: Platform.OS === "ios" ? 14 : 21,
    width: Platform.OS === "ios" ? 14 : 21,
    resizeMode: "contain"
  },
  headerComponentContainer: {
    height: "21%",
  },
  headerComponentCalendarDivisor: {
    marginHorizontal: "7%"
  },
  headerComponentInitialCalendarContainer: {
    height: 55,
    width: 142
  },
  headerComponentCalendarContainer: {
    flexDirection: 'row',
    marginHorizontal: "7%",
    marginBottom: "6%",
    marginTop: "1%",
    justifyContent: 'space-between',
  },
  headerComponentCalendarIconStyle: {
    height: 25,
    width: 25,
  },
  headerComponentCalendarStyle: {
    height: 55,
    width: 142
  },
  headerComponentCalendarIncreaseLabelMarginLeft: {
    marginLeft: "23%",
  },
  headerComponentCalendarIncreaseMarginBottomFocused: {
    marginBottom: "50%"
  },
  headerComponentCalendarIncreaseInputPaddingLeft: {
    paddingLeft: "23%"
  },
  emptyComponentContainer: {
    backgroundColor: Colors.silver,
    height: "100%",
    alignItems: 'center',
  },
  emptyComponentText: {
    textAlign: 'center',
    fontSize: Fonts.size.input,
    color: Colors.purpleGrey,
    fontFamily: 'Roboto-Medium'
  },
  emptyComponentImage: {
    marginTop: Platform.OS === "ios" ? "35%" : "25%",
    height: 132,
    width: 132,
    resizeMode: "contain"
  },
  cardItemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    flexDirection: 'row',
    borderWidth: 2,
    height: 120,
    width: "91%",
    marginHorizontal: "5%",
    marginVertical: "1%",
    borderColor: Colors.whiteTwo,
  },
  cardItemContainerWithBlueBorder: {
    borderColor: Colors.aquaBlue,
  },
  cardItemDateContainer: {
    marginLeft: "5%",
    justifyContent: 'center'
  },
  cardItemContainerMonth: {
    fontSize: Fonts.size.smallerTitle,
    color: Colors.darkBlueGrey,
    alignSelf: 'center',
    fontFamily: 'Roboto-Light'
  },
  cardItemContainerDay: {
    fontSize: Fonts.size.biggerTitle3,
    color: Colors.darkBlueGrey,
    alignSelf: 'center',
    marginTop: -7
  },
  cardItemHorizontalDivisor: {
    height: 75.2,
    width: 2,
    backgroundColor: Colors.whiteTwo,
    alignSelf: 'center',
    marginHorizontal: "5%"
  },
  cardItemVerticalDivisor: {
    height: 2,
    width: 203,
    backgroundColor: Colors.whiteTwo,
    marginVertical: "4%"
  },
  cardItemPatientContainer: {
    justifyContent: 'center'
  },
  cardItemPatientLabel: {
    fontFamily: 'Roboto-Regular',
    color: Colors.purpleGrey,
    fontSize: Fonts.size.small
  },
  cardItemPatient: {
    fontFamily: 'Roboto-Medium',
    fontSize: Fonts.size.regular,
    color: Colors.darkBlueGrey
  },
  cardItemScheduleImage: {
    height: 29,
    width: 29,
    resizeMode: 'contain'
  },
  cardItemOnDuty: {
    color: Colors.waterMelon,
    fontSize: Fonts.size.regular,
    marginLeft: "5%",
    alignSelf: 'center',
    fontFamily: 'Roboto-Medium'
  },
  cardItemInitialDateLabel: {
    color: Colors.purpleGrey,
    fontSize: Fonts.size.small
  },
  cardItemInitialDate: {
    color: Colors.darkBlueGrey,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold'
  },
  cardItemSyncImage: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -3
  },
  cardItemSyncPurpleGrey: {
    color: Colors.purpleGrey
  },
  dutyOnThisPeriodContainer: {
    backgroundColor: Colors.duckEggBlue,
    width: 201,
    height: 27,
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerComponentSchedulesLength: {
    color: Colors.darkBlueGrey,
    fontSize: Fonts.size.smallerTitle,
    fontFamily: 'Roboto-Medium'
  },
  headerComponentSchedulesText: {
    color: Colors.darkBlueGrey,
    fontSize: Fonts.size.medium,
    paddingLeft: "5%",
    fontFamily: 'Roboto-Medium'
  },
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    height: "100%",
    width: "100%",
    justifyContent: 'center'
  },
  modalDatePickerContainer: {
    backgroundColor: "white",
    height: "40%",
    width: "100%"
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: "20%"
  },
  modalConfirmButton: {
    color: Colors.aquaBlue,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold'
  },
  modalCancelButton: {
    color: Colors.darkBlueGrey,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold'
  },
  cardItemArrowImage: {
    alignSelf: 'center',
    height: 16.2,
    width: 10,
    resizeMode: "contain"
  }
});
