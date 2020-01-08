import * as React from 'react';
import { Props, State } from '../schedule/ScheduleScreen';
import styles from './EditScheduleScreenStyles';
import {
    Text,
    View,
    TouchableOpacity,
    DatePickerAndroid,
    Platform,
    TimePickerAndroid,
    Modal,
    DatePickerIOS,
    ScrollView,
    Image,
    ImageRequireSource,
    ImageURISource
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../i18n/i18n';
import FloatingLabelInput from '../../Components/FloatingLabelInput';
import moment from 'moment';
import LoadingButton from '../../Components/LoadingButton';
import SyncScheduleActions from '../../Redux/sync/SyncScheduleRedux';
import ScheduleActions from '../../Redux/schedule/ScheduleRedux';
import Toast from '../../Utils/Toast';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { ScheduleStatus } from '../../Enums/ScheduleStatus';
import { Schedule } from '../../Models/Schedule';
import GalleryScheduleImages from '../../Components/GalleryScheduleImages/GalleryScheduleImages';
import _ from 'lodash';
import { noop } from 'redux-saga/utils';
import { Signature } from '../../Models/Signature';
import StringUtils from '../../Utils/StringUtils';
import { SignaturesType } from '../../Enums/SignaturesType';
import { debug } from '../../Utils/log';

export interface Props {
    updateSchedule: (schedule: any) => void;
    requestSync: (schedule: any) => void;
    schedule: Schedule;
}

export interface State {
    isEdited: boolean;
    showDateTimeModal: false;
    modalDateTime: any;
    modalType: string;
    initialDate: any;
    finishDate: any;
    professional: any;
    schedule: Schedule;
}

class EditScheduleScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isEdited: false,
            showDateTimeModal: false,
            modalDateTime: moment(),
            modalType: 'date',
            initialDate: moment(props.schedule.start),
            finishDate: moment(props.schedule.finish),
            professional: props.professional,
            schedule: props.schedule
        };
    }

    componentWillMount() {
        NavigationActions.editSchedule({ type: 'refresh', hideNavBar: false });
    }

    componentWillReceiveProps(newProps: any) {
        if (!newProps.loadingSync && !this.state.isEdited) {
            if (newProps.loadingSyncError) {
                const configScreen = {
                    message: I18n.t([ 'editScheduleScreen', 'syncErrorMessage' ]),
                    buttonCallback: () => {}
                };

                NavigationActions.error({ configScreen });
            } else if (newProps.loadingSyncSuccess) {
                const configScreen = {
                    title: I18n.t([ 'editScheduleScreen', 'syncSuccessTitle' ]),
                    icon: require('../../Images/ic-sync-success.png'),
                    iconStyle: styles.syncSuccessImage,
                    buttonCallback: () => {
                        setTimeout(() => {
                            NavigationActions.pop();
                        }, 100);
                    }
                };

                NavigationActions.success({ configScreen });
            }
        }

        if (!newProps.updateScheduleLoading && this.state.isEdited) {
            if (newProps.updateScheduleSuccess) {
                this.setState({ isEdited: false });
                const configScreen = {
                    title: I18n.t([ 'editScheduleScreen', 'successMessage' ]),
                    buttonCallback: noop
                };

                NavigationActions.success({ configScreen });
            } else if (newProps.updateScheduleError) {
                const configScreen = {
                    message: newProps.updateScheduleError.description,
                    buttonCallback: noop
                };

                NavigationActions.error({ configScreen });
            }
        }
    }

    async openAndroidDatePicker() {
        const { action, year, month, day }: any = await DatePickerAndroid.open({
            date: this.state.modalOption == 'initial' ? this.state.initialDate.toDate() : this.state.finishDate.toDate(),
            mode: 'calendar'
        });

        if (this.state.modalOption === 'initial') {
            if (action === 'dateSetAction') {
                const selectedDate = new Date(year, month, day);
                if (!this.checkIfInitialDateIsValid(selectedDate)) {
                    Toast.showToast(I18n.t([ 'editScheduleScreen', 'initialMustBeSmallerOrEqualEnd' ]));
                    return;
                }
                this.setState({ initialDate: moment(selectedDate) });
                this.setState({ isEdited: true });
                return;
            }
            return;
        }

        if (this.state.modalOption === 'finish') {
            if (action === 'dateSetAction') {
                const selectedDate = new Date(year, month, day);
                if (!this.checkIfFinishDateIsValid(selectedDate)) {
                    Toast.showToast(I18n.t([ 'editScheduleScreen', 'endMustBeHigherOrEqualInitial' ]));
                    return;
                }
                this.setState({ finishDate: moment(selectedDate) });
                this.setState({ isEdited: true });
                return;
            }
            return;
        }
    }

    async openAndroidTimePicker() {
        const { action, hour, minute } = await TimePickerAndroid.open({
            hour:
                this.state.modalOption === 'initial'
                    ? Number(moment(this.state.initialDate).format('HH'))
                    : Number(moment(this.state.finishDate).format('HH')),
            minute:
                this.state.modalOption === 'initial'
                    ? Number(moment(this.state.initialDate).format('mm'))
                    : Number(moment(this.state.finishDate).format('mm')),
            is24Hour: true
        });

        if (this.state.modalOption === 'initial') {
            if (action === 'timeSetAction') {
                const selectedHour = { hour, minute };
                if (!this.checkIfInitialTimeIsValid(this.state.initialDate, selectedHour)) {
                    Toast.showToast(I18n.t([ 'editScheduleScreen', 'initialTimeMustBeSmallerEnd' ]));
                    return;
                }
                const dateAndTime = moment(this.state.initialDate);
                dateAndTime.set({ hour: selectedHour.hour, minute: selectedHour.minute, second: 0 });
                this.setState({ initialDate: dateAndTime });
                this.setState({ isEdited: true });
                return;
            }
            return;
        }

        if (this.state.modalOption === 'finish') {
            if (action === 'timeSetAction') {
                const selectedHour = { hour, minute };
                if (!this.checkIfFinishTimeIsValid(this.state.finishDate, selectedHour)) {
                    Toast.showToast(I18n.t([ 'editScheduleScreen', 'endTimeMustBeHigherInitial' ]));
                    return;
                }
                const dateAndTime = moment(this.state.finishDate);
                dateAndTime.set({ hour: selectedHour.hour, minute: selectedHour.minute, second: 0 });
                this.setState({ finishDate: dateAndTime });
                this.setState({ isEdited: true });
                return;
            }
            return;
        }
    }

    private checkIfInitialTimeIsValid = (initialDate: any, initialTime: any) => {
        let isValid: boolean = true;
        if (initialDate.isSame(this.state.finishDate, 'day')) {
            const finishHour: number = Number(moment(this.state.finishDate).format('HH'));
            const finishMinute: number = Number(moment(this.state.finishDate).format('mm'));

            if ((initialTime.hour == finishHour && initialTime.minute < finishMinute) || initialTime.hour < finishHour) {
                return isValid;
            }
            isValid = false;
        }
        return isValid;
    };
    private checkIfFinishTimeIsValid = (finishDate: any, finishTime: any) => {
        let isValid: boolean = true;
        if (finishDate.isSame(this.state.initialDate, 'day')) {
            const initialHour: number = Number(moment(this.state.initialDate).format('HH'));
            const initialMinute: number = Number(moment(this.state.initialDate).format('mm'));

            if ((finishTime.hour == initialHour && finishTime.minute > initialMinute) || finishTime.hour > initialHour) {
                return isValid;
            }
            isValid = false;
        }
        return isValid;
    };

    private checkIfInitialDateIsValid = (date: any) => {
        let isValid = true;

        if (!moment(date).isSameOrBefore(moment(this.state.finishDate), 'day')) {
            isValid = false;
        }

        return isValid;
    };
    private checkIfFinishDateIsValid = (date: any) => {
        let isValid = true;

        if (!moment(date).isSameOrAfter(moment(this.state.initialDate), 'day')) {
            isValid = false;
        }

        return isValid;
    };

    private handleInitialCalendarPressed = () => {
        if (Platform.OS === 'ios') {
            this.setState({
                showDateTimeModal: true,
                modalDateTime: this.state.initialDate,
                modalOption: 'initial',
                modalType: 'date'
            });
        } else {
            this.setState({ modalOption: 'initial' });
            this.openAndroidDatePicker();
        }
    };
    private handleFinishCalendarPressed = () => {
        if (Platform.OS === 'ios') {
            this.setState({
                showDateTimeModal: true,
                modalDateTime: this.state.finishDate,
                modalOption: 'finish',
                modalType: 'date'
            });
        } else {
            this.setState({ modalOption: 'finish' });
            this.openAndroidDatePicker();
        }
    };

    private handleInitialTimePressed = () => {
        if (Platform.OS === 'ios') {
            this.setState({
                showDateTimeModal: true,
                modalDateTime: this.state.initialDate,
                modalOption: 'initial',
                modalType: 'time'
            });
        } else {
            this.setState({ modalOption: 'initial' });
            this.openAndroidTimePicker();
        }
    };
    private handleFinishTimePressed = () => {
        if (Platform.OS === 'ios') {
            this.setState({
                showDateTimeModal: true,
                modalDateTime: this.state.finishDate,
                modalOption: 'finish',
                modalType: 'time'
            });
        } else {
            this.setState({ modalOption: 'finish' });
            this.openAndroidTimePicker();
        }
    };

    private handleModalConfirmPressed = () => {
        const time: any = {
            hour: Number(moment(this.state.modalDateTime).format('HH')),
            minute: Number(moment(this.state.modalDateTime).format('mm'))
        };
        if (this.state.modalOption === 'initial') {
            if (!this.checkIfInitialDateIsValid(this.state.modalDateTime)) {
                Toast.showToast(I18n.t([ 'editScheduleScreen', 'initialMustBeSmallerOrEqualEnd' ]));
                this.setState({ showDateTimeModal: false });
                return;
            } else if (!this.checkIfInitialTimeIsValid(this.state.modalDateTime, time)) {
                Toast.showToast(I18n.t([ 'editScheduleScreen', 'initialTimeMustBeSmallerEnd' ]));
                this.setState({ showDateTimeModal: false });
                return;
            }

            this.setState({ initialDate: this.state.modalDateTime, showDateTimeModal: false });
            this.setState({ isEdited: true });
            return;
        }

        if (this.state.modalOption === 'finish') {
            if (!this.checkIfFinishDateIsValid(this.state.modalDateTime)) {
                Toast.showToast(I18n.t([ 'editScheduleScreen', 'endMustBeHigherOrEqualInitial' ]));
                this.setState({ showDateTimeModal: false });
                return;
            } else if (!this.checkIfFinishTimeIsValid(this.state.modalDateTime, time)) {
                Toast.showToast(I18n.t([ 'editScheduleScreen', 'endTimeMustBeHigherInitial' ]));
                this.setState({ showDateTimeModal: false });
                return;
            }

            this.setState({ finishDate: this.state.modalDateTime, showDateTimeModal: false });
            this.setState({ isEdited: true });
            return;
        }
    };

    private handleSyncButtonPressed = () => {
        const newSchedule = {
            id: this.state.schedule.id,
            start: this.state.initialDate,
            finish: this.state.finishDate,
            status: this.state.schedule.status,
            professional: this.state.professional,
            scheduleImages: this.state.schedule.scheduleImages,
            signatures: this.state.schedule.signatures,
            patient: { id: this.state.schedule.patient.id, name: this.state.schedule.patient.name },
            duty: { id: this.state.schedule.duty.id, name: this.state.schedule.duty.name }
        };

        this.setState({ schedule: newSchedule });

        this.props.requestSync(newSchedule);
    };

    private handleUpdateButtonPressed = () => {
        const newSchedule = {
            id: this.state.schedule.id,
            finish: this.state.finishDate,
            synchronized: this.state.schedule.synchronized,
            start: this.state.initialDate,
            status: ScheduleStatus.Pending,
            patient: this.state.schedule.patient,
            duty: this.state.schedule.duty,
            professional: this.state.professional
        };

        this.setState({ schedule: newSchedule });

        this.props.updateSchedule(newSchedule);
    };

    private renderSignature = (signature: Signature): JSX.Element => {
        let image: ImageRequireSource | ImageURISource | undefined;
        const titleText: string =
            signature.type === SignaturesType.PROFESSIONAL
                ? I18n.t([ 'editScheduleScreen', 'professionalSignature' ])
                : I18n.t([ 'editScheduleScreen', 'caregiverSignature' ]);
        if (signature.image != null && (StringUtils.isNotEmpty(signature.image.fileMobilePath) || StringUtils.isNotEmpty(signature.image.url))) {
            image = StringUtils.isNotEmpty(signature.image!.url) ? { uri: signature.image!.url! } : { uri: signature.image!.fileMobilePath! };
        }
        return (
            <View style={styles.signatureContainer}>
                <Text style={styles.signatureTitle}>{titleText}</Text>
                {image != null && (
                    <View style={styles.signatureImageContainer}>
                        <View style={styles.signatureLineContainer}>
                            <Image style={styles.signatureImage} source={image} />
                        </View>
                    </View>
                )}
            </View>
        );
    };

    public render() {
        return (
            <ScrollView>
                <View style={styles.inputTypePatientContainer}>
                    <FloatingLabelInput
                        label={I18n.t([ 'editScheduleScreen', 'patientName' ])}
                        value={this.state.schedule.patient.name}
                        viewStyle={styles.headerInputStyle}
                        inputStyle={styles.inputTextStyle}
                        isFieldEditable={false}
                    />
                </View>
                <View style={styles.inputTypeDutyTimeContainer}>
                    <FloatingLabelInput
                        label={I18n.t([ 'editScheduleScreen', 'dutyTime' ])}
                        value={this.state.schedule.duty.name}
                        viewStyle={styles.headerInputStyle}
                        inputStyle={styles.inputTextStyle}
                        isFieldEditable={false}
                    />
                </View>
                <View style={styles.cardItemContainer}>
                    <Text style={styles.cardTitle}>{I18n.t([ 'editScheduleScreen', 'dutyStart' ])}</Text>
                    <View style={styles.headerComponentCalendarContainer}>
                        <TouchableOpacity
                            disabled={this.state.schedule.synchronized}
                            onPress={() => this.handleInitialCalendarPressed()}
                            style={styles.headerComponentInitialCalendarContainer}
                        >
                            <View pointerEvents={'none'}>
                                <FloatingLabelInput
                                    label={I18n.t([ 'editScheduleScreen', 'calendarInitial' ])}
                                    icon={require('../../Images/calendar-icon.png')}
                                    value={moment(this.state.initialDate).format('DD/MM/YYYY')}
                                    iconStyle={styles.headerComponentCalendarIconStyle}
                                    labelBlurStyle={styles.headerComponentCalendarIncreaseLabelMarginLeft}
                                    labelFocusedStyle={[
                                        styles.headerComponentCalendarIncreaseLabelMarginLeft,
                                        styles.headerComponentCalendarIncreaseMarginBottomFocused
                                    ]}
                                    inputStyle={styles.headerComponentCalendarIncreaseInputPaddingLeft}
                                    viewStyle={styles.headerComponentCalendarStyle}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.schedule.synchronized}
                            onPress={() => this.handleInitialTimePressed()}
                            style={styles.headerComponentInitialCalendarContainer}
                        >
                            <View pointerEvents={'none'}>
                                <FloatingLabelInput
                                    label={I18n.t([ 'editScheduleScreen', 'startTime' ])}
                                    icon={require('../../Images/clock-icon.png')}
                                    value={moment(this.state.initialDate).format('HH:mm')}
                                    iconStyle={styles.headerComponentCalendarIconStyle}
                                    labelBlurStyle={styles.headerComponentCalendarIncreaseLabelMarginLeft}
                                    labelFocusedStyle={[
                                        styles.headerComponentCalendarIncreaseLabelMarginLeft,
                                        styles.headerComponentCalendarIncreaseMarginBottomFocused
                                    ]}
                                    inputStyle={styles.headerComponentCalendarIncreaseInputPaddingLeft}
                                    viewStyle={styles.headerComponentCalendarStyle}
                                    isFieldEditable={!this.state.schedule.synchronized}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cardItemContainer}>
                    <Text style={styles.cardTitle}>{I18n.t([ 'editScheduleScreen', 'dutyFinish' ])}</Text>
                    <View style={styles.headerComponentCalendarContainer}>
                        <TouchableOpacity
                            disabled={this.state.schedule.synchronized}
                            onPress={() => this.handleFinishCalendarPressed()}
                            style={styles.headerComponentInitialCalendarContainer}
                        >
                            <View pointerEvents='none'>
                                <FloatingLabelInput
                                    label={I18n.t([ 'editScheduleScreen', 'calendarFinish' ])}
                                    icon={require('../../Images/calendar-icon.png')}
                                    value={moment(this.state.finishDate).format('DD/MM/YYYY')}
                                    iconStyle={styles.headerComponentCalendarIconStyle}
                                    labelBlurStyle={styles.headerComponentCalendarIncreaseLabelMarginLeft}
                                    labelFocusedStyle={[
                                        styles.headerComponentCalendarIncreaseLabelMarginLeft,
                                        styles.headerComponentCalendarIncreaseMarginBottomFocused
                                    ]}
                                    inputStyle={styles.headerComponentCalendarIncreaseInputPaddingLeft}
                                    viewStyle={styles.headerComponentCalendarStyle}
                                    isFieldEditable={!this.state.schedule.synchronized}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.schedule.synchronized}
                            onPress={() => this.handleFinishTimePressed()}
                            style={styles.headerComponentInitialCalendarContainer}
                        >
                            <View pointerEvents='none'>
                                <FloatingLabelInput
                                    label={I18n.t([ 'editScheduleScreen', 'finishTime' ])}
                                    icon={require('../../Images/clock-icon.png')}
                                    value={moment(this.state.finishDate).format('HH:mm')}
                                    iconStyle={styles.headerComponentCalendarIconStyle}
                                    labelBlurStyle={styles.headerComponentCalendarIncreaseLabelMarginLeft}
                                    labelFocusedStyle={[
                                        styles.headerComponentCalendarIncreaseLabelMarginLeft,
                                        styles.headerComponentCalendarIncreaseMarginBottomFocused
                                    ]}
                                    inputStyle={styles.headerComponentCalendarIncreaseInputPaddingLeft}
                                    viewStyle={styles.headerComponentCalendarStyle}
                                    isFieldEditable={!this.state.schedule.synchronized}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {this.props.schedule != null &&
                _.values(this.props.schedule.scheduleImages).length > 0 && (
                    <View style={styles.scheduleImagesContainer}>
                        <Text style={styles.imagesTitle}>{I18n.t([ 'editScheduleScreen', 'scheduleImages' ])}</Text>
                        <GalleryScheduleImages scheduleImages={_.values(this.props.schedule.scheduleImages)} />
                    </View>
                )}

                {this.props.schedule != null && _.values(this.props.schedule.scheduleImages).length > 0 && <View style={styles.separatorLine} />}

                {this.props.schedule != null &&
                    _.values(this.props.schedule.signatures).length > 0 &&
                    _.values(this.props.schedule.signatures).map(it => this.renderSignature(it))}

                <View style={styles.buttonContainer}>
                    {this.state.schedule.synchronized ? (
                        <LoadingButton
                            textStyle={styles.syncButtonTextStyle}
                            buttonStyle={styles.syncButtonStyle}
                            isLoading={false}
                            loadingImage={require('../../Images/loading-sync-icon.png')}
                            icon={require('../../Images/ic-sync-button.png')}
                            title={I18n.t([ 'editScheduleScreen', 'syncDuty' ])}
                            onButtonPressed={() => this.handleSyncButtonPressed()}
                            viewStyle={styles.syncButton}
                        />
                    ) : !this.state.schedule.synchronized && this.state.isEdited ? (
                        <View style={styles.syncButton}>
                            <LoadingButton
                                title={I18n.t([ 'editScheduleScreen', 'saveChanges' ])}
                                isLoading={this.props.updateScheduleLoading}
                                onButtonPressed={() => this.handleUpdateButtonPressed()}
                                buttonStyle={styles.buttonStyle}
                                viewStyle={styles.viewButtonStyle}
                            />
                        </View>
                    ) : (
                        <View style={styles.syncButtonContainer}>
                            <LoadingButton
                                textStyle={styles.notSyncButtonTextStyle}
                                buttonStyle={styles.notSyncButtonStyle}
                                isLoading={this.props.loadingSync}
                                loadingImage={require('../../Images/loading-sync-icon.png')}
                                icon={require('../../Images/ic-unsync.png')}
                                title={I18n.t([ 'editScheduleScreen', 'syncDuty' ])}
                                onButtonPressed={() => this.handleSyncButtonPressed()}
                                viewStyle={styles.notSyncButton}
                            />
                            <Text style={styles.labelDutyNotSyncStyle}>{I18n.t([ 'editScheduleScreen', 'notSyncThisDuty' ])}</Text>
                        </View>
                    )}
                </View>

                <Modal transparent={true} onRequestClose={() => null} visible={this.state.showDateTimeModal}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalDatePickerContainer}>
                            <DatePickerIOS
                                date={this.state.modalDateTime.toDate()}
                                mode={this.state.modalType}
                                onDateChange={(date: any) => {
                                    this.setState({ modalDateTime: moment(date) });
                                }}
                            />
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ showDateTimeModal: false });
                                    }}
                                >
                                    <Text style={styles.modalCancelButton}>{I18n.t([ 'scheduleScreen', 'modalCancel' ])}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleModalConfirmPressed()}>
                                    <Text style={styles.modalConfirmButton}>{I18n.t([ 'scheduleScreen', 'modalConfirm' ])}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        loadingSync: state.syncSchedule.loading,
        loadingSyncSuccess: state.syncSchedule.success,
        loadingSyncError: state.syncSchedule.error,
        updateScheduleLoading: state.schedule.updateScheduleLoading,
        updateScheduleError: state.schedule.updateScheduleError,
        updateScheduleSuccess: state.schedule.updateScheduleSuccess,
        professional: state.local.professional
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateSchedule: (schedule: any) => dispatch(ScheduleActions.updateScheduleRequest(schedule)),
        requestSync: (schedule: any) => dispatch(SyncScheduleActions.syncScheduleRequest(schedule))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditScheduleScreen);
