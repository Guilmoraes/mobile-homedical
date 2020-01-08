import React, {Component} from 'react'
import {Router, Scene, Actions} from 'react-native-router-flux'
import {Colors} from '../Themes/index'
import styles from './Styles/NavigationContainerStyles'
import I18n from '../i18n/i18n'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/login/LoginScreen'
import ForgotPasswordScreen from '../Containers/forgotpassword/ForgotPasswordScreen'
import {View, Image, TouchableOpacity} from 'react-native'
import SuccessScreen from '../Containers/success/SuccessScreen'
import ErrorScreen from '../Containers/error/ErrorScreen'
import RegisterProfessionalScreen from '../Containers/registerprofessional/RegisterProfessionalScreen'
import SearchScreen from '../Containers/search/SearchScreen'
import EditPerfilScreen from '../Containers/editperfil/EditPerfilScreen'
import ScheduleScreen from '../Containers/schedule/ScheduleScreen'
import NewScheduleScreen from '../Containers/newschedule/NewScheduleScreen'
import ConfirmScheduleScreen from '../Containers/confirmnewschedule/ConfirmScheduleScreen'
import DocumentFirstAccessScreen from '../Containers/documentFirstAccess/DocumentFirstAccessScreen'
import PendingDocumentsScreen from '../Containers/pendingdocumentsscreen/PendingDocumentsScreen'
import WaitingDocsApprovementScreen from '../Containers/waitingodocsapprovement/WaitingDocsApprovementScreen'
import HomeScreen from '../Containers/home/HomeScreen'
import FinishScheduleScreen from '../Containers/finishschedule/FinishScheduleScreen'
import EditScheduleScreen from '../Containers/editschedule/EditScheduleScreen'
import {Navigation} from '../Enums/Navigation'
import UploadDocumentsScreen from '../Containers/uploaddocuments/UploadDocumentsScreen'
import DocumentFullScreen from '../Containers/documentfullscreen/DocumentFullScreen'
import ConfirmImageRequestScreen from '../Containers/confirmImageRequest/ConfirmImageRequestScreen'
import UploadScheduleImageScreen from '../Containers/uploadScheduleImage/UploadScheduleImageScreen'
import ScheduleSignatureScreen from '../Containers/scheduleSignature/ScheduleSignatureScreen'
import SignatureScreen from '../Containers/signatureScreen/SignatureScreen'

// ignite-jhipster-navigation-import-needle

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

let backButton = (
  <TouchableOpacity onPress={() => Actions.pop()}>
    <View style={styles.clearLeftButton}>
      <Image style={styles.leftButtonImage} source={require('../Images/back-button-black.png')} />
    </View>
  </TouchableOpacity>)

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='root'>

          <Scene key={Navigation.LaunchScreen} component={LaunchScreen} hideNavBar />

          <Scene key={Navigation.HomeScreen} component={HomeScreen} hideNavBar />

          <Scene key={Navigation.LoginScreen} component={LoginScreen} hideNavBar />

          <Scene key={Navigation.SuccessScreen} component={SuccessScreen} hideNavBar />
          <Scene key={Navigation.ErrorScreen} component={ErrorScreen} hideNavBar />
          <Scene key={Navigation.SearchScreen} component={SearchScreen} hideNavBar />

          <Scene key={Navigation.RegisterProfessionalScreen}
            component={RegisterProfessionalScreen}
            renderBackButton={() => backButton}
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle}
                 />

          <Scene key={Navigation.ForgotPasswordScreen}
            renderBackButton={() => backButton}
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle}
            component={ForgotPasswordScreen} />

          <Scene key={Navigation.EditPerfilScreen}
            component={EditPerfilScreen}
            renderBackButton={() => backButton}
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle} />

          <Scene key={Navigation.ScheduleScreen}
            component={ScheduleScreen}
            title={I18n.t(['scheduleScreen', 'title'])}
            renderBackButton={() => backButton}
            rightButtonStyle={styles.rightButtonScheduleStyle}
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle}
          />

          <Scene key={Navigation.FinishScheduleScreen}
            component={FinishScheduleScreen}
            title={I18n.t(['finishScheduleScreen', 'title'])}
            renderBackButton={() => backButton}
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle} />

          <Scene key={Navigation.EditScheduleScreen}
            component={EditScheduleScreen}
            title={I18n.t(['editScheduleScreen', 'title'])}
            renderBackButton={() => backButton}
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle} />

          <Scene key={Navigation.NewScheduleScreen} component={NewScheduleScreen} hideNavBar />

          <Scene key={Navigation.ConfirmScheduleScreen} component={ConfirmScheduleScreen} hideNavBar />

          <Scene key={Navigation.ConfirmImageRequestScreen} component={ConfirmImageRequestScreen} hideNavBar />

          <Scene key={Navigation.DocumentFirstAccessScreen} component={DocumentFirstAccessScreen} hideNavBar />

          <Scene key={Navigation.PendingDocumentsScreen} component={PendingDocumentsScreen} hideNavBar />

          <Scene key={Navigation.WaitingDocsApprovementScreen} component={WaitingDocsApprovementScreen} hideNavBar />

          <Scene key={Navigation.UploadDocumentsScreen} component={UploadDocumentsScreen} hideNavBar />

          <Scene key={Navigation.UploadScheduleImageScreen} component={UploadScheduleImageScreen} hideNavBar />

          <Scene key={Navigation.SignatureScreen} component={SignatureScreen} hideNavBar />

          <Scene key={Navigation.ScheduleSignatureScreen} component={ScheduleSignatureScreen} hideNavBar />

          <Scene key={Navigation.DocumentFullScreen} component={DocumentFullScreen} hideNavBar />

          {/* ignite-jhipster-navigation-needle */}
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
