import {StyleSheet, Platform, TextStyle, ImageStyle, ViewStyle} from 'react-native';
import {Colors, Fonts, Metrics} from '../../Themes/index';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    } as ViewStyle,
    signatureContainer: {
        height: '65%'
    } as ViewStyle,
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '20%',
        marginHorizontal: responsiveHeight(3)
    } as ViewStyle,
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '15%',
        marginHorizontal: responsiveHeight(3)
    } as ViewStyle,
    infoContainer: {
        flexDirection: 'row',
    } as ViewStyle,
    imageClose: {
        height: responsiveHeight(3),
        width: responsiveHeight(3),
        marginRight: responsiveWidth(2),
        resizeMode: 'contain'
    },
    headerImageStyle: {
        width: responsiveHeight(4),
        height: responsiveHeight(4),
        resizeMode: 'contain'
    } as ImageStyle,
    title: {
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        fontSize: Fonts.size.smallerTitle,
        color: Colors.darkTeal
    } as TextStyle,
    nextText: {
        fontFamily: 'Roboto-Regular',
        fontSize: Fonts.size.smallerTitle,
        color: Colors.tealish
    } as TextStyle,
    infoText: {
        fontFamily: 'Roboto-Light',
        fontSize: Fonts.size.input,
        color: Colors.darkBlueGrey
    } as TextStyle,
    cleanText: {
        fontFamily: 'Roboto-Regular',
        fontSize: Fonts.size.input,
        color: Colors.tealish
    } as TextStyle,
    imageContainer: {
        marginTop: '10%',
        alignSelf: 'center',
        height: Metrics.screenHeight * 0.75,
        width: Metrics.screenWidth * 0.8,
    },
    imageStyle: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});
