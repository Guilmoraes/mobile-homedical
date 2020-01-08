import * as React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  DatePickerIOS,
  Modal,
  Platform,
  DatePickerAndroid
} from "react-native";
import { connect } from "react-redux";
import styles from "./ScheduleScreenStyles";
import I18n from '../../i18n/i18n'
import FloatingLabelInput from "../../Components/FloatingLabelInput";
import { Actions as NavigationActions } from 'react-native-router-flux'
import ScheduleActions from '../../Redux/schedule/ScheduleRedux'
import { ProgressDialog } from 'react-native-simple-dialogs';
import moment from 'moment'
import Toast from "../../Utils/Toast";
import { Navigation } from "../../Enums/Navigation";

export interface Props {
  getProfessionalSchedules: (initalDate: any, finishDate: any) => void
}

export interface State {
  initialDate: any,
  endDate: any,
  schedules: any,
  showLoadingDialog: boolean,
  showDateModal: boolean,
  modalDate: any,
  modalOption?: string
}

class ScheduleScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      initialDate: moment(),
      showLoadingDialog: false,
      endDate: moment(),
      schedules: [],
      showDateModal: false,
      modalDate: moment()
    };
  };


  componentDidMount() {
  }

  componentWillMount() {
    NavigationActions.schedule({ type: 'refresh', hideNavBar: false, renderRightButton: this._renderNavbarRightButton });
    this.props.getProfessionalSchedules(this.state.initialDate, this.state.endDate);

  }

  componentWillReceiveProps(newProps: any) {

    if (newProps.refreshSchedules) {
      this.props.getProfessionalSchedules(this.state.initialDate, this.state.endDate);
      return;
    }
    

    if (newProps.getProfessionalSchedulesLoading) {
      this.setState({ showLoadingDialog: true });
      return;
    }

    this.setState({ showLoadingDialog: false });

    if (newProps.getProfessionalSchedulesSuccess) {
      this.setState({ schedules: newProps.getProfessionalSchedulesSuccess });
      return;
    }
  }

  handleOnNavbarRightButtonPressed = () => {
    NavigationActions.newSchedule()
  };

  handleCardPressed = (schedule: any) => {
    if (schedule.finish != null) {
      NavigationActions.editSchedule({ schedule: schedule });
    } else {
      NavigationActions.finishSchedule({ schedule: schedule });
    }
  };

  handleInitialCalendarPressed = () => {

    if (Platform.OS === "ios") {
      this.setState({ showDateModal: true, modalDate: this.state.initialDate, modalOption: "initial" });
      return;
    }

    this.setState({ modalOption: "initial" });

    this.openAndroidDatePicker();

  };

  handleEndCalendarPressed = () => {

    if (Platform.OS === "ios") {
      this.setState({ showDateModal: true, modalDate: this.state.endDate, modalOption: "end" });
      return;
    }

    this.setState({ modalOption: "end" });

    this.openAndroidDatePicker();

  };

  handleModalConfirmPressed = () => {

    if (this.state.modalOption === "initial") {

      if (!this.checkIfInitialDateIsValid(this.state.modalDate)) {
        Toast.showToast(I18n.t(['scheduleScreen', 'initialMustBeSmallerOrEqualEnd']));
        this.setState({ showDateModal: false });
        return;
      }

      this.setState({ initialDate: this.state.modalDate, showDateModal: false });
      this.props.getProfessionalSchedules(this.state.modalDate, this.state.endDate);
      return;
    }

    if (this.state.modalOption === "end") {

      if (!this.checkIfEndDateIsValid(this.state.modalDate)) {
        Toast.showToast(I18n.t(['scheduleScreen', 'endMustBeHigherOrEqualInitial']));
        this.setState({ showDateModal: false });
        return;
      }

      this.setState({ endDate: this.state.modalDate, showDateModal: false });
      this.props.getProfessionalSchedules(this.state.initialDate, this.state.modalDate);
      return;
    }

  };

  async openAndroidDatePicker() {

    const { action, year, month, day }: any = await DatePickerAndroid.open({
      date: this.state.initialDate.toDate(),
      mode: "calendar"
    });

    if (this.state.modalOption === "initial") {
      if (action === "dateSetAction") {
        let selectedDate = new Date(year, month, day);
        if (!this.checkIfInitialDateIsValid(selectedDate)) {
          Toast.showToast(I18n.t(['scheduleScreen', 'initialMustBeSmallerOrEqualEnd']));
          return;
        }
        this.setState({ initialDate: moment(selectedDate) });
        this.props.getProfessionalSchedules(moment(selectedDate), this.state.endDate);
        return;
      }
      return;
    }


    if (this.state.modalOption === "end") {
      if (action === "dateSetAction") {
        let selectedDate = new Date(year, month, day);
        if (!this.checkIfEndDateIsValid(selectedDate)) {
          Toast.showToast(I18n.t(['scheduleScreen', 'endMustBeHigherOrEqualInitial']));
          return;
        }
        this.setState({ endDate: moment(selectedDate) });
        this.props.getProfessionalSchedules(this.state.initialDate, moment(selectedDate));
        return;
      }
      return;
    }

  }

  checkIfInitialDateIsValid = (date: any) => {
    let isValid = true;

    if (!moment(date).isSameOrBefore(moment(this.state.endDate), 'day')) {
      isValid = false;
    }

    return isValid;
  };

  checkIfEndDateIsValid = (date: any) => {
    let isValid = true;

    if (!moment(date).isSameOrAfter(moment(this.state.initialDate), 'day')) {
      isValid = false;
    }

    return isValid;
  };

  keyExtractor = (item: any, index: any) => index.toString();

  _renderNavbarRightButton = () => {
    return (
      <TouchableOpacity style={styles.navbarAddButtonRounded} onPress={() => this.handleOnNavbarRightButtonPressed()}>
        <Image style={styles.navbarAddButtonImage} source={require('../../Images/ic-navbar-plus.png')} />
      </TouchableOpacity>
    )
  };

  _renderHeaderComponent = () => {
    return (
      <View style={styles.headerComponentContainer}>

        <View style={styles.headerComponentCalendarContainer}>

          <TouchableOpacity onPress={() => this.handleInitialCalendarPressed()}
            style={styles.headerComponentInitialCalendarContainer}>
            <View pointerEvents='none'>
              <FloatingLabelInput
                label={I18n.t(['scheduleScreen', 'calendarInitial'])}
                icon={require('../../Images/calendar-icon.png')}
                value={moment(this.state.initialDate).format("DD/MM/YYYY")}
                iconStyle={styles.headerComponentCalendarIconStyle}
                labelBlurStyle={styles.headerComponentCalendarIncreaseLabelMarginLeft}
                labelFocusedStyle={[styles.headerComponentCalendarIncreaseLabelMarginLeft, styles.headerComponentCalendarIncreaseMarginBottomFocused]}
                inputStyle={styles.headerComponentCalendarIncreaseInputPaddingLeft}
                viewStyle={styles.headerComponentCalendarStyle}
                isFieldEditable={false}
                onChangeText={() => null} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => this.handleEndCalendarPressed()}
            style={styles.headerComponentInitialCalendarContainer}>
            <View pointerEvents='none'>
              <FloatingLabelInput
                label={I18n.t(['scheduleScreen', 'calendarEnd'])}
                icon={require('../../Images/calendar-icon.png')}
                value={moment(this.state.endDate).format("DD/MM/YYYY")}
                iconStyle={styles.headerComponentCalendarIconStyle}
                labelBlurStyle={styles.headerComponentCalendarIncreaseLabelMarginLeft}
                labelFocusedStyle={[styles.headerComponentCalendarIncreaseLabelMarginLeft, styles.headerComponentCalendarIncreaseMarginBottomFocused]}
                inputStyle={styles.headerComponentCalendarIncreaseInputPaddingLeft}
                viewStyle={styles.headerComponentCalendarStyle}
                isFieldEditable={false}
                onChangeText={() => null} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.dutyOnThisPeriodContainer}>
          <Text>
            <Text style={styles.headerComponentSchedulesLength}>{this.state.schedules.length}</Text>
            <Text
              style={styles.headerComponentSchedulesText}>{(this.state.schedules.length > 1) ? I18n.t(['scheduleScreen', 'dutyOnThisPeriod']) : I18n.t(['scheduleScreen', 'dutyOnThisPeriodOne'])}</Text>
          </Text>
        </View>
      </View>
    )
  };

  _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>

        <Image
          style={styles.emptyComponentImage}
          source={require('../../Images/empty-schedule-icon.png')}
        />

        <Text style={styles.emptyComponentText}>{I18n.t(['scheduleScreen', 'emptyComponentText'])}</Text>

      </View>
    )

  };

  _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => this.handleCardPressed(item)}>
        <View
          style={item.finish ? styles.cardItemContainer : [styles.cardItemContainer, styles.cardItemContainerWithBlueBorder]}>

          <View style={styles.cardItemDateContainer}>
            <Text
              style={item.synchronized ? [styles.cardItemContainerMonth, styles.cardItemSyncPurpleGrey] : styles.cardItemContainerMonth}>{moment(item.start).format("MMM").toUpperCase()}</Text>
            <Text
              style={item.synchronized ? [styles.cardItemContainerDay, styles.cardItemSyncPurpleGrey] : styles.cardItemContainerDay}>{moment(item.start).format("DD").toUpperCase()}</Text>
            {
              (item.finish) ?
                <Image style={styles.cardItemSyncImage}
                  source={item.synchronized ? require('../../Images/ic-already-sync.png') : require('../../Images/ic-unsync.png')} />
                :
                <View />
            }
          </View>

          <View style={styles.cardItemHorizontalDivisor} />

          <View style={styles.cardItemPatientContainer}>

            <Text style={styles.cardItemPatientLabel}>{I18n.t(['scheduleScreen', 'patientLabel'])}</Text>
            <Text
              style={item.synchronized ? [styles.cardItemPatient, styles.cardItemSyncPurpleGrey] : styles.cardItemPatient}>{item.patient ? item.patient.name : ""}</Text>

            <View style={styles.cardItemVerticalDivisor} />

            {
              item.finish ?
                <View style={{ flexDirection: 'row' }}>

                  <View>
                    <Text style={styles.cardItemInitialDateLabel}>Início:</Text>
                    <Text
                      style={item.synchronized ? [styles.cardItemInitialDate, styles.cardItemSyncPurpleGrey] : styles.cardItemInitialDate}>{moment(item.start).format("HH:mm")}</Text>
                  </View>

                  <View style={{ marginLeft: "15%" }}>
                    <Text style={styles.cardItemInitialDateLabel}>Fim:</Text>
                    <Text
                      style={item.synchronized ? [styles.cardItemInitialDate, styles.cardItemSyncPurpleGrey] : styles.cardItemInitialDate}>{moment(item.finish).format("HH:mm")}</Text>
                  </View>
                </View>
                :

                <View style={{ flexDirection: 'row' }}>
                  <Image style={styles.cardItemScheduleImage}
                    source={require('../../Images/ic-schedule-card.png')} />

                  <Text style={styles.cardItemOnDuty}>{I18n.t(['scheduleScreen', 'onDuty'])}</Text>
                </View>


            }
          </View>

          <View style={{ flex: 1, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.cardItemArrowImage}
              source={item.synchronized ? require('../../Images/ic-go-next-screen-grey.png') : require('../../Images/ic-go-next-screen.png')} />
          </View>

        </View>
      </TouchableOpacity>
    )
  };

  public render() {
    return (
      <View style={styles.container}>

        <ProgressDialog
          visible={this.state.showLoadingDialog}
          title={I18n.t(['scheduleScreen', 'titleLoading'])}
          message={I18n.t(['scheduleScreen', 'messageLoading'])}
        />

        {
          this._renderHeaderComponent()
        }

        <Modal
          // animationType="fade"
          transparent={true}
          onRequestClose={() => null}
          visible={this.state.showDateModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalDatePickerContainer}>
              <DatePickerIOS
                date={this.state.modalDate.toDate()}
                mode={"date"}
                onDateChange={(date: any) => {
                  this.setState({ modalDate: moment(date) })
                }} />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={() => {
                  this.setState({ showDateModal: false })
                }}>
                  <Text
                    style={styles.modalCancelButton}>{I18n.t(['scheduleScreen', 'modalCancel'])}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleModalConfirmPressed()}>
                  <Text
                    style={styles.modalConfirmButton}>{I18n.t(['scheduleScreen', 'modalConfirm'])}</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {
          this.state.schedules.length > 0 ?

            <FlatList
              style={styles.flatList}
              data={this.state.schedules}
              keyExtractor={this.keyExtractor}
              renderItem={this._renderItem} /> :

            this._renderEmptyComponent()
        }


      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    getProfessionalSchedulesLoading: state.schedule.getProfessionalSchedulesLoading,
    getProfessionalSchedulesError: state.schedule.getProfessionalSchedulesError,
    getProfessionalSchedulesSuccess: state.schedule.getProfessionalSchedulesSuccess,
    refreshSchedules: state.schedule.refreshSchedules
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProfessionalSchedules: (initialDate: any, finishDate: any) => dispatch(ScheduleActions.getProfessionalSchedulesRequest(initialDate, finishDate))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen)

