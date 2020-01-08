import * as React from "react";
import {FlatList, Text, View, Image} from "react-native";
import {connect} from "react-redux";
import styles from "./PendingDocumentsScreenStyles";
import I18n from '../../i18n/i18n'
import LoadingButton from "../../Components/LoadingButton";
import {Actions as NavigationActions} from 'react-native-router-flux'

export interface Props {
  professional?: any,
  pendingDocuments?: any
}

export interface State {
  professional?: any,
  documentTypes: any
}

class PendingDocumentsScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      professional: props.professional,
      documentTypes: props.pendingDocuments
    };

  };

  componentWillReceiveProps(newProps: any) {
  }

  handleButtonPressed = () => {
    NavigationActions.uploadDocuments({type: 'reset', documentTypes: this.state.documentTypes})
  };

  keyExtractor = (item: any, index: any) => index.toString();

  _renderItem = ({item}: any) => {
    return (
      <View>
        <View style={styles.itemContainer}>
          <Image style={styles.itemImage} source={require('../../Images/document-icon.png')} />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>

        <View style={styles.divisor}/>
      </View>
    )
  };


  public render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.firstMessage}>{I18n.t(['pendingDocumentsScreen', 'firstGreetingMessage'], {name: this.state.professional ? this.state.professional.name : ''})}</Text>
        <Text style={styles.secondMessage}>{I18n.t(['pendingDocumentsScreen', 'secondGreetingMessage'])}</Text>

        <Text style={styles.thirdMessage}>
          <Text>{I18n.t(['pendingDocumentsScreen', 'thirdMessage'])}</Text> <Text
          style={styles.thirdMessageBold}>{I18n.t(['pendingDocumentsScreen', 'thirdMessageResend'])}</Text>
        </Text>


        <FlatList
          style={styles.flatList}
          data={this.state.documentTypes}
          keyExtractor={this.keyExtractor}
          renderItem={this._renderItem}/>

        <LoadingButton
          title={I18n.t(['documentFirstAccessScreen', 'startUpload'])}
          onButtonPressed={() => this.handleButtonPressed()}
          viewStyle={styles.button}/>

      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    professional: state.local.professional
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingDocumentsScreen)

