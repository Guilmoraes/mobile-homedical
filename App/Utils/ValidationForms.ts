import {MaskService} from 'react-native-masked-text'
import {is} from "redux-saga/utils";

class ValidationForms {

  validateEmail(newEmail?: string): boolean {

    let isEmailValid = true;

    if (newEmail === undefined || newEmail === null) {
      isEmailValid = false;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (newEmail !== undefined && reg.test(newEmail) === false) {
      isEmailValid = false;
    }

    return isEmailValid;
  }

  validateString(text?: string) {
    return !(text === undefined || text === null || text === "");
  }

  validatePassword(text?: string) {
    return this.validateString(text) && text!!.length > 3;
  }

  validateCpf(text?: string) {
    return MaskService.isValid('cpf', text);
  }

  validatePhone(phone?: string) {
    return MaskService.isValid('cel-phone', phone);
  }

  validateBooleanEmpty(isValid?: boolean) {

    if(isValid === undefined || isValid === null){
      return false;
    }

    return isValid;
  }

}

export default new ValidationForms()
