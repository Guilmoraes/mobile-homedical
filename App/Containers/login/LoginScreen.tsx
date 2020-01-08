import * as React from "react";
import {Image, Text, View, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import I18n from "../../i18n/i18n";
import FloatingLabelInput from '../../Components/FloatingLabelInput'
import LoadingButton from '../../Components/LoadingButton'
import styles from "./LoginScreenStyles";
import {Actions as NavigationActions} from 'react-native-router-flux'
import Rx from 'rxjs/Rx'
import ValidationForms from "../../Utils/ValidationForms";
import Toast from '../../Utils/Toast'
import LoginActions from '../../Redux/LoginRedux'
import {Navigation} from "../../Enums/Navigation";

export interface Props {
  requestLogin: (email: string, password: string) => void
}

export interface State {
  email: string,
  password: string,
  isEmailValid?: boolean,
  isPasswordValid?: boolean,
  fetching?: boolean
}

class LoginScreen extends React.Component<Props, State> {

  private onEmailChanged$: Rx.Subject<string>;
  private onPasswordChanged$: Rx.Subject<string>;

  constructor(props: Props) {
    super(props);

    this.onEmailChanged$ = new Rx.Subject<string>();
    this.onPasswordChanged$ = new Rx.Subject<string>();

    this.state = {
      email: "",
      isEmailValid: undefined,
      password: "",
      isPasswordValid: undefined
    };
  };

  componentDidMount() {

    this.onEmailChanged$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(
        newEmail => this.validateEmail(newEmail)
      );

    this.onPasswordChanged$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(
        newPassword => this.validatePassword(newPassword)
      );

  }

  componentWillReceiveProps(newProps: any) {
    if (!newProps.fetching) {
      if (newProps.requestError && newProps.requestError.description) {
        let configScreen = {
          message: newProps.requestError.description,
          buttonCallback: () => {
            this.setState({isEmailValid: false, isPasswordValid: false})
          }
        };

        NavigationActions.error({configScreen: configScreen})

      } else if (newProps.requestSuccess) {
        NavigationActions.home({type: 'reset'});
      }
    }
  }

  handleEmailChanged = (newEmail: string) => {
    this.setState({email: newEmail});
    this.onEmailChanged$.next(newEmail);
  };

  handlePasswordChanged = (newPassword: string) => {
    this.setState({password: newPassword});
    this.onPasswordChanged$.next(newPassword);
  };

  handleForgotPasswordPressed = () => {
    NavigationActions.forgotPassword();
  };

  handleRegisterPressed = () => {
    NavigationActions.registerProfessional()
  };

  handleButtonPressed = () => {

    if (this.state.fetching) {
      return;
    }

    if (!this.isFormValid()) {
      Toast.showToast(I18n.t(['loginScreen', 'fillAllFields']));
      return;
    }

    this.props.requestLogin(this.state.email, this.state.password);

  };

  isFormValid = () => {
    let isFormValid = true;

    if (!this.state.isEmailValid) {
      this.setState({isEmailValid: false});
      isFormValid = false;
    }

    if (!this.state.isPasswordValid) {
      this.setState({isPasswordValid: false});
      isFormValid = false;
    }

    return isFormValid;
  };

  validateEmail = (newEmail: string) => {
    this.setState({
      isEmailValid: ValidationForms.validateEmail(newEmail)
    });
  };

  validatePassword = (newPassword: string) => {
    this.setState({isPasswordValid: ValidationForms.validatePassword(newPassword)});
  };


  public render() {
    return (
      <View style={styles.container}>

        <View style={styles.titleContainer}>

          <View>
            <Text style={styles.firstLabelTitle}>{I18n.t(["loginScreen", "duty"])}</Text>
            <Text style={styles.secondLabelTitle}>{I18n.t(["loginScreen", "nursing"])}</Text>
          </View>

          <View style={styles.circleImageContainer}>
            <Image
              style={styles.imageHouseAndNurseStyle}
              source={require("../../Images/ic-house-nurse-login.png")}
            />
          </View>
        </View>

        <View style={styles.emailAndPasswordContainer}>

          <FloatingLabelInput
            value={this.state.email}
            label={I18n.t(['loginScreen', 'emailHint'])}
            viewStyle={styles.inputStyle}
            isFieldCorrect={this.state.isEmailValid}
            onChangeText={(string) => this.handleEmailChanged(string)}
            icon={require("../../Images/ic-email-login.png")}
            keyboardType={'email-address'}
          />

          <FloatingLabelInput
            value={this.state.password}
            label={I18n.t(['loginScreen', 'passwordHint'])}
            viewStyle={[styles.inputStyle, styles.inputPasswordStyle]}
            isFieldCorrect={this.state.isPasswordValid}
            onChangeText={(string) => this.handlePasswordChanged(string)}
            icon={require("../../Images/ic-password-login.png")}
            keyboardType={'default'}
            secureTextEntry={true}
          />

        </View>

        <LoadingButton
          viewStyle={styles.buttonStyle}
          title={I18n.t(['loginScreen', 'btnLogin'])}
          isLoading={this.props.fetching}
          onButtonPressed={() => this.handleButtonPressed()}/>

        <TouchableOpacity
          style={styles.labelContainer}
          onPress={() => this.handleForgotPasswordPressed()}>
          <Text style={styles.labelButtonStyle}>{I18n.t(['loginScreen', 'forgotPassword'])}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.labelContainer}
          onPress={() => this.handleRegisterPressed()}>
          <Text style={styles.labelButtonStyle}>{I18n.t(['loginScreen', 'createAccount'])}</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    fetching: state.login.fetching,
    requestError: state.login.error,
    requestSuccess: state.login.success
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    requestLogin: (login: string, password: string) => dispatch(LoginActions.loginRequest(login, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

