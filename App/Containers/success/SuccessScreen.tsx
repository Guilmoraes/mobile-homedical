import * as React from "react";
import {Image, Text, View} from "react-native";
import {connect} from "react-redux";
import styles from './SuccessScreenStyles'
import LoadingButton from '../../Components/LoadingButton'
import I18n from '../../i18n/i18n'
import {Actions as NavigationActions} from 'react-native-router-flux'

export interface Props {
  configScreen: any
}

export interface State {
}

export default class SuccessScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  };

  public render() {
    const {icon, iconStyle, title, message, textStyle, messageStyle, buttonTitle, buttonCallback} = this.props.configScreen;

    return (
      <View style={styles.container}>

        <View style={styles.roundedIconContainer}>
          <View style={styles.roundedBackground}>
            <Image
              style={iconStyle ? [styles.iconStyle, iconStyle] : styles.iconStyle}
              source={icon ? icon : require("../../Images/ic-success.png")}
            />
          </View>
        </View>

        <Text style={textStyle ? [styles.textStyle, textStyle] : styles.textStyle}>{title}</Text>

        {
          (message) ? <Text style={messageStyle ? [styles.messageStyle, messageStyle] : styles.messageStyle}>{message}</Text> : <View/>
        }

        <LoadingButton
          title={buttonTitle ? buttonTitle : I18n.t(['successScreen', 'btnText'])}
          onButtonPressed={() => {
            NavigationActions.pop();
            buttonCallback();
          }}
          viewStyle={styles.buttonStyle}/>

      </View>
    );
  }
}
