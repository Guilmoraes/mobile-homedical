import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%"
  },
  editPerfilImageStyle: {
    width: 28,
    height: 28,
    alignSelf: "flex-end",
    marginTop: Platform.OS === "ios" ? "15%" : "5%",
    marginRight: "5%"
  },
  circleContainer: {
    backgroundColor: Colors.pale,
    height: 203,
    width: 203,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: "10%"
  },
  circleImage: {
    width: 36,
    height: 36,
    marginTop: "7%"
  },
  circleNumber: {
    marginTop: -15,
    fontSize: Fonts.size.astronomicSize,
    color: Colors.darkBlueGrey,
    fontFamily: 'Roboto-Medium'
  },
  circleText: {
    fontSize: Fonts.size.medium,
    color: Colors.darkBlueGrey,
    textAlign: 'center',
    marginTop: -12,
    fontFamily: 'Roboto-Medium'
  },
  scheduleButton: {
    marginTop: "10%",
    alignSelf: "center"
  },
  syncButton: {
    marginTop: "5%",
    alignSelf: "center",

  },
  syncButtonTextStyle: {
    color: Colors.tealish
  },
  syncButtonStyle: {
    borderColor: Colors.tealish,
    borderWidth: 1,
    backgroundColor: Colors.background
  },
  textLogoutContainer: {
    alignSelf: 'center',
    marginTop: "10%"
  },
  textLogoutStyle: {
    flex: 1,
    color: Colors.darkBlueGrey,
    fontSize: Fonts.size.medium,
    fontFamily: 'Roboto-Medium'
  },
  syncSuccessImage: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  }

});
