import {StyleSheet, Platform} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.background
  },
  title: {
    fontSize: Fonts.size.biggerTitle,
    color: Colors.darkBlueGrey,
    alignSelf: "center",
    fontFamily: 'Roboto-Regular',
    marginTop: Platform.OS === "ios" ? "20%" : "15%",
    marginBottom: "8%"
  },
  inputTypeContainer: {
    marginVertical: "3%",
    marginHorizontal: "5%",
  },
  flatList: {
    marginBottom: "5%"
  },
  specialtyContainer: {
    flexDirection: 'row',
    marginHorizontal: "5%",
    height: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.duckEggBlue,
    borderWidth: 1,
    borderColor: Colors.darkBlueGrey,
  },
  specialtyText: {
    fontSize: Fonts.size.medium,
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.darkBlueGrey,
    marginLeft: "5%"
  },
  closeImageSmall: {
    alignSelf: 'center',
    marginRight: "2%"
  },
  touchableStyle: {
    height: 80,
    marginHorizontal: "5%"
  },
  inputTypeSearch: {
    height: 80
  },
  buttonStyle: {
    alignSelf: 'center',
    marginBottom: "8%"
  }
});
