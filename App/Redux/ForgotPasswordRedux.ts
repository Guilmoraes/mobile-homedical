import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  forgotPasswordRequest: ['email'],
  forgotPasswordSuccess: [],
  forgotPasswordFailure: ['error'],
  forgotPasswordReset: ['']
});

export const ForgotPasswordTypes = Types;
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  loading: null,
  success: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state: any, { email }: any) =>
  state.merge({ loading: true, email, success: null, error: null });

// successful api lookup
export const success = (state: any, action: any) => {
  return state.merge({ loading: false, error: null, success: true });
};

// Something went wrong somewhere.
export const failure = (state: any, { error }: any) =>
  state.merge({ loading: false, error: error, success: null });

export const resetToInitial = (state: any) => state.merge(INITIAL_STATE)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORGOT_PASSWORD_REQUEST]: request,
  [Types.FORGOT_PASSWORD_SUCCESS]: success,
  [Types.FORGOT_PASSWORD_FAILURE]: failure,
  [Types.FORGOT_PASSWORD_RESET]: resetToInitial
});
