import { call, put } from 'redux-saga/effects'
import ForgotPasswordActions from "../Redux/ForgotPasswordRedux"
import I18n from '../i18n/i18n'

export function* getForgotPassword(passwordApi, { email }) {
  const response = yield call(passwordApi.forgotPassword, email);
  if (response.ok) {
    yield put(ForgotPasswordActions.forgotPasswordSuccess())
  } else {

    if (response.status === 404) {
      yield put(ForgotPasswordActions.forgotPasswordFailure({ description: I18n.t(['error', response.data.message.replace(/\./g,'')]) }))
    } else {
      yield put(ForgotPasswordActions.forgotPasswordFailure({ description: I18n.t(['error', 'unknown']) }))
    }
  }

  yield put(ForgotPasswordActions.forgotPasswordReset())
}
