import {StyleSheet, Platform} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: Metrics.screenHeight
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: "5%",
    marginTop: "7%",
    height: 40,
  },
  imageClose: {
    height: 24,
    width: 24,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  deleteText: {
    fontSize: Fonts.size.input,
    alignSelf: 'center',
    color: Colors.waterMelon
  },
  imageContainer: {
    marginTop: "10%",
    alignSelf: 'center',
    height: Metrics.screenHeight * 0.75,
    width: Metrics.screenWidth * 0.8,
  },
  imageStyle: {
    alignSelf: 'center',
    width: "100%",
    height: "100%",
    resizeMode: 'contain'
  }
});
