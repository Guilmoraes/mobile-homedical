import * as React from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import styles from "./RegisterProfessionalScreenStyles";
import I18n from '../../i18n/i18n'
import FloatingLabelInput from '../../Components/FloatingLabelInput'
import Rx from 'rxjs/Rx'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ValidationForms from '../../Utils/ValidationForms'
import CityActions from '../../Redux/city/CityRedux'
import SpecialtyActions from '../../Redux/specialty/SpecialtyRedux'
import _ from "lodash";
import Toast from '../../Utils/Toast'
import LoadingButton from "../../Components/LoadingButton";
import ProfessionalActions from '../../Redux/professional/ProfessionalRedux'
import StringUtils from '../../Utils/StringUtils';
import { Navigation } from "../../Enums/Navigation";

export interface Props {
  registerProfessional: (professional: any) => void
}

export interface State {
  name: string,
  isNameValid?: boolean,
  email: string,
  isEmailValid?: boolean,
  password: string,
  isPasswordValid?: boolean,
  confirmPassword: string,
  isConfirmPasswordValid?: boolean,
  phone: string,
  isPhoneValid?: boolean,
  cpf: string,
  isCpfValid?: boolean,
  city?: any,
  isCityValid?: boolean,
  specialties: any,
  isSpecialtiesValid?: boolean,
  loading?: boolean
}

class RegisterProfessionalScreen extends React.Component<Props, State> {

  private onNameChanged$: Rx.Subject<string>;
  private onEmailChanged$: Rx.Subject<string>;
  private onCpfChanged$: Rx.Subject<string>;
  private onPasswordChanged$: Rx.Subject<string>;
  private onConfirmPasswordChanged$: Rx.Subject<string>;
  private onPhoneChanged$: Rx.Subject<string>;

  constructor(props: Props) {
    super(props);

    this.onNameChanged$ = new Rx.Subject<string>();
    this.onEmailChanged$ = new Rx.Subject<string>();
    this.onCpfChanged$ = new Rx.Subject<string>();
    this.onPasswordChanged$ = new Rx.Subject<string>();
    this.onConfirmPasswordChanged$ = new Rx.Subject<string>();
    this.onPhoneChanged$ = new Rx.Subject<string>();

    this.state = {
      name: "",
      isNameValid: undefined,
      email: "",
      isEmailValid: undefined,
      password: "",
      isPasswordValid: undefined,
      confirmPassword: "",
      isConfirmPasswordValid: undefined,
      phone: "",
      isPhoneValid: undefined,
      cpf: "",
      isCpfValid: undefined,
      city: null,
      isCityValid: undefined,
      specialties: [],
      isSpecialtiesValid: undefined
    }
  };

  componentWillMount() {
    NavigationActions.registerProfessional({ type: 'refresh', hideNavBar: false });
  }

  componentDidMount() {

    this.onNameChanged$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        newName => this.validateName(newName)
      );

    this.onEmailChanged$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        newEmail => this.validateEmail(newEmail)
      );

    this.onCpfChanged$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        newCpf => this.validateCpf(newCpf)
      );

    this.onPasswordChanged$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        newPassword => this.validatePassword(newPassword)
      );

    this.onConfirmPasswordChanged$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        newPassword => this.validateConfirmPassword(newPassword)
      );

    this.onPhoneChanged$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        newPhone => this.validatePhone(newPhone)
      );
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
          title: I18n.t(['registerProfessionalScreen', 'successTitle']),
          message: I18n.t(['registerProfessionalScreen', 'successMessage']),
          icon: require('../../Images/ic-account-created.png'),
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

  handleNameChanged = (newName: string) => {
    this.setState({ name: newName });
    this.onNameChanged$.next(newName);
  };

  handleEmailChanged = (newEmail: string) => {
    this.setState({ email: newEmail });
    this.onEmailChanged$.next(newEmail);
  };

  handleCpfChanged = (newCpf: string) => {
    this.setState({ cpf: newCpf });
    this.onCpfChanged$.next(newCpf);
  };

  handlePasswordChanged = (newPassword: string) => {
    this.setState({ password: newPassword });
    this.onPasswordChanged$.next(newPassword);
  };

  handleConfirmPasswordChanged = (newPassword: string) => {
    this.setState({ confirmPassword: newPassword });
    this.onConfirmPasswordChanged$.next(newPassword);
  };

  handlePhoneChanged = (newPhone: string) => {
    this.setState({ phone: newPhone });
    this.onPhoneChanged$.next(newPhone);
  };

  handleCityPressed = () => {

    let configScreen = {
      title: I18n.t(['searchScreen', 'city']),
      stateAction: 'city',
      inputHint: I18n.t(['searchScreen', 'cityHint']),
      showSearchField: true,
      itemParams: {
        params: [['name'], ['state', 'acronym']]
      }
    };

    NavigationActions.search({
      configScreen: configScreen,
      performRequest: CityActions.cityRequest,
      callback: this.cityCallback
    })
  };

  handleSpecialtyPressed = () => {
    let configScreen = {
      title: I18n.t(['searchScreen', 'specialty']),
      stateAction: 'specialty',
      loadInStart: true,
      itemParams: {
        params: [['name']]
      }
    };

    NavigationActions.search({
      configScreen: configScreen,
      performRequest: SpecialtyActions.specialtyRequest,
      callback: this.specialtyCallback
    })
  };

  handleRemoveSpecialtyPressed = (item: any) => {
    let specialties = Object.assign([], this.state.specialties);
    _.pull(specialties, item);

    if (specialties.length === 0) {
      this.setState({ isSpecialtiesValid: undefined })
    }

    this.setState({ specialties: specialties });
  };

  handleButtonPressed = () => {

    if (this.state.loading) {
      return;
    }

    if (!this.isAllFormsRequiredValid()) {
      Toast.showToast(I18n.t(['registerProfessionalScreen', 'fillAllFields']));
      return;
    }

    let professional = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      specialties: this.state.specialties,
      phone: {
        number: StringUtils.removeSpecialCharacters(this.state.phone)
      },
      address: {
        city: this.state.city
      },
      cpf: StringUtils.removeSpecialCharacters(this.state.cpf)
    };

    this.props.registerProfessional(professional);
  };

  cityCallback = (city: any) => {
    this.setState({ city: city, isCityValid: true })
  };

  specialtyCallback = (specialty: any) => {
    let specialties = Object.assign([], this.state.specialties);

    let foundSpecialty = _.find(specialties, function (s: any) {
      return s.id === specialty.id;
    });

    if (foundSpecialty) {
      Toast.showToast(I18n.t(['registerProfessionalScreen', 'specialtyAlreadyAdded']));
      return;
    }

    specialties.push(specialty);
    this.setState({ specialties: specialties, isSpecialtiesValid: true })
  };

  isAllFormsRequiredValid = () => {
    let isFormValid = true;

    if (!ValidationForms.validateBooleanEmpty(this.state.isNameValid)) {
      this.setState({ isNameValid: false });
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isEmailValid)) {
      this.setState({ isEmailValid: false });
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isCpfValid)) {
      this.setState({ isCpfValid: false });
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isPasswordValid)) {
      this.setState({ isPasswordValid: false });
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isConfirmPasswordValid)) {
      this.setState({ isConfirmPasswordValid: false });
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isPhoneValid)) {
      this.setState({ isPhoneValid: false });
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isCityValid)) {
      this.setState({ isCityValid: false });
      isFormValid = false;
    }

    if (this.state.specialties.length === 0) {
      this.setState({ isSpecialtiesValid: false });
      isFormValid = false;
    }

    return isFormValid;
  };

  validateName = (newName: string) => {
    this.setState({ isNameValid: ValidationForms.validateString(newName) });
  };

  validateEmail = (newEmail: string) => {
    this.setState({ isEmailValid: ValidationForms.validateEmail(newEmail) })
  };

  validateCpf = (newCpf: string) => {
    this.setState({ isCpfValid: ValidationForms.validateCpf(newCpf) })
  };

  validatePassword = (newPassword: string) => {
    this.setState({ isPasswordValid: ValidationForms.validatePassword(newPassword) })
  };

  validateConfirmPassword = (newPassword: string) => {
    this.setState({ isConfirmPasswordValid: ValidationForms.validatePassword(newPassword) && newPassword === this.state.password })
  };

  validatePhone = (newPhone: string) => {
    this.setState({ isPhoneValid: ValidationForms.validatePhone(newPhone) })
  };

  keyExtractor = (item: any, index: any) => index.toString();

  _renderItem = ({ item }: any) => {
    return (
      <View style={styles.specialtyContainer}>
        <Text style={styles.specialtyText}>
          {item.name}
        </Text>

        <TouchableOpacity onPress={() => this.handleRemoveSpecialtyPressed(item)}>
          <Image
            style={styles.closeImageSmall}
            source={require('../../Images/ic-floating-label-input-incorrect.png')}
          />
        </TouchableOpacity>

      </View>
    )
  };

  public render() {
    return (
      <ScrollView keyboardShouldPersistTaps={'always'} style={styles.container}>

        <Text style={styles.title}>{I18n.t(['registerProfessionalScreen', 'title'])}</Text>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['registerProfessionalScreen', 'nameHint'])}
            value={this.state.name}
            onChangeText={(newName: string) => this.handleNameChanged(newName)}
            keyboardType={'default'}
            autoCapitalize={"words"}
            isFieldCorrect={this.state.isNameValid}
            viewStyle={styles.inputType} />
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['registerProfessionalScreen', 'emailHint'])}
            value={this.state.email}
            onChangeText={(newEmail: string) => this.handleEmailChanged(newEmail)}
            isFieldCorrect={this.state.isEmailValid}
            keyboardType={'email-address'}
            viewStyle={styles.inputType} />
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['registerProfessionalScreen', 'cpfHint'])}
            value={this.state.cpf}
            onChangeText={(newCpf: string) => this.handleCpfChanged(newCpf)}
            isFieldCorrect={this.state.isCpfValid}
            mask={"cpf"}
            maxLength={14}
            viewStyle={styles.inputType} />
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['registerProfessionalScreen', 'passwordHint'])}
            value={this.state.password}
            onChangeText={(newPassword: string) => this.handlePasswordChanged(newPassword)}
            isFieldCorrect={this.state.isPasswordValid}
            keyboardType={'default'}
            secureTextEntry={true}
            viewStyle={styles.inputType} />
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['registerProfessionalScreen', 'confirmPasswordHint'])}
            value={this.state.confirmPassword}
            onChangeText={(newPassword: string) => this.handleConfirmPasswordChanged(newPassword)}
            isFieldCorrect={this.state.isConfirmPasswordValid}
            secureTextEntry={true}
            viewStyle={styles.inputType} />
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['registerProfessionalScreen', 'phoneHint'])}
            value={this.state.phone}
            onChangeText={(newPhone: string) => this.handlePhoneChanged(newPhone)}
            mask={"cel-phone"}
            isFieldCorrect={this.state.isPhoneValid}
            maxLength={15}
            viewStyle={styles.inputType} />
        </View>

        <TouchableOpacity style={styles.touchableStyle} onPress={() => this.handleCityPressed()}>
          <View pointerEvents='none'>
            <FloatingLabelInput
              label={I18n.t(['registerProfessionalScreen', 'cityHint'])}
              value={this.state.city ? this.state.city.name : null}
              isFieldEditable={false}
              isFieldCorrect={this.state.isCityValid}
              icon={require('../../Images/ic-search-floating-label.png')}
              viewStyle={styles.inputTypeSearch} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableStyle} onPress={() => this.handleSpecialtyPressed()}>
          <View pointerEvents='none'>
            <FloatingLabelInput
              label={I18n.t(['registerProfessionalScreen', 'specialtyHint'])}
              isFieldEditable={false}
              isFieldCorrect={this.state.isSpecialtiesValid}
              icon={require('../../Images/ic-search-floating-label.png')}
              viewStyle={styles.inputTypeSearch} />
          </View>
        </TouchableOpacity>

        <FlatList
          style={styles.flatList}
          data={this.state.specialties}
          keyExtractor={this.keyExtractor}
          renderItem={this._renderItem} />

        <LoadingButton title={I18n.t(['registerProfessionalScreen', 'createAccount'])}
          isLoading={this.props.loading}
          onButtonPressed={() => this.handleButtonPressed()}
          viewStyle={styles.buttonStyle} />


      </ScrollView>
    );
  }
}


const mapStateToProps = (state: any) => {
  return {
    loading: state.professional.loading,
    requestError: state.professional.error,
    requestSuccess: state.professional.success
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    registerProfessional: (professional: any) => dispatch(ProfessionalActions.registerProfessionalRequest(professional))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProfessionalScreen)


