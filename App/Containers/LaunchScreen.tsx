import React from 'react'
import {View, Text, Image} from 'react-native'
import {Actions as NavigationActions} from 'react-native-router-flux'
// Styles
import styles from './Styles/LaunchScreenStyles'
import {connect} from 'react-redux'
import I18n from '../i18n/i18n'
import {Navigation} from "../Enums/Navigation";

class LaunchScreen extends React.Component {

  constructor(props: any) {
    super(props);
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps && newProps.authToken) {
      setTimeout(() => {
        NavigationActions.home({type: 'reset'});
      }, 100);
    } else {
      setTimeout(() => {
        NavigationActions.login({type: 'reset'});
      }, 100);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.titleContainer}>

          <View style={styles.circleImageContainer}>
            <Image
              style={styles.imageHouseAndNurseStyle}
              source={require("../Images/ic-house-nurse-login.png")}
            />
          </View>

          <View style={styles.textStyle}>
            <Text style={styles.firstLabelTitle}>{I18n.t(["loginScreen", "duty"])}</Text>
            <Text style={styles.secondLabelTitle}>{I18n.t(["loginScreen", "nursing"])}</Text>
          </View>


        </View>

      </View>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    authToken: state.login.authToken,
    loginLoad: state.login.loginLoad,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
