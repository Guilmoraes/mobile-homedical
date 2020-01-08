import {StyleSheet, Platform} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.background
  },
  flatList: {
    marginTop: "10%",
    height: "100%",
  },
  itemContainer: {
    height: "100%",
    width: Metrics.screenWidth
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: "5%"
  },
  headerImageStyle: {
    width: 20,
    height: 16
  },
  headerTextStyle: {
    fontSize: Fonts.size.input,
    color: Colors.tealish,
    fontWeight: Platform.OS === "ios" ? "700" : "300"
  },
  firstTextStyle: {
    marginTop: "5%",
    fontSize: Fonts.size.smallerTitle,
    marginHorizontal: "5%",
    color: Colors.black,
  },
  fileContainerStyle: {
    width: 100,
    height: 100,
    marginLeft: "5%",
    marginTop: "5%",
    backgroundColor: Colors.paleGrey,
    borderColor: Colors.whiteTwo,
    borderWidth: 1
  },
  roundedIconContainer: {
    width: 100,
    alignSelf: 'center',
    marginTop: Platform.OS === "ios" ? "75%" : "65%"
  },
  roundedBackground: {
    backgroundColor: Colors.duckEggBlue,
    height: 76,
    width: 76,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fileImageContainer: {
    marginHorizontal: "5%",
    marginVertical: "5%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  fileImageStyle: {
    height: 90,
    width: 90
  },
  iconStyle: {
    height: 48,
    width: 48
  },
  docSentSuccessImage: {
    height: 80,
    width: 80
  }

});
