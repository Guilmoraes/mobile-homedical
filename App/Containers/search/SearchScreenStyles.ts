import {StyleSheet} from "react-native";
import {Colors, Fonts, Metrics} from "../../Themes/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  closeImageContainer: {
    alignSelf: 'flex-end',
    marginVertical: 40,
    marginRight: 25
  },
  closeImage: {
    width: 20,
    height: 20
  },
  titleStyle: {
    alignSelf: 'center',
    marginTop: '5%',
    fontSize: Fonts.size.biggerTitle,
    color: Colors.darkBlueGrey,
    marginBottom: "6%"
  },
  inputStyle: {
    marginHorizontal: "10%"
  },
  flatList:{
    marginTop: "10%",
    marginBottom: "5%"
  },
  itemContainer: {
    marginBottom: '4%'
  },
  textItem: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    color: Colors.darkBlueGrey
  }
});
