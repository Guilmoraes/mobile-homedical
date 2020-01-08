import {Colors, Fonts,} from '../../Themes/'
import {Platform} from "react-native";

export default {
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: Colors.aquaBlue
  },
  title: {
    color: Colors.snow
  },
  leftButton: {
    tintColor: Colors.snow
  },
  rightButton: {
    color: Colors.snow
  },
  navBarTitle: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.charcoalGrey,
    fontFamily: 'Roboto-Regular'
  },
  clearLeftButton: {
    paddingLeft: 20
  },
  leftButtonImage: {
    width: 16,
    resizeMode: 'contain',
    height: 16
  },
  rightButtonScheduleStyle: {
    top: Platform.OS === "ios" ? 21 : 7,
    height: 50,
    right: 10,
    padding: 0,

  }
}
