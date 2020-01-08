import { StyleSheet, Platform, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors, Fonts, Metrics } from '../../Themes/index';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1
    },
    inputTypePatientContainer: {
        marginTop: Platform.OS === 'ios' ? '23%' : '20%',
        marginHorizontal: '5%',
        marginBottom: '1%'
    },
    inputTypeDutyTimeContainer: {
        marginHorizontal: '5%'
    },
    headerInputStyle: {
        paddingBottom: 30,
        height: 65
    },
    inputTextStyle: {
        fontSize: Fonts.size.regular
    },
    scheduleImagesContainer: {
        marginTop: responsiveHeight(3),
        marginLeft: responsiveWidth(3)
    } as ViewStyle,
    cardItemContainer: {
        backgroundColor: Colors.white,
        borderRadius: 4,
        flexDirection: 'column',
        borderWidth: 1,
        height: responsiveHeight(20),
        width: '91%',
        marginHorizontal: '5%',
        marginVertical: '1%',
        borderColor: Colors.whiteTwo,
        justifyContent: 'center'
    },
    cardTitle: {
        alignSelf: 'center',
        fontSize: Fonts.size.smallerTitle,
        marginTop: Metrics.baseMargin,
        fontFamily: 'Roboto-Light'
    },
    imagesTitle: {
        marginLeft: responsiveWidth(3),
        fontSize: Fonts.size.input,
        marginTop: Metrics.baseMargin,
        fontFamily: 'Roboto-Medium'
    } as TextStyle,
    headerComponentInitialCalendarContainer: {
        height: 55,
        width: 142
    },
    headerComponentCalendarIconStyle: {
        height: 25,
        width: 25
    },
    headerComponentCalendarIncreaseLabelMarginLeft: {
        marginLeft: '21%'
    },
    headerComponentCalendarIncreaseMarginBottomFocused: {
        marginBottom: '70%'
    },
    headerComponentCalendarIncreaseInputPaddingLeft: {
        paddingLeft: '23%',
        color: Colors.tealish
    },
    headerComponentCalendarStyle: {
        height: 55,
        width: 140
    },
    headerComponentCalendarContainer: {
        flexDirection: 'row',
        marginHorizontal: '7%',
        marginBottom: '6%',
        marginTop: '1%',
        justifyContent: 'space-between'
    },
    syncButtonContainer: {
        alignItems: 'center'
    },
    syncButtonTextStyle: {
        color: Colors.tealish
    },
    syncButtonStyle: {
        borderColor: Colors.tealish,
        borderWidth: 1,
        backgroundColor: Colors.background
    },
    syncButton: {
        marginTop: '5%',
        alignSelf: 'center'
    },
    notSyncButtonTextStyle: {
        color: Colors.waterMelon
    },
    notSyncButtonStyle: {
        borderColor: Colors.waterMelon,
        borderWidth: 1,
        backgroundColor: Colors.background
    },
    notSyncButton: {
        marginTop: '5%',
        alignSelf: 'center'
    },
    buttonContainer: {
        alignItems: 'center'
    },
    viewButtonStyle: {
        alignSelf: 'center'
    },
    buttonStyle: {
        backgroundColor: Colors.aquaBlue
    },
    labelDutyNotSyncStyle: {
        marginTop: Metrics.baseMargin,
        fontSize: Fonts.size.small,
        color: Colors.darkBlueGrey,
        fontFamily: 'Roboto-Regular'
    },
    syncSuccessImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    modalContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },
    modalDatePickerContainer: {
        backgroundColor: 'white',
        height: '40%',
        width: '100%'
    },
    modalConfirmButton: {
        color: Colors.aquaBlue,
        fontSize: Fonts.size.regular,
        fontWeight: 'bold'
    },
    modalCancelButton: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.regular,
        fontWeight: 'bold'
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '20%'
    },
    signatureContainer: {
        height: responsiveHeight(23),
        marginHorizontal: responsiveWidth(6),
        marginBottom: responsiveHeight(7)
    } as ViewStyle,
    signatureImageContainer: {
        marginTop: responsiveHeight(2),
        height: responsiveHeight(20),
        width: '100%',
        backgroundColor: Colors.paleGrey,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    signatureTitle: {
        fontSize: Fonts.size.input,
        marginTop: Metrics.baseMargin,
        fontFamily: 'Roboto-Medium'
    } as TextStyle,
    signatureImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '80%'
    } as ImageStyle,
    signatureLineContainer: {
        borderBottomWidth: 0.5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomColor: Colors.darkBlueGrey
    } as ViewStyle,
    separatorLine: {
        height: 1,
        marginVertical: responsiveHeight(2),
        marginHorizontal: responsiveWidth(6),
        backgroundColor: Colors.veryLightBlue
    } as ViewStyle
});
