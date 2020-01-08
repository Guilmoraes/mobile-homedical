import * as React from "react";
import { Modal, View, Text, Linking } from "react-native";
import styles from "./AcceptTermsComponentStyles";
import I18n from "../../i18n/i18n"
import LoadingButton from "../../Components/LoadingButton"
import AppConfig from '../../Config/AppConfig'

export interface Props {
    showModal: boolean,
    handleButtonPressed: () => void,
    isLoading?: boolean
}

export interface State {
}

export default class AcceptTermsComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    };

    componentWillReceiveProps(newProps: any) {
    }

    componentDidMount() {
    }

    public render() {
        return (
            <Modal
                // animationType="fade"
                visible={this.props.showModal}
                onRequestClose={() => null}
                transparent={true}>
                <View style={styles.container}>

                    <View style={styles.boxContainer}>
                        <Text style={styles.titleStyle}>{I18n.t(['acceptTermsComponent', 'title'])}</Text>

                        <View style={styles.messageContainer}>
                            <Text style={styles.messageStyle}>{I18n.t(['acceptTermsComponent', 'message'])}</Text>
                            <Text style={styles.hyperLinkStyle} onPress={() => Linking.openURL(AppConfig.termUrl)}>clique aqui.</Text>
                        </View>

                        <LoadingButton
                            onButtonPressed={() => this.props.handleButtonPressed()}
                            viewStyle={styles.buttonViewStyle}
                            isLoading={this.props.isLoading}
                            title={I18n.t(['acceptTermsComponent', 'buttonText'])} />
                    </View>
                </View>
            </Modal>
        );
    }
}

