import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['authToken'],
  loginFailure: ['error'],
  loginPersistAuthToken: ['authToken'],
  logoutRequest: null,
  logoutSuccess: null,
  loginLoad: [],
  loginLoadSuccess: ['authToken'],
  updateAuthToken: ['authToken'],
  loginPersistProfessional: ['professional']
});

export const LoginTypes = Types;
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authToken: null,
  error: null,
  fetching: false,
  success: false,
  loading: false
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true, success: false, error: null });

// we've successfully logged in
export const success = (state, data) => {
  return state.merge({ fetching: false, error: null, success: true})
};

export const loginPersistAuthToken = (state, data) => state.merge({authToken: data.authToken});

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error, authToken: null, success: false});

// we're attempting to load token from startup sagas
export const load = (state) => state.merge({ loading: true, loginLoad: true});

export const loadSuccess = (state, {authToken}) => {
  return state.merge({ loading: false, authToken: authToken, loginLoad: false });
};
// we need to logout, meaning clear access tokens and account
export const logoutRequest = state => state;

// we've logged out
export const logoutSuccess = state => INITIAL_STATE;

export const updateAuthToken = (state, {authToken}) => state.merge({authToken: authToken});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_LOAD]: load,
  [Types.LOGIN_LOAD_SUCCESS]: loadSuccess,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGIN_PERSIST_AUTH_TOKEN]: loginPersistAuthToken,
  [Types.UPDATE_AUTH_TOKEN]: updateAuthToken

});

/* ------------- Selectors ------------- */
