import { call, put } from 'redux-saga/effects'
import PasswordActions from '../Redux/PasswordRedux'
import { callApi } from './CallApiSaga'

// attempts to request a password change
export function * changePassword (api, { password }) {
  const apiCall = call(api.changePassword, password)
  const response = yield call(callApi, apiCall)
  // success?
  if (response.ok) {
    yield put(PasswordActions.changePasswordSuccess())
  } else {
    yield put(PasswordActions.changePasswordFailure('WRONG'))
  }
}
