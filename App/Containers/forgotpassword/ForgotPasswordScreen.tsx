import * as React from "react";
import { Text, View } from "react-native";
import styles from './ForgotPasswordScreenStyles'
import I18n from '../../i18n/i18n'
import FloatingLabelInput from '../../Components/FloatingLabelInput'
import LoadingButton from '../../Components/LoadingButton'
import ValidationForms from '../../Utils/ValidationForms'
import Rx from 'rxjs/Rx'
import { connect } from 'react-redux'
import ForgotPasswordActions from "../../Redux/ForgotPasswordRedux";
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Navigation } from "../../Enums/Navigation";

export interface Props {
  forgotPasswordRequest: (email: string) => void
}

export interface State {
  email: string,
  isEmailValid?: boolean,
  loading: boolean
}

class ForgotPasswordScreen extends React.Component<Props, State> {

  private onEmailChanged$: Rx.Subject<string>;


  constructor(props: Props) {
    super(props);

    this.onEmailChanged$ = new Rx.Subject<string>();

    this.state = {
      email: "",
      isEmailValid: undefined,
      loading: false,
    };
  };

  componentWillMount() {
    NavigationActions.forgotPassword({ type: 'refresh', hideNavBar: false });
  }

  componentDidMount() {

    this.onEmailChanged$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(
        newEmail => this.validateEmail(newEmail)
      )

  }

  componentWillReceiveProps(newProps: any) {
    if (!newProps.loading) {
      if (newProps.requestError && newProps.requestError.description) {

        let configScreen = {
          message: newProps.requestError.description,
          buttonCallback: () => {
            this.setState({ isEmailValid: false })
          }
        };

        NavigationActions.error({ configScreen: configScreen })

      } else if (newProps.requestSuccess) {

        let configScreen = {
          title: I18n.t(['forgotPasswordScreen', 'successMessage']),
          buttonCallback: () => {
            setTimeout(() => {
              NavigationActions.pop();
            }, 100)
          }
        };

        NavigationActions.success({ configScreen: configScreen })
      }
    }
  }

  handleEmailChanged = (newEmail: string) => {
    this.setState({ email: newEmail });
    this.onEmailChanged$.next(newEmail);
  };

  handleButtonPressed = () => {
    if (!this.state.loading && this.state.isEmailValid) {
      this.props.forgotPasswordRequest(this.state.email);
    } else if (!this.state.isEmailValid) {
      this.setState({ isEmailValid: false });
    }
  };

  validateEmail = (newEmail: string) => {
    this.setState({
      isEmailValid: ValidationForms.validateEmail(newEmail)
    });
  };


  public render() {
    return (
      <View style={styles.container}>

        <Text style={styles.titleStyle}>{I18n.t(['forgotPasswordScreen', 'title'])}</Text>

        <FloatingLabelInput
          label={I18n.t(['forgotPasswordScreen', 'emailHint'])}
          value={this.state.email}
          onChangeText={(newEmail) => this.handleEmailChanged(newEmail)}
          keyboardType={'email-address'}
          isFieldCorrect={this.state.isEmailValid}
          icon={require("../../Images/ic-email-login.png")}
          viewStyle={styles.inputStyle} />

        <LoadingButton title={I18n.t(['forgotPasswordScreen', 'send'])}
          isLoading={this.props.loading}
          onButtonPressed={() => this.handleButtonPressed()}
          viewStyle={styles.buttonStyle} />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.forgotPassword.loading,
    requestError: state.forgotPassword.error,
    requestSuccess: state.forgotPassword.success
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    forgotPasswordRequest: (email: string) => dispatch(ForgotPasswordActions.forgotPasswordRequest(email))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)

