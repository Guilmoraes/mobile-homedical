import * as React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import styles from "./UploadDocumentsScreenStyles";
import I18n from '../../i18n/i18n'
import { Document } from "../../Models/Document";
import ImagePicker from 'react-native-image-picker'
import Toast from "../../Utils/Toast";
import DocumentActions from '../../Redux/document/DocumentRedux'
import { DocumentStatus } from "../../Enums/DocumentStatus";
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Actions as NavigationActions } from 'react-native-router-flux'
import _ from 'lodash';

export interface Props {
  professional?: any;
  documentTypes?: any;
  documents?: Document[];
  uploadDocuments: (documents: Document[]) => void;
  clearDocumentsState: () => void;
}

export interface State {
  documents: Document[];
  requestToUploadDocsLoading: boolean;
}

class UploadDocumentsScreen extends React.Component<Props, State> {

  private flatListRef: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      documents: [],
      requestToUploadDocsLoading: false,
    };

  };

  componentWillReceiveProps(newProps: any) {
    this.setState({ requestToUploadDocsLoading: newProps.requestToUploadDocsLoading });

    if (!newProps.requestToUploadDocsLoading && newProps.requestToUploadDocsSuccess) {
      const configScreen = {
        title: I18n.t(["uploadDocumentsScreen", "documentSentSuccessTitle"]),
        icon: require("../../Images/document-sent.png"),
        iconStyle: styles.docSentSuccessImage,
        buttonCallback: () => {
          this.props.clearDocumentsState();
          setTimeout(() => {
            NavigationActions.home({ type: "reset" });
          }, 200);
        },
      };

      NavigationActions.success({ configScreen });
      return;
    }

    if (!newProps.requestToUploadDocsLoading && newProps.requestToUploadDocsError) {

      const configScreen = {
        message: I18n.t(["uploadDocumentsScreen", "documentSentErrorTitle"]),
        buttonCallback: () => {}
      };

      NavigationActions.error({ configScreen });
      return;
    }
  }

  componentDidMount() {
    this.setState({ documents: this.mapDocuments(this.props.professional, this.props.documentTypes) })
  }

  mapDocuments = (professional: any, documentTypes: any) => {

    let documents: any = [];

    documentTypes.map(function (documentType: any) {

      let document = new Document();

      document.status = DocumentStatus.WAITING_APPROVEMENT;
      document.type = documentType;
      document.professional = professional;
      documents.push(document);
    });

    return documents;
  };

  handleSendPressed = () => {

    if (!this.validateDocs()) {
      Toast.showToast(I18n.t(['uploadDocumentsScreen', 'selectPhotoForRemainingDocs']));
      return;
    }

    this.setState({ requestToUploadDocsLoading: true });
    this.props.uploadDocuments(this.state.documents);

  };

  handleNextPressed = (index: any) => {
    this.flatListRef.scrollToIndex({ animated: true, index: index + 1 });
  };

  handleBackPressed = (index: any) => {
    this.flatListRef.scrollToIndex({ animated: true, index: index - 1 });
  };

  handlePhotoIcPressed = (document: Document, index: any) => {
    const options = {
      title: I18n.t(['uploadDocumentsScreen', 'selectPhotoTitle'], { documentTypeName: document.type.name }),
      takePhotoButtonTitle: I18n.t(['uploadDocumentsScreen', 'takePhotoButtonTitle']),
      chooseFromLibraryButtonTitle: I18n.t(['uploadDocumentsScreen', 'chooseFromLibraryButtonTitle']),
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (!response.didCancel && response.data) {
        document.file = response.data;
        document.fileContentType = !_.isEmpty(response.type) ? response.type : this.mapImageType(response.fileName);
        document.fileName = response.fileName;
        document.uri = { uri: response.uri };

        let newDocuments = Object.assign([], this.state.documents, this.state.documents[index], document);
        this.setState({ documents: newDocuments });
      }

    })
  };

  private mapImageType = (fileName?: string) => {
    if (fileName === undefined || fileName === null) {
      return undefined;
    }

    if (fileName.search(new RegExp(".jpg", "i")) || fileName.search(new RegExp(".jpeg", "i"))) {
      return "image/jpeg";
    } else if (fileName.search(new RegExp(".png", "i"))) {
      return "image/png";
    } else if (fileName.search(new RegExp(".gif", "i"))) {
      return "image/gif";
    }
    return undefined;
  }

  handleImageFullScreenPressed = (item: Document) => {
    NavigationActions.documentFullScreen({ document: item, handleDeletePressed: this.handleDeletePressed });
  };

  handleDeletePressed = (document: Document) => {
    let index = this.state.documents.indexOf(document);
    document.file = undefined;
    document.fileName = undefined;
    document.uri = undefined;

    let newDocuments = Object.assign([], this.state.documents, this.state.documents[index], document);
    this.setState({ documents: newDocuments });
  };

  validateDocs = () => {
    let isValid = true;
    let indexOfDocWrong: any;

    this.state.documents.forEach((document) => {

      if (!document.file) {
        isValid = false;
        indexOfDocWrong = this.state.documents.indexOf(document);
        return;
      }
    });

    if (indexOfDocWrong) {
      this.flatListRef.scrollToIndex({ animated: true, index: indexOfDocWrong });
    }

    return isValid;
  };

  keyExtractor = (item: Document, index: any) => index.toString();

  _renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.itemContainer}>

        <View style={styles.headerContainer}>

          {
            index !== 0 ?
              <TouchableOpacity onPress={() => this.handleBackPressed(index)}>
                <Image
                  style={styles.headerImageStyle}
                  source={require('../../Images/back-button.png')}
                />
              </TouchableOpacity>
              :

              <View />
          }

          <TouchableOpacity
            onPress={index + 1 === this.state.documents.length ? () => this.handleSendPressed() : () => this.handleNextPressed(index)}>
            <Text
              style={styles.headerTextStyle}>{index + 1 === this.state.documents.length ? I18n.t(['uploadDocumentsScreen', 'sendText']) : I18n.t(['uploadDocumentsScreen', 'nextText'])}</Text>
          </TouchableOpacity>

        </View>

        <Text
          style={styles.firstTextStyle}>{I18n.t(['uploadDocumentsScreen', 'requestDocumentMessage'], { documentTypeName: item.type.name })}</Text>

        <TouchableOpacity onPress={item.uri ? () => this.handleImageFullScreenPressed(item) : () => null}
          style={styles.fileContainerStyle}>

          <View style={styles.fileImageContainer}>
            {item.uri && <Image style={styles.fileImageStyle} source={item.uri} />}

          </View>

        </TouchableOpacity>


        <TouchableOpacity onPress={() => this.handlePhotoIcPressed(item, index)} style={styles.roundedIconContainer}>
          <View style={styles.roundedBackground}>
            <Image
              style={styles.iconStyle}
              source={require("../../Images/camera-ic.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  };


  public render() {
    return (
      <View style={styles.container}>

        <ProgressDialog
          visible={this.state.requestToUploadDocsLoading}
          title={I18n.t(['uploadDocumentsScreen', 'uploadDocumentsLoadingTitle'])}
          message={I18n.t(['uploadDocumentsScreen', 'uploadDocumentsLoadingMessage'])}
        />

        <FlatList
          style={styles.flatList}
          data={this.state.documents}
          horizontal={true}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          scrollEnabled={false}
          keyExtractor={this.keyExtractor}
          renderItem={this._renderItem} />

      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    professional: state.local.professional,
    documents: state.document.documents,
    requestToUploadDocsLoading: state.document.requestToUploadDocsLoading,
    requestToUploadDocsSuccess: state.document.requestToUploadDocsSuccess,
    requestToUploadDocsError: state.document.requestToUploadDocsError
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    uploadDocuments: (documents: Document[]) => dispatch(DocumentActions.uploadDocuments(documents)),
    clearDocumentsState: () => dispatch(DocumentActions.clearState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocumentsScreen)

