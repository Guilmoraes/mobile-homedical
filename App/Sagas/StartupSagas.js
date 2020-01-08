import { put } from 'redux-saga/effects'
import AppStateActions from '../Redux/AppStateRedux'
import LoginActions from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'

// process STARTUP actions
export function * startup (action) {
  yield put(LoginActions.loginLoad())
  yield put(AppStateActions.setRehydrationComplete())
}
