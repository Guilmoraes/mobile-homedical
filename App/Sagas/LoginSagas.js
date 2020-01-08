import {call, put, select} from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import ProfessionalActions from '../Redux/professional/ProfessionalRedux'
import SyncScheduleActions from '../Redux/sync/SyncScheduleRedux'
import I18n from '../i18n/i18n'
import DocumentActions from '../Redux/document/DocumentRedux'
import realm from "../Data/Db"

export const selectAuthToken = (state) => state.login.authToken;

// attempts to login
export function* login(api, {username, password}) {
  const authObj = {
    username: username,
    password: password
  };

  const response = yield call(api.login, authObj);

  if (response.ok) {
    yield call(api.setAuthToken, response.data.id_token);
    yield put(ProfessionalActions.setAuthToken(response.data.id_token));
    yield put(SyncScheduleActions.setAuthToken(response.data.id_token));
    yield put(LoginActions.loginSuccess(response.data.id_token));
    yield put(LoginActions.loginPersistAuthToken(response.data.id_token));
    yield put(ProfessionalActions.getMyInfoRequest());
    yield put(DocumentActions.setAuthToken(response.data.id_token))
  } else {

    if (response.status === 401) {
      yield put(LoginActions.loginFailure({description: I18n.t(['error', 'badCredential'])}))
    } else {
      yield put(LoginActions.loginFailure({description: I18n.t(['error', 'unknown'])}))
    }

  }
}

// attempts to logout
export function* logout(api) {
  yield call(api.removeAuthToken);
  yield put(LoginActions.logoutSuccess());
  realm.write(() => {
    realm.deleteAll();
  });
  
  // yield put({type: 'RELOGIN_ABORT'})
}

export function* updateAuthToken(api, {authToken}) {
  yield call(api.setAuthToken, authToken);
  yield put(DocumentActions.setAuthToken(authToken));
  yield put(ProfessionalActions.setAuthToken(authToken));
  yield put(SyncScheduleActions.setAuthToken(authToken));
}

// loads the login
export function* loginLoad(api) {
  const authToken = yield select(selectAuthToken);
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken);
    yield put(DocumentActions.setAuthToken(authToken));
    yield put(ProfessionalActions.setAuthToken(authToken));
    yield put(SyncScheduleActions.setAuthToken(authToken));
  }
  yield put(LoginActions.loginLoadSuccess(authToken))
}
