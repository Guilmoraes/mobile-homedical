import * as React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import styles from "./SearchScreenStyles";
import FloatingLabelInput from "../../Components/FloatingLabelInput";
import ValidationForms from '../../Utils/ValidationForms'
import Rx from 'rxjs/Rx'
import _ from 'lodash'
import { Actions as NavigationActions } from 'react-native-router-flux'


export interface Props {
  configScreen: any,
  callback: (item: any) => void,
  find: (query?: string) => void
  paramObject?: any
}

export interface State {
  query: string,
  isQueryValid?: boolean,
  page?: any,
  originalList?: any,
  content?: any,
}

class SearchScreen extends React.Component<Props, State> {

  private onSearchChanged$: Rx.Subject<string>;

  constructor(props: Props) {
    super(props);

    this.onSearchChanged$ = new Rx.Subject<string>();

    this.state = {
      query: "",
      isQueryValid: undefined
    };

    if (props.configScreen.loadInStart) {
      this.props.find(props.paramObject);
    }

  };

  componentDidMount() {

    this.onSearchChanged$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        newText => this.performQuery(newText)
      );
  }

  componentWillReceiveProps(newProps: any) {

    if (!newProps.fetching && newProps.page) {
      this.setState({
        page: newProps.page,
        originalList: newProps.page.content,
        content: this.mapContent(newProps.page.content, this.props.configScreen.itemParams)
      })
    }

  }

  mapContent = (content: any, itemParams: any) => {
    return _.map(content, function (it: any) {
      let name = '';
      let separator = itemParams.separator ? itemParams.separator : ' - ';

      _.each(itemParams.params, function (param: any) {
        let object = it;

        if (!_.isEmpty(name)) {
          name = name + separator
        }

        _.each(param, function (property: any) {
          object = object[property]
        });

        name = name + object
      });

      return name
    })
  };

  performQuery = (newText: string) => {
    this.setState({ isQueryValid: ValidationForms.validateString(newText) });

    if (ValidationForms.validateString(newText)) {
      this.props.find(newText)
    }
  };

  handleSearchChanged = (newText: string) => {
    this.setState({ query: newText });
    this.onSearchChanged$.next(newText);
  };

  handleOnSelectItem = (item: any) => {
    let index = this.state.content.indexOf(item);
    this.props.callback(this.state.originalList[index]);
    NavigationActions.pop();
  };

  handleClosePressed = () => {
    NavigationActions.pop();
  };

  keyExtractor = (item: any, index: any) => index.toString();

  _renderItem = ({ item }: any) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => this.handleOnSelectItem(item)}>
          <Text style={styles.textItem}>{item}</Text>
        </TouchableOpacity>
      </View>
    )
  };

  public render() {
    const { configScreen, ...props } = this.props;

    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={() => this.handleClosePressed()}
          style={styles.closeImageContainer}>
          <Image
            style={styles.closeImage}
            source={require('../../Images/ic-close-search.png')}
          />
        </TouchableOpacity>

        <Text style={styles.titleStyle}>{configScreen.title}</Text>

        {
          configScreen.showSearchField &&
          <FloatingLabelInput
            label={configScreen.inputHint}
            value={this.state.query}
            isFieldCorrect={this.state.isQueryValid}
            onChangeText={(newText: string) => this.handleSearchChanged(newText)}
            viewStyle={styles.inputStyle} />
        }


        <FlatList
          style={styles.flatList}
          data={this.state.content ? this.state.content : []}
          ListEmptyComponent={this.props.configScreen.emptyPlaceholder ? this.props.configScreen.emptyPlaceholder : <View />}
          keyExtractor={this.keyExtractor}
          renderItem={this._renderItem} />
      </View>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    fetching: state[ownProps.configScreen.stateAction].fetching,
    error: state[ownProps.configScreen.stateAction].error,
    page: state[ownProps.configScreen.stateAction].page
  }
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    find: (param: any) => dispatch(ownProps.performRequest(param))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)

