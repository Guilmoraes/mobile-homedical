import * as React from 'react';
import {Image, ImageRequireSource, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './DocumentFullScreenStyles';
import {File} from '../../Models/File';
import {Actions as NavigationActions} from 'react-native-router-flux'
import {Document} from '../../Models/Document';

export interface Props {
    document: Document | File,
    handleDeletePressed: (document: Document | File) => void
}

export interface State {
    document: Document | File
}

class DocumentFullScreen extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            document: props.document
        };
    };

    handleOnClosePressed = () => {
        NavigationActions.pop();
    };

    handleDeletePressed = () => {
        this.props.handleDeletePressed(this.state.document);
        NavigationActions.pop();
    };


    public render() {
        const image: ImageRequireSource = this.state.document.hasOwnProperty('fileMobilePath') ?
            {uri: (this.state.document as File).fileMobilePath!} : (this.state.document as Document).uri;
        return (
            <View style={styles.container}>

                <View style={styles.headerContainer}>

                    <TouchableOpacity onPress={() => this.handleOnClosePressed()}>
                        <Image style={styles.imageClose} source={require('../../Images/ic-close-search.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.handleDeletePressed()}>
                        <Text style={styles.deleteText}>Excluir</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>

                    <Image style={styles.imageStyle} source={image}/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentFullScreen)

