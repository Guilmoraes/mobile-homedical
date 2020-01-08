import { call, put, all } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'
import LocalActions from "../Redux/localredux/LocalRedux"
import { callApi } from './CallApiSaga'

// attempts to account
export function* getAccount(api) {
  const response = yield call(api.getAccount)

  // success?
  if (response.ok) {
    yield put(AccountActions.accountSuccess(response.data))
  } else {
    yield put(AccountActions.accountFailure('WRONG'))
  }
}

export function* checkIfTermIsAccepted(api) {
  const response = yield call(api.checkIfUserHadAcceptedTerm)

  if (response.ok) {
    if (response.status === 204) {
      yield put(AccountActions.startProcessOfAcceptTerm())
      yield put(LocalActions.persistLocalAcceptedTerm(false))
    } else if (response.status === 202) {
      yield put(LocalActions.persistLocalAcceptedTerm(true))
    }
  }
}

export function* acceptTerm(api) {

  const response = yield call(api.acceptTerm);

  if(response.ok) {
    yield put(AccountActions.processOfAcceptTermSuccess())
    yield put(LocalActions.persistLocalAcceptedTerm(true))
  } else {
    yield put(AccountActions.processOfAcceptTermError())
    yield put(LocalActions.persistLocalAcceptedTerm(false))
  }
}

// attempts to update account settings
export function* updateAccount(api, action) {
  const { account } = action;
  const apiCall = call(api.updateAccount, account);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AccountActions.accountUpdateSuccess())
  } else {
    yield put(AccountActions.accountFailure('WRONG'))
  }
}
