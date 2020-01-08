import { StyleSheet, Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/index';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  } as ViewStyle,
  imageSchedule: {
    height: responsiveHeight(21),
    width: responsiveHeight(21),
    alignSelf: 'center'
  } as ImageStyle,
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: responsiveHeight(10),
    marginBottom: responsiveHeight(10),
    marginHorizontal: responsiveWidth(6)
} as ViewStyle,
headerImageStyle: {
  width: responsiveHeight(4),
  height: responsiveHeight(4),
  resizeMode: 'contain'
} as ImageStyle,
  titleText: {
    marginTop: responsiveHeight(8),
    fontSize: Fonts.size.biggerTitle,
    color: Colors.darkTeal,
    marginHorizontal: responsiveWidth(12),
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular'
  } as TextStyle,
  label: {
    marginTop: '10%',
    fontSize: Fonts.size.regular,
    color: Colors.darkBlueGrey,
    textAlign: 'center',
    fontFamily: 'Roboto-Light'
  } as TextStyle,
  value: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center'
  } as TextStyle,
  buttonContainer: {
    marginTop: responsiveHeight(5),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  } as ViewStyle,
  positiveButton: {
    marginTop: '5%',
    alignSelf: 'center'
  } as ViewStyle,
  positiveButtonStyle: {
    width: Platform.OS === 'ios' ? 140 : 160,
    marginLeft: responsiveWidth(5)
  } as ViewStyle,
  negativeButton: {
    marginTop: '5%',
    alignSelf: 'center'
  } as ViewStyle,
  negativeButtonTextStyle: {
    color: Colors.tealish
  } as TextStyle,
  negativeButtonStyle: {
    borderColor: Colors.tealish,
    borderWidth: 1,
    width: Platform.OS === 'ios' ? 140 : 160,
    backgroundColor: Colors.background
  } as ViewStyle
});
