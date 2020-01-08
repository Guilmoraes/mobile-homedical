import { StyleSheet, Platform } from "react-native";
import { Colors, Fonts, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  firstMessage: {
    fontSize: Fonts.size.biggerTitle,
    alignSelf: 'center',
    color: Colors.darkBlueGrey,
    marginTop: "15%"
  },
  secondMessage: {
    fontSize: Fonts.size.biggerTitle,
    alignSelf: 'center',
    color: Colors.darkBlueGrey,
    textAlign: 'center'
  },
  thirdMessage: {
    marginTop: "5%",
    marginHorizontal: "10%",
    fontSize: Fonts.size.input,
    alignSelf: 'center',
    color: Colors.darkBlueGrey,
    textAlign: 'center'
  },
  thirdMessageBold: {
    fontWeight: 'bold'
  },
  itemContainer: {
    alignSelf: 'center',
    width: '100%',
    marginVertical: "1%",
    flexDirection: 'row',
  },
  itemImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },
  itemText: {
    color: Colors.darkBlueGrey,
    fontSize: Fonts.size.medium,
    fontFamily: 'Roboto-Regular',
    marginLeft: 10
  },
  divisor: {
    marginVertical: "2%",
    height: 1,
    backgroundColor: Colors.whiteTwo
  },
  flatList: {
    marginHorizontal: "15%",
    marginBottom: "5%",
    marginTop: Platform.OS === "ios" ? "10%" : "6%"
  },
  button: {
    alignSelf: 'center',
    marginBottom: Platform.OS === "ios" ? "12%" : "5%"
  }

});
