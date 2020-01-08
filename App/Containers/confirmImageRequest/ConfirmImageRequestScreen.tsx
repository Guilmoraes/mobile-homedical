import * as React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from './ConfirmImageRequestScreenStyles';
import I18n from '../../i18n/i18n';
import LoadingButton from '../../Components/LoadingButton';
import { Images } from '../../Themes';

export interface Props {
    configScreen?: any;
}

export interface State {
    configScreen?: any;
}

class ConfirmImageRequestScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            configScreen: props.configScreen
        };
    }
    
    handleNegativeButtonPressed = () => {
        this.state.configScreen.negativeCallback();
    };

    handlePositiveButtonPressed = () => {
        this.state.configScreen.positiveCallback();
    };

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => NavigationActions.pop()}>
                        <Image style={styles.headerImageStyle} source={Images.backBlueArrow} />
                    </TouchableOpacity>
                </View>
                <Image style={styles.imageSchedule} source={require('../../Images/icn-lg-image.png')} />
                <Text style={styles.titleText}>{this.state.configScreen.title}</Text>
                <View style={styles.buttonContainer}>
                    <LoadingButton
                        textStyle={styles.negativeButtonTextStyle}
                        buttonStyle={styles.negativeButtonStyle}
                        title={I18n.t([ 'confirmScheduleScreen', 'negativeButton' ])}
                        onButtonPressed={() => this.handleNegativeButtonPressed()}
                        viewStyle={styles.negativeButton}
                    />

                    <LoadingButton
                        title={I18n.t([ 'confirmScheduleScreen', 'positiveButton' ])}
                        onButtonPressed={() => this.handlePositiveButtonPressed()}
                        buttonStyle={styles.positiveButtonStyle}
                        viewStyle={styles.positiveButton}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmImageRequestScreen);
