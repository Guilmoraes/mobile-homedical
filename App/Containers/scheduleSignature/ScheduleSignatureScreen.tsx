import * as React from 'react';
import { Image, ImageRequireSource, ImageStyle, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './ScheduleSignatureScreenStyles';
import I18n from '../../i18n/i18n';
import { Actions as NavigationActions } from 'react-native-router-flux';
import moment from 'moment';
import { ScheduleStatus } from '../../Enums/ScheduleStatus';
import ScheduleActions from '../../Redux/schedule/ScheduleRedux';
import { Schedule } from '../../Models/Schedule';
import { debug } from '../../Utils/log';
import { Signature } from '../../Models/Signature';
import { SignaturesType } from '../../Enums/SignaturesType';
import { Images } from '../../Themes';
import StringUtils from '../../Utils/StringUtils';

export interface Props {
    professional?: any;
    schedule: Schedule;
    createSchedule: (schedule: any) => void;
    refreshScheduleState: () => void;
}

export interface State {
    schedule: Schedule;
    patientName?: string;
    professionalSignature?: Signature;
    caregiverSignature?: Signature;
}

class ScheduleSignatureScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            schedule: props.schedule,
            patientName: props.schedule.patient != null && StringUtils.isNotEmpty(props.schedule.patient.name) ? props.schedule.patient.name : ''
        };
    }

    private validateDuty = (): boolean => {
        const actualDate: any = moment.utc();

        const overTime: any = {
            hour: Number(moment(this.state.schedule.duty.overtime).format('HH')),
            minute: Number(moment(this.state.schedule.duty.overtime).format('mm'))
        };

        const dutyFinishDate: any = {
            min: moment(this.state.schedule.duty.finish, 'HH:mm:ss').subtract(overTime.hour, 'hours').subtract(overTime.minute, 'minutes').toDate(),
            max: moment(this.state.schedule.duty.finish, 'HH:mm:ss').add(overTime.hour, 'hours').add(overTime.minute, 'minutes').toDate()
        };

        if (moment(actualDate).isBefore(dutyFinishDate.min) || moment(actualDate).isAfter(dutyFinishDate.max)) {
            return false;
        }

        return true;
    };

    private handleFinish = () => {
        const configScreen = {
            title: I18n.t([ 'finishScheduleScreen', 'finishDuty' ]),
            patientName: this.state.patientName,
            message: I18n.t([ 'finishScheduleScreen', 'confirmScreenMessage' ]),
            hour: moment().format('HH:mm'),
            negativeCallback: () => {
                NavigationActions.pop();
            },
            positiveCallback: () => {
                const newSchedule = Object.assign({}, this.props.schedule);
                newSchedule.finish = moment();
                newSchedule.status = this.validateDuty() ? ScheduleStatus.Approved.toString() : ScheduleStatus.Pending.toString();
                newSchedule.signatures = [];
                if (this.state.professionalSignature != null) {
                    newSchedule.signatures.push(this.state.professionalSignature);
                }
                if (this.state.caregiverSignature != null) {
                    newSchedule.signatures.push(this.state.caregiverSignature);
                }
                this.props.createSchedule(newSchedule);
            }
        };

        NavigationActions.confirmSchedule({ configScreen });
    };

    private handleOnChangeSignature = (signaturesType: SignaturesType) => {
        const fileName: string | undefined =
            this.state.caregiverSignature != null
                ? this.state.caregiverSignature.image!.fileName
                : this.state.professionalSignature != null ? this.state.professionalSignature.image!.fileName : undefined;
        NavigationActions.signatureScreen({
            fileName,
            signaturesType,
            handleFinishSignature: this.handleFinishSignature
        });
    };

    private handleFinishSignature = (fileName: string, signaturesType: SignaturesType, path: string) => {
        const signature: Signature = {
            image: {
                fileMobilePath: path,
                fileName,
                fileContentType: 'image/png'
            },
            type: signaturesType
        };
        if (signaturesType === SignaturesType.PROFESSIONAL) {
            this.setState(
                {
                    professionalSignature: signature
                },
                () => NavigationActions.pop()
            );
        } else {
            this.setState(
                {
                    caregiverSignature: signature
                },
                () => NavigationActions.pop()
            );
        }
    };

    private renderSignatureContainer = (type: SignaturesType): JSX.Element => {
        const signature: Signature | undefined =
            type === SignaturesType.PROFESSIONAL ? this.state.professionalSignature : this.state.caregiverSignature;
        const hasSignature: boolean = signature != null && signature.image != null && signature.image.fileMobilePath != null;
        const signatureImage: ImageRequireSource = hasSignature ? { uri: signature!.image!.fileMobilePath } : Images.signatureIcon;
        const signatureStyle: ImageStyle = hasSignature ? styles.signatureImage : styles.signatureIcon;
        return (
            <TouchableOpacity style={styles.signatureContainer} onPress={() => this.handleOnChangeSignature(type)}>
                <Image style={signatureStyle} source={signatureImage} />
                {!hasSignature && <Text style={styles.touchText}>{I18n.t([ 'scheduleSignatureScreen', 'touchText' ])}</Text>}
            </TouchableOpacity>
        );
    };

    public render() {
        const showFinishButton: boolean = this.state.professionalSignature != null;
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => NavigationActions.pop()}>
                        <Image style={styles.headerImageStyle} source={Images.backBlueArrow} />
                    </TouchableOpacity>

                    {showFinishButton && (
                        <TouchableOpacity onPress={() => this.handleFinish()}>
                            <Text style={styles.headerTextStyle}>{I18n.t([ 'scheduleSignatureScreen', 'finishText' ])}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView style={styles.container}>
                    <Text style={styles.firstTextStyle}>{I18n.t([ 'scheduleSignatureScreen', 'professionalSignature' ])}</Text>

                    {this.renderSignatureContainer(SignaturesType.PROFESSIONAL)}

                    <Text style={styles.firstTextStyle}>{I18n.t([ 'scheduleSignatureScreen', 'caregiverSignature' ])}</Text>

                    {this.renderSignatureContainer(SignaturesType.CAREGIVER)}
                </ScrollView>
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
        refreshScheduleState: () => dispatch(ScheduleActions.refreshState())
    };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSignatureScreen);
