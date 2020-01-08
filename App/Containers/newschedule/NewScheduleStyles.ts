import {StyleSheet, Platform} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  closeImageContainer: {
    alignSelf: 'flex-end',
    marginTop: Platform.OS === "ios" ? "10%" : "5%",
    marginRight: "5%",
    marginBottom: Platform.OS === "ios" ? "8%" : "5%"
  },
  closeImage: {
    resizeMode: 'contain'
  },
  roundedImageContainer: {
    height: 130,
    width: 130,
    borderRadius: 100,
    backgroundColor: Colors.duckEggBlue,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundedImage: {
    height: 80,
    width: 80
  },
  title: {
    marginTop: "7%",
    fontSize: Fonts.size.biggerTitle,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.darkBlueGrey,
    marginBottom: "3%"
  },
  floatingLabelInput: {
    marginVertical: "3%",
    marginHorizontal: "8%"
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: "10%"
  },
  patientEmptyPlaceholderContainer: {
    alignItems: 'center'
  },
  patientEmptyPlaceholderText: {
    color: Colors.darkBlueGrey,
    fontSize: Fonts.size.regular,
    fontFamily: 'Roboto-Light',
    textAlign: 'center'
  }
});
