import { StyleSheet, Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/index';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.background
    } as ViewStyle,
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: responsiveHeight(16),
        marginHorizontal: responsiveWidth(6)
    } as ViewStyle,
    headerTextStyle: {
        fontSize: Fonts.size.input,
        color: Colors.tealish,
        fontWeight: Platform.OS === 'ios' ? '700' : '300'
    } as TextStyle,
    touchText: {
        fontFamily: 'Roboto-Light',
        fontSize: Fonts.size.regular,
        color: Colors.tealish,
        marginTop: responsiveHeight(1)
    } as TextStyle,
    signatureIcon: {
        width: responsiveHeight(12),
        height: responsiveHeight(12),
        resizeMode: 'contain'
    } as ImageStyle,
    signatureImage: {
        width: '100%',
        height: '100%',

        resizeMode: 'contain'
    } as ImageStyle,
    firstTextStyle: {
        fontSize: Fonts.size.smallerTitle,
        fontFamily: 'Roboto-Light',
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(10),
        marginBottom: responsiveHeight(2.5),
        color: Colors.black
    } as TextStyle,
    headerImageStyle: {
        width: responsiveHeight(4),
        height: responsiveHeight(4),
        resizeMode: 'contain'
    } as ImageStyle,
    signatureContainer: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.tealish,
        height: responsiveHeight(40),
        width: responsiveWidth(80),
        backgroundColor: Colors.white,
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(8),
        paddingHorizontal: responsiveWidth(10)
    } as ViewStyle
});
