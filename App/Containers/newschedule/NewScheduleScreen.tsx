import * as React from "react";
import { Image, Text, TouchableOpacity, View, Platform } from "react-native";
import { connect } from "react-redux";
import styles from "./NewScheduleStyles";
import I18n from '../../i18n/i18n'
import FloatingLabelInput from "../../Components/FloatingLabelInput";
import LoadingButton from "../../Components/LoadingButton";
import { Actions as NavigationActions } from 'react-native-router-flux'
import PatientActions from '../../Redux/patient/PatientRedux'
import DutyActions from '../../Redux/duty/DutyRedux'
import _ from 'lodash'
import Toast from '../../Utils/Toast'
import moment from 'moment'
import ScheduleActions from '../../Redux/schedule/ScheduleRedux'
// @ts-ignore
import { ProgressDialog } from 'react-native-simple-dialogs';
import LocationServiceAndroid from '../../Services/Location/LocationServiceAndroid'
import FusedLocation from '../../Models/FusedLocation'
import { getDistance } from 'geolib';

export interface Props {
  createSchedule: (schedule: any) => void,
  refreshScheduleState: () => void,
  createLoading?: boolean,
  createSuccess?: boolean,
  createError?: boolean,
  professional: any
}

export interface State {
  selectedPatient?: any,
  isPatientCorrect?: boolean,
  selectedDuty?: any,
  isDutyCorrect?: boolean,
  showLoadingDialog: boolean,
  disableCreateButton: boolean,
  professional: any,
  location?: FusedLocation
}

class NewScheduleScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      showLoadingDialog: false,
      disableCreateButton: false,
      professional: props.professional,
      location: undefined
    };
  };

  componentDidMount() {
    this.getCurrentLocation();
  }

  componentWillReceiveProps(newProps: any) {


    if (!newProps.createLoading) {
      this.setState({ showLoadingDialog: false, disableCreateButton: false });

      if (newProps.createSuccess) {
        this.showCreateSuccessScreen()
      }
    }

  }

  componentWillMount() {
  }

  async getCurrentLocation() {
    if (Platform.OS === 'android') {
      const location: FusedLocation = await LocationServiceAndroid.getCurrentLocation();
      this.setState({ location: location })
    } else {

      navigator.geolocation.getCurrentPosition((position) => {
        let location: FusedLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({ location: location })
      }, (error) => { }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })

    }
  }

  handleOnPatientPressed = () => {

    if (!this.state.location) {
      Toast.showToast(I18n.t(['newScheduleScreen', 'locationRequiredToProceed']));
      this.getCurrentLocation();
      return;
    }

    let configScreen = {
      title: I18n.t(['searchScreen', 'patient']),
      stateAction: 'patient',
      loadInStart: true,
      itemParams: {
        params: [['name']]
      },
      emptyPlaceholder: this.renderPatientEmptyPlaceholder
    };

    NavigationActions.search({
      configScreen: configScreen,
      performRequest: PatientActions.localPatientRequest,
      callback: this.patientCallback
    })
  };

  handleOnDutyPressed = () => {
    let configScreen = {
      title: I18n.t(['searchScreen', 'duty']),
      stateAction: 'duty',
      loadInStart: true,
      itemParams: {
        params: [['name']]
      },
      emptyPlaceholder: this.renderDutyEmptyPlaceholder
    };

    NavigationActions.search({
      configScreen: configScreen,
      performRequest: DutyActions.localDutyRequest,
      callback: this.dutyCallback
    })
  };

  handleCloseButtonPressed = () => {
    NavigationActions.pop();
  };

  handleOnStartSchedulePressed = () => {
    if (!this.validateFields()) {
      Toast.showToast(I18n.t(["newScheduleScreen", "fillFields"]));
      return;
    }

    const overTime: any = {
      hour: Number(moment(this.state.selectedDuty.overtime).format("HH")),
      minute: Number(moment(this.state.selectedDuty.overtime).format("mm"))
    };

    const dutyStartDate: any = {
      min: moment(this.state.selectedDuty.start, "HH:mm:ss")
        .subtract(overTime.hour, "hours").subtract(overTime.minute, "minutes").toDate(),
      max: moment(this.state.selectedDuty.start, "HH:mm:ss")
        .add(overTime.hour, "hours").add(overTime.minute, "minutes").toDate()
    };

    if (!this.validateDuty(dutyStartDate)) {
      Toast.showToast(I18n.t(["newScheduleScreen", "messageDutyRule"], {
        firstTime: moment(this.state.selectedDuty.start).format("HH:mm").toString(),
        secondTime: moment(this.state.selectedDuty.finish).format("HH:mm").toString(),
        thirdTime: moment.duration(moment(this.state.selectedDuty.overtime).format("HH:mm")).asMinutes().toString()
      }));
      return;
    }

    if (this.state.disableCreateButton) {
      return;
    }

    let newSchedule = {
      start: moment(),
      finish: undefined,
      synchronized: false,
      duty: this.state.selectedDuty,
      patient: this.state.selectedPatient,
      professional: this.state.professional
    };

    this.setState({ disableCreateButton: true });

    let configScreen = {
      title: I18n.t(['newScheduleScreen', 'btnStart']),
      patientName: newSchedule.patient.name,
      message: I18n.t(['newScheduleScreen', 'confirmScreenMessage']),
      hour: moment().format("HH:mm"),
      negativeCallback: () => {
        this.setState({ disableCreateButton: false });
        NavigationActions.pop();
      },
      positiveCallback: () => {
        NavigationActions.pop();
        this.handlePositiveButtonPressed(newSchedule);
      }
    };

    NavigationActions.confirmSchedule({ configScreen: configScreen })
  };


  handlePositiveButtonPressed = (schedule: any) => {
    this.setState({ showLoadingDialog: true });
    this.props.createSchedule(schedule);
  };

  dutyCallback = (duty: any) => {
    this.setState({ selectedDuty: duty, isDutyCorrect: true })
  };

  patientCallback = (patient: any) => {
    if (_.isEmpty(patient.address)) {
      Toast.showToast(I18n.t(['newScheduleScreen', 'unknowPatientAddress']))
      return;
    }

    let myLatitude = String(this.state.location!!.latitude!!)
    let myLongitude = String(this.state.location!!.longitude!!)
    let distance = getDistance({ latitude: myLatitude, longitude: myLongitude }, { latitude: patient.address.lat, longitude: patient.address.lng })

    if (distance > 500) {
      Toast.showToast(I18n.t(['newScheduleScreen', 'mustBeNearFromPatientMessage']))
      return;
    }

    if (distance <= 500) {
      this.setState({ selectedPatient: patient, isPatientCorrect: true })
    }

  };

  showCreateSuccessScreen = () => {
    let configScreen = {
      title: I18n.t(['newScheduleScreen', 'successTitle']),
      message: I18n.t(['newScheduleScreen', 'successMessage']),
      icon: require('../../Images/ic-new-schedule-success.png'),
      buttonCallback: () => {
        setTimeout(() => {
          this.props.refreshScheduleState();
          NavigationActions.pop();
        }, 100)
      }
    };

    NavigationActions.success({ configScreen: configScreen })
  };

  validateFields = () => {
    let isFieldsValid = true;

    if (_.isEmpty(this.state.selectedPatient)) {
      isFieldsValid = false;
      this.setState({ isPatientCorrect: false });
    }

    if (_.isEmpty(this.state.selectedDuty)) {
      isFieldsValid = false;
      this.setState({ isDutyCorrect: false })
    }

    return isFieldsValid;
  };

  validateDuty = (dutyStartDate: any): boolean => {
    let actualDate: any = moment.utc();
    console.tron.log({teste: dutyStartDate});

    if (moment(actualDate).isBefore(dutyStartDate.min) || moment(actualDate).isAfter(dutyStartDate.max)) {
      return false;
    }

    return true;
  }

  renderDutyEmptyPlaceholder = () => {
    return (
      <View style={styles.patientEmptyPlaceholderContainer}>
        <Text style={styles.patientEmptyPlaceholderText}>{I18n.t(['newScheduleScreen', 'dutyEmptyPlaceholderText'])}</Text>
      </View>
    )
  }

  renderPatientEmptyPlaceholder = () => {
    return (
      <View style={styles.patientEmptyPlaceholderContainer}>
        <Text style={styles.patientEmptyPlaceholderText}>{I18n.t(['newScheduleScreen', 'patientEmptyPlaceholderText'])}</Text>
      </View>
    )
  }

  public render() {
    return (
      <View style={styles.container}>


        <ProgressDialog
          visible={this.state.showLoadingDialog}
          title={I18n.t(['newScheduleScreen', 'titleLoading'])}
          message={I18n.t(['newScheduleScreen', 'messageLoading'])}
        />

        <TouchableOpacity style={styles.closeImageContainer} onPress={() => this.handleCloseButtonPressed()}>
          <Image style={styles.closeImage} source={require('../../Images/ic-close-search.png')} />
        </TouchableOpacity>

        <View style={styles.roundedImageContainer}>
          <Image style={styles.roundedImage} source={require('../../Images/ic-new-schedule.png')} />
        </View>

        <Text style={styles.title}>{I18n.t(['newScheduleScreen', 'title'])}</Text>


        <TouchableOpacity onPress={() => this.handleOnPatientPressed()}>
          <View pointerEvents='none'>
            <FloatingLabelInput
              viewStyle={styles.floatingLabelInput}
              isFieldCorrect={this.state.isPatientCorrect}
              value={this.state.selectedPatient ? this.state.selectedPatient.name : ""}
              icon={require('../../Images/ic-search-floating-label.png')}
              label={I18n.t(['newScheduleScreen', 'findPatient'])}
              isFieldEditable={false} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.handleOnDutyPressed()}>
          <View pointerEvents='none'>
            <FloatingLabelInput
              viewStyle={styles.floatingLabelInput}
              isFieldCorrect={this.state.isDutyCorrect}
              value={this.state.selectedDuty ? this.state.selectedDuty.name : ""}
              icon={require('../../Images/ic-search-floating-label.png')}
              label={I18n.t(['newScheduleScreen', 'findDuty'])}
              isFieldEditable={false} />
          </View>
        </TouchableOpacity>

        <LoadingButton title={I18n.t(['newScheduleScreen', 'btnStart'])}
          isLoading={this.props.createLoading}
          onButtonPressed={() => this.handleOnStartSchedulePressed()}
          viewStyle={styles.buttonStyle} />

      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    createLoading: state.schedule.createScheduleLoading,
    createSuccess: state.schedule.createScheduleSuccess,
    createError: state.schedule.createScheduleError,
    professional: state.local.professional
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createSchedule: (schedule: any) => dispatch(ScheduleActions.createScheduleRequest(schedule)),
    refreshScheduleState: (schedule: any) => dispatch(ScheduleActions.refreshState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewScheduleScreen)

