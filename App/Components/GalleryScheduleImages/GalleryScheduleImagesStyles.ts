import {StyleSheet, Platform, ViewStyle, ImageStyle} from 'react-native';
import Colors from '../../Themes/Colors';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    imagesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        minHeight: responsiveHeight(20)
    } as ViewStyle,
    itemContainer: {
        width: responsiveWidth(30),
        marginTop: responsiveWidth(2),
        marginLeft: responsiveWidth(2),
    } as ViewStyle,
    fileContainerStyle: {
        width: responsiveHeight(16),
        height: responsiveHeight(16),
        marginLeft: responsiveWidth(1),
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: Colors.paleGrey,
        borderColor: Colors.whiteTwo,
    } as ViewStyle,
    fileImageStyle: {
        height: '100%',
        width: '100%',
        borderRadius: 5
    } as ImageStyle
});
