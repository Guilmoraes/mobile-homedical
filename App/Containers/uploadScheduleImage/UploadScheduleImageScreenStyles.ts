import { StyleSheet, Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/index';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.background
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: responsiveHeight(16),
        marginHorizontal: responsiveWidth(6)
    } as ViewStyle,
    headerImageStyle: {
        width: responsiveHeight(4),
        height: responsiveHeight(4),
        resizeMode: 'contain'
    } as ImageStyle,
    headerTextStyle: {
        fontSize: Fonts.size.input,
        color: Colors.tealish,
        fontWeight: Platform.OS === 'ios' ? '700' : '300'
    } as TextStyle,
    firstTextStyle: {
        fontSize: Fonts.size.smallerTitle,
        fontFamily: 'Roboto-Light',
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(10),
        marginBottom: responsiveHeight(2.5),
        color: Colors.black
    } as TextStyle,
    roundedIconContainer: {
        width: '100%',
        height: responsiveHeight(25),
        alignSelf: 'center'
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
    iconStyle: {
        height: 48,
        width: 48
    },
    docSentSuccessImage: {
        height: 80,
        width: 80
    }
});
