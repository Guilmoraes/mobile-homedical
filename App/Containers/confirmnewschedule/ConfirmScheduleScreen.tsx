import * as React from "react";
import {Image, Text, View} from "react-native";
import {connect} from "react-redux";
import styles from "./ConfirmScheduleScreenStyles";
import I18n from '../../i18n/i18n'
import LoadingButton from "../../Components/LoadingButton";

export interface Props {
  configScreen?: any
}

export interface State {
  configScreen?: any
}

class ConfirmNewScheduleScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      configScreen: props.configScreen
    };
  };

  componentDidMount() {
  }

  componentWillReceiveProps(newProps: any) {
  }

  handleNegativeButtonPressed = () => {
    this.state.configScreen.negativeCallback()
  };

  handlePositiveButtonPressed = () => {
    this.state.configScreen.positiveCallback()
  };

  public render() {
    return (
      <View style={styles.container}>

        <Image style={styles.imageSchedule} source={require('../../Images/ic-schedule-confirmation.png')}/>

        <Text style={styles.titleText}>{this.state.configScreen.title}</Text>

        <Text style={styles.patientContainer}>
          <Text style={styles.label}>{I18n.t(['confirmScheduleScreen', 'patientLabel'])}</Text>
          <Text style={[styles.label, styles.value]}>{this.state.configScreen.patientName}</Text>
        </Text>


        <Text style={styles.hourContainer}>
          <Text style={styles.label}>{this.state.configScreen.message}</Text>
          <Text style={[styles.label, styles.value]}>{this.state.configScreen.hour}</Text>
        </Text>

        <View style={styles.buttonContainer}>

          <LoadingButton
            textStyle={styles.negativeButtonTextStyle}
            buttonStyle={styles.negativeButtonStyle}
            title={I18n.t(['confirmScheduleScreen', 'negativeButton'])}
            onButtonPressed={() => this.handleNegativeButtonPressed()}
            viewStyle={styles.negativeButton}/>

          <LoadingButton
            title={I18n.t(['confirmScheduleScreen', 'positiveButton'])}
            onButtonPressed={() => this.handlePositiveButtonPressed()}
            buttonStyle={styles.positiveButtonStyle}
            viewStyle={styles.positiveButton}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmNewScheduleScreen)

