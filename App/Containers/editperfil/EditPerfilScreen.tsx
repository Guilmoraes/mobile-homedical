import * as React from 'react';
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './EditPerfilScreenStyles';
import I18n from '../../i18n/i18n'
import FloatingLabelInput from '../../Components/FloatingLabelInput';
import Rx from 'rxjs/Rx'
import ValidationForms from '../../Utils/ValidationForms';
import {ProgressDialog} from 'react-native-simple-dialogs';
import ProfessionalActions from '../../Redux/professional/ProfessionalRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import StringUtils from '../../Utils/StringUtils';
import _ from 'lodash'
import SpecialtyActions from '../../Redux/specialty/SpecialtyRedux'
import CityActions from '../../Redux/city/CityRedux'
import Toast from '../../Utils/Toast'
import LoadingButton from '../../Components/LoadingButton';

export interface Props {
  getProfessionalInfo: () => void,
  updateProfessional: (professional: any) => void
}

export interface State {
  id?: string,
  professional?: any,
  name: string,
  isNameValid?: boolean,
  email: string,
  isEmailValid?: boolean
  cpf: string,
  isCpfValid?: boolean,
  phone: string,
  isPhoneValid?: boolean,
  addressStreet?: string,
  isAddressStreetValid?: boolean,
  addressStreetNumber?: string,
  isAddressStreetNumberValid?: boolean,
  addressZipcode ?: string,
  isAddressZipcodeValid?: boolean,
  addressDistrict ?: string,
  isAddressDistrictValid?: boolean
  showLoadingDialog: boolean,
  isSpecialtiesValid?: boolean,
  specialties?: any,
  city?: any,
  isCityValid?: any,
  requestUpdateLoading?: boolean
}

class EditPerfilScreen extends React.Component<Props, State> {

  private onNameChanged$: Rx.Subject<string>;
  private onEmailChanged$: Rx.Subject<string>;
  private onCpfChanged$: Rx.Subject<string>;
  private onPhoneChanged$: Rx.Subject<string>;

  constructor(props: Props) {
    super(props);

    this.onNameChanged$ = new Rx.Subject<string>();
    this.onEmailChanged$ = new Rx.Subject<string>();
    this.onCpfChanged$ = new Rx.Subject<string>();
    this.onPhoneChanged$ = new Rx.Subject<string>();

    this.state = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      showLoadingDialog: false
    };
  };

  componentWillMount() {
    NavigationActions.editPerfil({type: 'refresh', hideNavBar: false});
    this.props.getProfessionalInfo();
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

    this.onPhoneChanged$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        newPhone => this.validatePhone(newPhone)
      );
  }

  componentWillReceiveProps(newProps: any) {

    if (newProps.requestInfoLoading) {
      this.setState({showLoadingDialog: true});
    } else {
      this.setState({showLoadingDialog: false});


      if (newProps.requestInfoSuccess) {
        this.mapProfessionalProperties(newProps.professional);
      } else if (newProps.requestInfoError) {
        const configScreen = {
          message: newProps.requestInfoError.description,
          buttonCallback: () => {
            NavigationActions.pop();
          }
        };

        NavigationActions.error({configScreen})
      }
    }

    if (!newProps.requestUpdateLoading) {

      if (newProps.requestUpdateSuccess) {
        const configScreen = {
          title: I18n.t(['editPerfilScreen', 'successMessage']),
          buttonCallback: () => {
            NavigationActions.pop();
          }
        };

        NavigationActions.success({configScreen})

      } else if (newProps.requestUpdateError) {

        let buttonCallback = () => {
        };

        if (newProps.requestUpdateError.message === 'error.register.professional.email.already.used') {
          buttonCallback = () => {
            this.setState({isEmailValid: false});
          }
        }

        const configScreen = {
          message: newProps.requestUpdateError.description,
          buttonCallback: buttonCallback ? buttonCallback : null
        };

        NavigationActions.error({configScreen})
      }
    }
  }

  handleNameChanged = (newName: string) => {
    this.setState({name: newName});
    this.onNameChanged$.next(newName);
  };

  handleEmailChanged = (newEmail: string) => {
    this.setState({email: newEmail});
    this.onEmailChanged$.next(newEmail);
  };

  handleCpfChanged = (newCpf: string) => {
    this.setState({cpf: newCpf});
    this.onCpfChanged$.next(newCpf);
  };

  handlePhoneChanged = (newPhone: string) => {
    this.setState({phone: newPhone});
    this.onPhoneChanged$.next(newPhone);
  };

  handleAddressStreetChanged = (newAddressStreet: string) => {
    if (StringUtils.isEmpty(newAddressStreet)) {
      this.setState(({addressStreet: newAddressStreet, isAddressStreetValid: undefined}));
    } else {
      this.setState(({addressStreet: newAddressStreet, isAddressStreetValid: true}));
    }
  };

  handleAddressStreetNumberChanged = (newAddressStreetNumber: string) => {
    if (StringUtils.isEmpty(newAddressStreetNumber)) {
      this.setState(({
        addressStreetNumber: newAddressStreetNumber,
        isAddressStreetNumberValid: undefined,
      }));
    } else {
      this.setState(({
        addressStreetNumber: newAddressStreetNumber,
        isAddressStreetNumberValid: true,
      }));
    }
  };

  handleAddressZipcodeChanged = (newAddressZipcode: string) => {
    if (StringUtils.isEmpty(newAddressZipcode)) {
      this.setState(({
        addressZipcode: newAddressZipcode,
        isAddressZipcodeValid: undefined,
      }));
    } else {
      this.setState(({
        addressZipcode: newAddressZipcode,
        isAddressZipcodeValid: true,
      }));
    }
  };

  handleAddressDistrictChanged = (newAddressDistrict: string) => {
    if (StringUtils.isEmpty(newAddressDistrict)) {
      this.setState(({
        addressDistrict: newAddressDistrict,
        isAddressDistrictValid: undefined,
      }));
    } else {
      this.setState(({
        addressDistrict: newAddressDistrict,
        isAddressDistrictValid: true,
      }));
    }
  };

  handleRemoveSpecialtyPressed = (item: any) => {
    const specialties = Object.assign([], this.state.specialties);
    _.pull(specialties, item);

    if (specialties.length === 0) {
      this.setState({isSpecialtiesValid: undefined})
    }

    this.setState({specialties});
  };

  handleCityPressed = () => {

    const configScreen = {
      title: I18n.t(['searchScreen', 'city']),
      stateAction: 'city',
      inputHint: I18n.t(['searchScreen', 'cityHint']),
      showSearchField: true,
      itemParams: {
        params: [['name'], ['state', 'acronym']]
      }
    };

    NavigationActions.search({
      configScreen,
      performRequest: CityActions.cityRequest,
      callback: this.cityCallback
    })
  };

  cityCallback = (city: any) => {
    this.setState({city, isCityValid: true})
  };

  handleSpecialtyPressed = () => {
    const configScreen = {
      title: I18n.t(['searchScreen', 'specialty']),
      stateAction: 'specialty',
      loadInStart: true,
      itemParams: {
        params: [['name']]
      }
    };

    NavigationActions.search({
      configScreen,
      performRequest: SpecialtyActions.specialtyRequest,
      callback: this.specialtyCallback
    })
  };

  specialtyCallback = (specialty: any) => {
    const specialties = Object.assign([], this.state.specialties);

    const foundSpecialty = _.find(specialties, function (s: any) {
      return s.id === specialty.id;
    });

    if (foundSpecialty) {
      Toast.showToast(I18n.t(['editPerfilScreen', 'specialtyAlreadyAdded']));
      return;
    }

    specialties.push(specialty);
    this.setState({specialties, isSpecialtiesValid: true})
  };

  handleButtonPressed = () => {

    if (this.state.requestUpdateLoading) {
      return;
    }

    if (!this.isAllFormsRequiredValid()) {
      Toast.showToast(I18n.t(['registerProfessionalScreen', 'fillAllFields']));
      return;
    }

    const professional = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      specialties: this.state.specialties,
      phone: {
        id: this.state.professional.phone.id,
        number: StringUtils.removeSpecialCharacters(this.state.phone)
      },
      address: {
        street: this.state.addressStreet,
        number: this.state.addressStreetNumber,
        district: this.state.addressDistrict,
        zipcode: this.state.addressZipcode ? StringUtils.removeSpecialCharacters(this.state.addressZipcode) : this.state.addressZipcode,
        city: this.state.city
      },
      cpf: StringUtils.removeSpecialCharacters(this.state.cpf)
    };

    this.props.updateProfessional(professional);
  };

  isAllFormsRequiredValid = () => {
    let isFormValid = true;

    if (!ValidationForms.validateBooleanEmpty(this.state.isNameValid)) {
      this.setState({isNameValid: false});
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isEmailValid)) {
      this.setState({isEmailValid: false});
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isCpfValid)) {
      this.setState({isCpfValid: false});
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isPhoneValid)) {
      this.setState({isPhoneValid: false});
      isFormValid = false;
    }

    if (!ValidationForms.validateBooleanEmpty(this.state.isCityValid)) {
      this.setState({isCityValid: false});
      isFormValid = false;
    }

    if (this.state.specialties.length === 0) {
      this.setState({isSpecialtiesValid: false});
      isFormValid = false;
    }

    return isFormValid;
  };

  validateName = (newName: string) => {
    this.setState({isNameValid: ValidationForms.validateString(newName)});
  };

  validateEmail = (newEmail: string) => {
    this.setState({isEmailValid: ValidationForms.validateEmail(newEmail)});
  };

  validateCpf = (newCpf: string) => {
    this.setState({isCpfValid: ValidationForms.validateCpf(newCpf)});
  };

  validatePhone = (newPhone: string) => {
    this.setState({isPhoneValid: ValidationForms.validatePhone(newPhone)})
  };


  mapProfessionalProperties = (professional: any) => {

    this.setState({
      professional,
      id: professional.id,
      name: professional.name,
      isNameValid: ValidationForms.validateString(professional.name),
      email: professional.user.email,
      isEmailValid: ValidationForms.validateEmail(professional.user.email),
      cpf: professional.cpf,
      isCpfValid: ValidationForms.validateCpf(professional.cpf),
      phone: professional.phone.number,
      isPhoneValid: ValidationForms.validatePhone(professional.phone.number),
      addressStreet: professional.address.street,
      addressStreetNumber: professional.address.number,
      addressDistrict: professional.address.district,
      addressZipcode: professional.address.zipcode,
      specialties: professional.specialties,
      isSpecialtiesValid: (professional.specialties !== undefined && professional.specialties.length > 0),
      city: professional.address.city,
      isCityValid: !(professional.city !== undefined)
    })
  };

  keyExtractor = (item: any, index: any) => index.toString();

  _renderItem = ({item}: any) => {
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
      <ScrollView style={styles.container}>

        <ProgressDialog
          visible={this.state.showLoadingDialog}
          title={I18n.t(['editPerfilScreen', 'titleLoading'])}
          message={I18n.t(['editPerfilScreen', 'messageLoading'])}
        />

        <Text style={styles.title}>{I18n.t(['editPerfilScreen', 'title'])}</Text>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['editPerfilScreen', 'nameHint'])}
            value={this.state.name}
            autoCapitalize={'words'}
            onChangeText={(newName: string) => this.handleNameChanged(newName)}
            keyboardType={'default'}
            isFieldCorrect={this.state.isNameValid}/>
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['editPerfilScreen', 'emailHint'])}
            value={this.state.email}
            onChangeText={(newEmail: string) => this.handleEmailChanged(newEmail)}
            keyboardType={'email-address'}
            isFieldCorrect={this.state.isEmailValid}/>
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['registerProfessionalScreen', 'cpfHint'])}
            value={this.state.cpf}
            onChangeText={(newCpf: string) => this.handleCpfChanged(newCpf)}
            isFieldCorrect={this.state.isCpfValid}
            mask={'cpf'}
            maxLength={14}/>
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['registerProfessionalScreen', 'phoneHint'])}
            value={this.state.phone}
            onChangeText={(newPhone: string) => this.handlePhoneChanged(newPhone)}
            mask={'cel-phone'}
            isFieldCorrect={this.state.isPhoneValid}
            maxLength={15}/>
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['editPerfilScreen', 'addressStreetHint'])}
            value={this.state.addressStreet}
            onChangeText={(newAddressStreet: string) => this.handleAddressStreetChanged(newAddressStreet)}
            isFieldCorrect={this.state.isAddressStreetValid}/>
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['editPerfilScreen', 'addressStreetNumberHint'])}
            value={this.state.addressStreetNumber}
            onChangeText={(newAddressStreetNumber: string) => this.handleAddressStreetNumberChanged(newAddressStreetNumber)}
            isFieldCorrect={this.state.isAddressStreetNumberValid}/>
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['editPerfilScreen', 'addressZipcodeHint'])}
            value={this.state.addressZipcode}
            onChangeText={(newAddressZipcode: string) => this.handleAddressZipcodeChanged(newAddressZipcode)}
            mask={'zip-code'}
            isFieldCorrect={this.state.isAddressZipcodeValid}
            maxLength={9}/>
        </View>

        <View style={styles.inputTypeContainer}>
          <FloatingLabelInput
            label={I18n.t(['editPerfilScreen', 'addressDistrictHint'])}
            value={this.state.addressDistrict}
            onChangeText={(newAddressDistrict: string) => this.handleAddressDistrictChanged(newAddressDistrict)}
            isFieldCorrect={this.state.isAddressDistrictValid}/>
        </View>

        <TouchableOpacity style={styles.touchableStyle} onPress={() => this.handleCityPressed()}>
          <View pointerEvents="none">
            <FloatingLabelInput
              label={I18n.t(['editPerfilScreen', 'cityHint'])}
              value={this.state.city ? this.state.city.name : null}
              isFieldEditable={false}
              isFieldCorrect={this.state.isCityValid}
              icon={require('../../Images/ic-search-floating-label.png')}
              viewStyle={styles.inputTypeSearch}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableStyle} onPress={() => this.handleSpecialtyPressed()}>
          <View pointerEvents="none">
            <FloatingLabelInput
              label={I18n.t(['editPerfilScreen', 'specialtyHint'])}
              isFieldEditable={false}
              isFieldCorrect={this.state.isSpecialtiesValid}
              icon={require('../../Images/ic-search-floating-label.png')}
              viewStyle={styles.inputTypeSearch}/>
          </View>
        </TouchableOpacity>

        <FlatList
          style={styles.flatList}
          data={this.state.specialties ? this.state.specialties : []}
          keyExtractor={this.keyExtractor}
          renderItem={this._renderItem}/>

        <LoadingButton title={I18n.t(['editPerfilScreen', 'saveButton'])}
                       isLoading={this.props.requestUpdateLoading}
                       onButtonPressed={() => this.handleButtonPressed()}
                       viewStyle={styles.buttonStyle}/>


      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    requestInfoLoading: state.professional.requestInfoLoading,
    requestInfoError: state.professional.requestInfoError,
    requestInfoSuccess: state.professional.requestInfoSuccess,
    professional: state.professional.professional,
    requestUpdateLoading: state.professional.requestUpdateLoading,
    requestUpdateSuccess: state.professional.requestUpdateSuccess,
    requestUpdateError: state.professional.requestUpdateError
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProfessionalInfo: () => dispatch(ProfessionalActions.getMyInfoRequest()),
    updateProfessional: (professional: any) => dispatch(ProfessionalActions.updateProfessionalRequest(professional))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPerfilScreen)

