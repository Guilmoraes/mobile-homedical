import * as React from 'react';
import { Props, State } from '../schedule/ScheduleScreen';
import styles from './FinishScheduleScreenStyles';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../i18n/i18n';
import FloatingLabelInput from '../../Components/FloatingLabelInput';
import moment from 'moment';
import LoadingButton from '../../Components/LoadingButton';
import { Actions as NavigationActions } from 'react-native-router-flux';
import ScheduleActions from '../../Redux/schedule/ScheduleRedux';
import { Navigation } from '../../Enums/Navigation';
import { Schedule } from '../../Models/Schedule';
import { ScheduleStatus } from '../../Enums/ScheduleStatus';
import _ from 'lodash';
import GalleryScheduleImages from '../../Components/GalleryScheduleImages/GalleryScheduleImages';

export interface Props {
    schedule: Schedule;
    createSchedule: (schedule: any) => void;
    refreshScheduleState: () => void;
}

export interface State {
    schedule: Schedule;
    patientName: string;
    dutyTime: string;
    initialDate: any;
    startTime: any;
}

class FinishScheduleScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            schedule: props.schedule,
            dutyTime: props.schedule.duty.name,
            patientName: props.schedule.patient.name,
            initialDate: moment(props.schedule.start),
            buttonPressed: false
        };
    }

    componentWillMount() {
        NavigationActions.finishSchedule({ type: 'refresh', hideNavBar: false });
    }

    componentWillReceiveProps(newProps: any) {
        if (!newProps.createLoading) {
            if (newProps.createError) {
                this.showRequestErroScreen();
            } else if (newProps.createSuccess) {
                this.showRequestSuccessScreen();
            }
        }
    }

    showImageRequestScreen = () => {
        const configScreen = {
            title: I18n.t([ 'finishScheduleScreen', 'imageRequest' ]),
            negativeCallback: () => NavigationActions.scheduleSignature({ schedule: this.state.schedule }),
            positiveCallback: () => {
                NavigationActions.uploadScheduleImage({ schedule: this.state.schedule });
            }
        };

        NavigationActions.confirmImageRequest({ configScreen });
    };

    showRequestErroScreen = () => {
        const configScreen = {
            message: I18n.t([ 'finishScheduleScreen', 'dutyFinishError' ]),
            buttonCallback: () => {
                this.props.refreshScheduleState();
            }
        };
        NavigationActions.error({ configScreen });
    };

    showRequestSuccessScreen = () => {
        const configScreen = {
            title: I18n.t([ 'finishScheduleScreen', 'dutyFinished' ]),
            message: I18n.t([ 'finishScheduleScreen', 'rememberToSynchronized' ]),
            icon: require('../../Images/ic-new-schedule-success.png'),
            buttonCallback: () => {
                this.props.refreshScheduleState();

                NavigationActions.popTo(Navigation.ScheduleScreen);
            }
        };

        NavigationActions.success({ configScreen });
    };

    private handleButtonPressed = () => {
        this.showImageRequestScreen();
    };

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputTypePatientContainer}>
                    <FloatingLabelInput
                        label={I18n.t([ 'finishScheduleScreen', 'patientName' ])}
                        value={this.state.patientName}
                        viewStyle={styles.headerInputStyle}
                        inputStyle={styles.inputTextStyle}
                        isFieldEditable={false}
                        isFieldCorrect={this.state.patientName}
                    />
                </View>
                <View style={styles.inputTypeDutyTimeContainer}>
                    <FloatingLabelInput
                        label={I18n.t([ 'finishScheduleScreen', 'dutyTime' ])}
                        value={this.state.dutyTime}
                        viewStyle={styles.headerInputStyle}
                        inputStyle={styles.inputTextStyle}
                        isFieldEditable={false}
                        isFieldCorrect={this.state.dutyTime}
                    />
                </View>
                <View style={styles.cardItemContainer}>
                    <Text style={styles.cardTitle}>{I18n.t([ 'finishScheduleScreen', 'dutyStart' ])}</Text>
                    <View style={styles.headerComponentCalendarContainer}>
                        <TouchableOpacity style={styles.headerComponentInitialCalendarContainer}>
                            <View pointerEvents='none'>
                                <FloatingLabelInput
                                    label={I18n.t([ 'finishScheduleScreen', 'calendarInitial' ])}
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
                                    isFieldEditable={false}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.headerComponentInitialCalendarContainer}>
                            <View pointerEvents='none'>
                                <FloatingLabelInput
                                    label={I18n.t([ 'finishScheduleScreen', 'startTime' ])}
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
                                    isFieldEditable={false}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.clockContainer}>
                    <Image style={styles.finishScheduleImage} source={require('../../Images/ic-schedule-card-bigger.png')} />
                    <Text style={styles.inDutyText}>{I18n.t([ 'finishScheduleScreen', 'inDuty' ])}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <LoadingButton
                        title={I18n.t([ 'finishScheduleScreen', 'finishDuty' ])}
                        isLoading={this.props.createLoading}
                        onButtonPressed={() => this.handleButtonPressed()}
                        buttonStyle={styles.buttonStyle}
                        viewStyle={styles.viewButtonStyle}
                    />
                </View>
                <GalleryScheduleImages scheduleImages={this.props.schedule != null ? _.values(this.props.schedule.scheduleImages) : []} />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        createLoading: state.schedule.createScheduleLoading,
        createSuccess: state.schedule.createScheduleSuccess,
        createError: state.schedule.createScheduleError
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        createSchedule: (schedule: any) => dispatch(ScheduleActions.createScheduleRequest(schedule)),
        refreshScheduleState: () => dispatch(ScheduleActions.refreshState())
    };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(FinishScheduleScreen);
