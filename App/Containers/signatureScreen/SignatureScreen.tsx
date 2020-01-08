import * as React from 'react';
import { Image, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './SignatureScreenStyles';
import { Actions as NavigationActions } from 'react-native-router-flux';
import SignaturePad from 'react-native-signature-pad';
import Orientation from 'react-native-orientation-locker';
import I18n from '../../i18n/i18n';
import { Images } from '../../Themes';
import RNFetchBlob from 'react-native-fetch-blob';
import { SignaturesType } from '../../Enums/SignaturesType';
import { debug } from '../../Utils/log';
import Toast from '../../Utils/Toast';
const uuid = require('react-native-uuid');

export interface Props {
    signaturesType: SignaturesType;
    handleFinishSignature: (fileName: string, type: SignaturesType, path: string) => void;
}

export interface State {
    signaturesType: SignaturesType;
    signatureBase64?: any;
    signatureKey: string;
    showSignature: boolean;
    fileName: string;
}

class SignatureScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            signatureKey: uuid.v1(),
            showSignature: false,
            signaturesType: props.signaturesType != null ? props.signaturesType : SignaturesType.PROFESSIONAL,
            fileName: uuid.v1()
        };
    }

    componentDidMount(): void {
        Orientation.lockToLandscape();
        setTimeout(() => {
            this.setState({
                showSignature: true
            });
        }, 500);
    }

    componentWillUnmount(): void {
        Orientation.lockToPortrait();
    }

    private handleOnClosePressed = (): void => {
        NavigationActions.pop();
    };

    private async createSignature() {
        const hasPermission = await this.requestWritePermission();
        if (!hasPermission) {
            Toast.showToast(I18n.t([ 'scheduleSignatureScreen', 'noHasPermission' ]));
        }
        let path: string = `${Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.PictureDir}/${this.state.fileName}.png`;
        await RNFetchBlob.fs
            .createFile(path, String(this.state.signatureBase64.base64DataUrl).replace('data:image/png;base64,', ''), 'base64')
            .catch(it => debug('teste', it.message));

        if (Platform.OS === 'android') {
            path = `file://${path}`;
        }

        this.props.handleFinishSignature(this.state.fileName, this.state.signaturesType, path);
    }

    private handleSignatureChange = ({ ...base64DataUrl }): void => {
        this.setState({
            signatureBase64: base64DataUrl
        });
    };

    async requestWritePermission() {
        try {
            if (Platform.OS === 'ios') {
                return true;
            }

            if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)) {
                return true;
            }

            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

    private handleCleanSignature = (): void => {
        this.setState({
            signatureBase64: undefined,
            signatureKey: uuid.v1()
        });
    };

    _signaturePadError = error => {
        debug('teste', error.message);
    };

    public render() {
        const hasSignature: boolean = this.state.signatureBase64 != null;
        const title: string =
            this.state.signaturesType === SignaturesType.PROFESSIONAL
                ? I18n.t([ 'scheduleSignatureScreen', 'professionalSignatureTitle' ])
                : I18n.t([ 'scheduleSignatureScreen', 'caregiverSignatureTitle' ]);
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => this.handleOnClosePressed()}>
                        <Image style={styles.headerImageStyle} source={Images.backBlueArrow} />
                    </TouchableOpacity>

                    <Text style={styles.title}>{title}</Text>

                    {hasSignature ? (
                        <TouchableOpacity onPress={() => this.createSignature()}>
                            <Text style={styles.nextText}>{I18n.t([ 'scheduleSignatureScreen', 'next' ])}</Text>
                        </TouchableOpacity>
                    ) : (
                        <View />
                    )}
                </View>
                <View style={styles.signatureContainer}>
                    {this.state.showSignature ? (
                        <SignaturePad
                            key={this.state.signatureKey}
                            onError={this._signaturePadError}
                            onChange={this.handleSignatureChange}
                            style={{ flex: 1, backgroundColor: 'transparent' }}
                        />
                    ) : (
                        <View />
                    )}
                </View>

                <View style={styles.footerContainer}>
                    <View />
                    <Text style={styles.infoText}>{I18n.t([ 'scheduleSignatureScreen', 'signatureInfo' ])}</Text>
                    {hasSignature ? (
                        <TouchableOpacity style={styles.infoContainer} onPress={() => this.handleCleanSignature()}>
                            <Image style={styles.imageClose} source={Images.erase} />
                            <Text style={styles.cleanText}>{I18n.t([ 'scheduleSignatureScreen', 'clean' ])}</Text>
                        </TouchableOpacity>
                    ) : (
                        <View />
                    )}
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignatureScreen);
