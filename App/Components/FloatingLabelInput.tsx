import * as React from "react";
import {Animated, Image, TextInput, View} from "react-native";
import styles from './Styles/FloatingLabelInputStyle'
import {TextInputMask} from 'react-native-masked-text'
import ValidationForm from '../Utils/ValidationForms'

export interface Props {
  label: string,
  value?: string,
  onChangeText?: (text: string) => void,
  keyboardType?: any,
  maxLength?: number,
  autoCapitalize?: any,
  isFieldCorrect?: boolean,
  icon?: any,
  viewStyle?: any,
  iconStyle?: any,
  secureTextEntry?: boolean,
  mask?: string,
  isFieldEditable?: boolean,
  labelBlurStyle?: any,
  labelFocusedStyle?: any,
  inputStyle?: any
}

export interface State {
  isFocused: boolean,
  value: any
}

export default class FloatingLabelInput extends React.Component<Props, State> {

  _animatedIsFocused: Animated.Value | any;

  constructor(props: Props) {
    super(props);

    this.state = {
      isFocused: false,
      value: props.value
    };
  }

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(0);
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () => {
    this.setState({isFocused: true})
  };

  handleBlur = () => {
    let isEmpty = (this.props.value === undefined || this.props.value === null || this.props.value === "" );
    this.setState({isFocused: !isEmpty});
  };

  mapUnderlineStyle: any = () => {

    if (!this.props.isFieldCorrect && (this.props.isFieldCorrect !== undefined)) {
      return [styles.underlineStyle, styles.underlineStyleError]
    }

    if (this.state.isFocused || this.props.value) {
      return [styles.underlineStyle, styles.underlineStyleFocused]
    } else {
      return styles.underlineStyle;
    }
  };

  mapTextStyle: any = () => {
    if (this.props.icon) {
      return (this.state.isFocused || ValidationForm.validateString(this.props.value)) ? [styles.labelStyleFocused,this.props.labelFocusedStyle] : [styles.labelStyleBlur,this.props.labelBlurStyle]
    } else {
      return (this.state.isFocused || ValidationForm.validateString(this.props.value)) ? [styles.labelStyleFocused, styles.labelStyleWithoutMarginLeft] : [styles.labelStyleBlur, styles.labelStyleWithoutMarginLeft]
    }
  };

  mapInputStyle: any = () => {
    if (this.props.icon) {
      return [styles.inputStyle, this.props.inputStyle];
    } else {
      return [styles.inputStyle, styles.inputStyleWithoutPaddingLeft]
    }
  };


  public render() {
    const {label, icon, mask, isFieldEditable, autoCapitalize, ...props} = this.props;
    return (
      <View style={[styles.floatingLabelStyle, this.props.viewStyle]}>

        {
          icon ?
            <Image
              style={!this.props.iconStyle ? styles.iconStyle : [styles.iconStyle, this.props.iconStyle]}
              source={icon}
            /> :
            <View/>
        }


        <Animated.Text
          style={this.mapTextStyle()}>{label}</Animated.Text>

        {
          mask ?
            <TextInputMask
              {...props}
              style={this.mapInputStyle()}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
              maxLength={this.props.maxLength ? this.props.maxLength : 100}
              type={mask}
              onChangeText={(text: string) => {this.props.onChangeText(text);}}
              autoCorrect={false}
            />
            :
            <TextInput
              {...props}
              style={this.mapInputStyle()}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              autoCapitalize={autoCapitalize ? autoCapitalize : "none"}
              value={this.props.value}
              editable={(isFieldEditable !== undefined) ? isFieldEditable : true}
              maxLength={this.props.maxLength ? this.props.maxLength : 100}
              onChangeText={(text) => {this.props.onChangeText(text);}}
              keyboardType={this.props.keyboardType ? this.props.keyboardType : "default"}
              secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
            />
        }

        <View
          style={this.mapUnderlineStyle()}
        />

        {
          (this.props.isFieldCorrect !== undefined) ?
            <Image
              style={styles.inputValidationIcon}
              source={this.props.isFieldCorrect ?
                require("../Images/ic-floating-label-input-correct.png") :
                require("../Images/ic-floating-label-input-incorrect.png")}
            /> : <View/>
        }

      </View>
    );
  }
}
