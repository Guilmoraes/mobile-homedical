import * as React from "react";
import {Image, Text, View} from "react-native";
import {connect} from "react-redux";
import styles from './ErrorScreenStyles'
import LoadingButton from '../../Components/LoadingButton'
import I18n from '../../i18n/i18n'
import {Actions as NavigationActions} from 'react-native-router-flux'

export interface Props {
  configScreen: any
}

export interface State {
}

export default class ErrorScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  };

  public render() {
    const {icon, iconStyle, message, textStyle, buttonTitle, buttonCallback} = this.props.configScreen;

    return (
      <View style={styles.container}>

        <View style={styles.roundedIconContainer}>
          <View style={styles.roundedBackground}>
            <Image
              style={iconStyle ? [styles.iconStyle, iconStyle] : styles.iconStyle}
              source={icon ? icon : require("../../Images/ic-error.png")}
            />
          </View>
        </View>

        <Text style={textStyle ? [styles.textStyle, textStyle] : styles.textStyle}>{message}</Text>

        <LoadingButton
          title={buttonTitle ? buttonTitle : I18n.t(['errorScreen', 'btnText'])}
          onButtonPressed={() => {
            buttonCallback();
            NavigationActions.pop();
          }}
          viewStyle={styles.buttonStyle}/>

      </View>
    );
  }
}
