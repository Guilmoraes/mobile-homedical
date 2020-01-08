import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './UploadScheduleImageScreenStyles';
import I18n from '../../i18n/i18n';
import ImagePicker from 'react-native-image-picker';
import { File } from '../../Models/File';
import { Actions as NavigationActions } from 'react-native-router-flux';
import _ from 'lodash';
import ImageUtils from '../../Utils/ImageUtils';
import { Images } from '../../Themes';
import { Schedule } from '../../Models/Schedule';
import GalleryScheduleImages from '../../Components/GalleryScheduleImages/GalleryScheduleImages';
import { debug } from '../../Utils/log';

export interface Props {
    schedule: Schedule;
}

export interface State {
    schedule: Schedule;
    patientName?: string;
    scheduleImages: File[];
}

class UploadScheduleImageScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            schedule: props.schedule,
            scheduleImages:
                props.schedule.scheduleImages != null && props.schedule.scheduleImages.length > 0
                    ? props.schedule.scheduleImages
                    : [ { fileName: undefined } ]
        };
    }

    private handlePhotoIcPressed = () => {
        const options = {
            takePhotoButtonTitle: I18n.t([ 'uploadScheduleImageScreen', 'takePhotoButtonTitle' ]),
            chooseFromLibraryButtonTitle: I18n.t([ 'uploadScheduleImageScreen', 'chooseFromLibraryButtonTitle' ]),
            quality: 0.5,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, response => {
            if (!response.didCancel && response.data) {
                const scheduleImage: File = {
                    fileContentType: !_.isEmpty(response.type) ? response.type : ImageUtils.mapImageType(response.fileName),
                    fileName: response.fileName,
                    fileMobilePath: response.uri
                };
                debug('oloco', scheduleImage);
                this.setState({
                    scheduleImages: [ ...this.state.scheduleImages.filter(it => it.fileName != null), scheduleImage ]
                });
            }
        });
    };

    private handleNext = () => {
        const newSchedule = Object.assign({}, this.props.schedule);
        newSchedule.scheduleImages = this.state.scheduleImages.filter(it => it.fileName != null);
        NavigationActions.scheduleSignature({ schedule: newSchedule });
    };

    private handleDeletePressed = (scheduleImage: File) => {
        if (this.state.scheduleImages != null && this.state.scheduleImages.length === 1) {
            this.setState({
                scheduleImages: [ { fileName: undefined } ]
            });
            return;
        }

        const indexRemoved = this.state.scheduleImages.indexOf(scheduleImage);
        this.setState({
            scheduleImages: this.state.scheduleImages.filter((value: File, index: number) => index !== indexRemoved)
        });
    };

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => NavigationActions.pop()}>
                        <Image style={styles.headerImageStyle} source={Images.backBlueArrow} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.handleNext()}>
                        <Text style={styles.headerTextStyle}>{I18n.t([ 'uploadScheduleImageScreen', 'nextText' ])}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.firstTextStyle}>{I18n.t([ 'uploadScheduleImageScreen', 'requestImageMessage' ])}</Text>

                <GalleryScheduleImages scheduleImages={this.state.scheduleImages} deleteIsEnabled={true} deleteAction={this.handleDeletePressed} />

                <TouchableOpacity onPress={() => this.handlePhotoIcPressed()} style={styles.roundedIconContainer}>
                    <View style={styles.roundedBackground}>
                        <Image style={styles.iconStyle} source={require('../../Images/camera-ic.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(UploadScheduleImageScreen);
