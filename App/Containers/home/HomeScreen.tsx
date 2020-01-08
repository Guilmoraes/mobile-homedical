import * as React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import styles from "./HomeScreenStyles";
import I18n from '../../i18n/i18n'
import LoadingButton from "../../Components/LoadingButton";
import LoginActions from '../../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import SyncActions from '../../Redux/sync/SyncRedux'
import DocumentActions from '../../Redux/document/DocumentRedux'
import { ProgressDialog } from 'react-native-simple-dialogs';
import moment from "moment";
import ScheduleQueries from '../../Data/queries/ScheduleQueries'
import StringUtils from "../../Utils/StringUtils";
import AccountActions from "../../Redux/AccountRedux"
import AcceptTermsComponent from "../../Components/acceptterms/AcceptTermsComponent"
import Toast from "../../Utils/Toast";

export interface Props {
  requestLogin: (email: string, password: string) => void,
  requestSync: () => void
  logout: () => void,
  loadingSync?: any,
  startCheckDocumentProcess: () => void,
  loadingCheckDocumentProcess?: boolean,
  lastCheckDocuments?: any,
  acceptedTerms?: boolean,
  startProcessOfAcceptTerms: () => void,
  acceptTermLoading?: boolean,
  acceptTerm: () => void
}

export interface State {
  scheduleNumber: string,
  loadingCheckDocumentProcess: boolean,
  showTermModal: boolean
}

class HomeScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    let formattedScheduleNumber = StringUtils.integerTwoDigits(ScheduleQueries.lenghtOfSchedulesInMonth(moment().startOf('month').toDate(), moment().endOf('month').toDate()));

    this.state = {
      scheduleNumber: formattedScheduleNumber,
      loadingCheckDocumentProcess: false,
      showTermModal: false
    };
  };

  componentWillReceiveProps(newProps: any) {

    if (newProps.userHaveToAcceptTerm) {
      this.setState({ showTermModal: true })
      return;
    }

    if (newProps.acceptTermSuccess) {
      this.setState({ showTermModal: false })
    }

    this.setState({ loadingCheckDocumentProcess: newProps.loadingCheckDocumentProcess });

    if (!newProps.loadingSync) {

      if (newProps.loadingSyncError) {

        let configScreen = {
          message: I18n.t(['homeScreen', 'syncErrorMessage']),
          buttonCallback: () => {
          }
        };

        NavigationActions.error({ configScreen: configScreen })

      } else if (newProps.loadingSyncSuccess) {

        let configScreen = {
          title: I18n.t(['homeScreen', 'syncSuccessTitle']),
          icon: require('../../Images/ic-sync-success.png'),
          iconStyle: styles.syncSuccessImage,
          buttonCallback: () => {
            NavigationActions.pop();
          }
        };

        NavigationActions.success({ configScreen: configScreen })

      }
    }

    if (newProps.showFirstDocumentAccess && newProps.pendingDocuments) {
      NavigationActions.documentFirstAccess({ type: 'reset', pendingDocuments: newProps.pendingDocuments });
    }

    if (newProps.showPendingDocumentScreen && newProps.pendingDocuments) {
      NavigationActions.pendingDocuments({ pendingDocuments: newProps.pendingDocuments });
    }

    if (newProps.showWaitingDocsApprovementScreen) {
      NavigationActions.waitingDocsApprovement({ type: 'reset', pendingDocuments: newProps.pendingDocuments });
    }
  }

  componentDidMount() {
    if ((!this.props.lastCheckDocuments || !this.props.lastCheckDocuments.success) || moment(new Date()).isAfter(moment(this.props.lastCheckDocuments.date.date), 'day')) {
      this.startCheckDocumentProcess();
      return;
    }

    if (this.props.acceptedTerms !== undefined || !this.props.acceptedTerms) {
      this.props.startProcessOfAcceptTerms()
      return;
    }
  }

  startCheckDocumentProcess = () => {
    this.setState({ loadingCheckDocumentProcess: true });
    this.props.startCheckDocumentProcess();
  };

  handleLogoutPressed = () => {
    Alert.alert(
      I18n.t(['homeScreen', 'warningLogoutTittle']),
      I18n.t(['homeScreen', 'warningLogoutMessage']),
      [
        {
          text: I18n.t(['homeScreen', 'cancel'])
        },
        {
          text: I18n.t(['homeScreen', 'yes']),
          onPress: () => {
            this.props.logout();
            NavigationActions.login({ type: 'reset' });
          }
        }
      ]
    );
  };

  handleEditPerfilPressed = () => {
    NavigationActions.editPerfil()
  };

  handleScheduleButtonPressed = () => {
    NavigationActions.schedule()
  };

  handleSyncButtonPressed = () => {
    this.props.requestSync();
  };

  handleModalButtonPressed = () => {
    this.props.acceptTerm();
  }

  public render() {
    return (
      <View style={styles.container}>

        <AcceptTermsComponent
          showModal={this.state.showTermModal}
          isLoading={this.props.acceptTermLoading}
          handleButtonPressed={() => this.handleModalButtonPressed()}
        />
        <ProgressDialog
          visible={this.state.loadingCheckDocumentProcess}
          title={I18n.t(['homeScreen', 'checkingDocumentsLoadingTitle'])}
          message={I18n.t(['homeScreen', 'checkingDocumentsLoadingMessage'])}
        />

        <TouchableOpacity onPress={() => this.handleEditPerfilPressed()}>
          <Image
            style={styles.editPerfilImageStyle}
            source={require('../../Images/ic-edit-perfil.png')}
          />
        </TouchableOpacity>

        <View style={styles.circleContainer}>

          <Image
            style={styles.circleImage}
            source={require('../../Images/ic-stethoscope.png')}
          />

          <Text style={styles.circleNumber}>{this.state.scheduleNumber}</Text>

          <Text style={styles.circleText}>{I18n.t(['homeScreen', 'schedulesDone'])}</Text>

        </View>

        <LoadingButton
          icon={require('../../Images/ic-schedule-button.png')}
          title={I18n.t(['homeScreen', 'scheduleButton'])}
          isLoading={false}
          onButtonPressed={() => this.handleScheduleButtonPressed()}
          viewStyle={styles.scheduleButton} />

        <LoadingButton
          textStyle={styles.syncButtonTextStyle}
          buttonStyle={styles.syncButtonStyle}
          isLoading={this.props.loadingSync}
          loadingImage={require("../../Images/loading-sync-icon.png")}
          icon={require('../../Images/ic-sync-button.png')}
          title={I18n.t(['homeScreen', 'syncButton'])}
          onButtonPressed={() => this.handleSyncButtonPressed()}
          viewStyle={styles.syncButton} />

        <TouchableOpacity style={styles.textLogoutContainer} onPress={() => this.handleLogoutPressed()}>
          <Text style={styles.textLogoutStyle}>{I18n.t(['homeScreen', 'logoutText'])}</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loadingSync: state.sync.loading,
    loadingSyncSuccess: state.sync.success,
    loadingSyncError: state.sync.error,
    loadingCheckDocumentProcess: state.document.loadingCheckDocumentProcess,
    showFirstDocumentAccess: state.document.requestToShowDocumentFirstAccess,
    showPendingDocumentScreen: state.document.requestToShowDocumentPending,
    showWaitingDocsApprovementScreen: state.document.requestToShowWaitingDocsApprovement,
    pendingDocuments: state.document.pendingDocuments,
    lastCheckDocuments: state.local.lastCheckDocuments,
    acceptedTerms: state.local.acceptedTerms,
    requestCheckDocumentProcessError: state.document.requestCheckDocumentProcessError,
    userHaveToAcceptTerm: state.account.userHaveToAcceptTerm,
    acceptTermLoading: state.account.acceptTermLoading,
    acceptTermSuccess: state.account.acceptTermSuccess,
    acceptTermError: state.account.acceptTermError
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest()),
    requestSync: () => dispatch(SyncActions.syncRequest()),
    startCheckDocumentProcess: () => dispatch(DocumentActions.startCheckDocumentProcess()),
    startProcessOfAcceptTerms: () => dispatch(AccountActions.startProcessOfCheckIfUserHadAcceptedTerm()),
    acceptTerm: () => dispatch(AccountActions.requestToAcceptTerms())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

