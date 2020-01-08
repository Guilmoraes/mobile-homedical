import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setAuthToken: ['token'],
  registerProfessionalRequest: ['professional'],
  registerProfessionalRequestSuccess: [],
  registerProfessionalRequestError: ['error'],
  getMyInfoRequest: [],
  getMyInfoRequestSuccess: ['professional'],
  getMyInfoRequestError: ['error'],
  updateProfessionalRequest: ['professional'],
  updateProfessionalRequestSuccess: [],
  updateProfessionalRequestError: ['error'],
  requestToResetState: []

});

export const ProfessionalTypes = Types;
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  success: false,
  error: null,
  requestInfoLoading: false,
  requestInfoSuccess: null,
  requestInfoError: null,
  requestUpdateLoading: false,
  requestUpdateSuccess: null,
  requestUpdateError: null
});

/* ------------- Reducers ------------- */

export const requestToRegister = (state: any) => state.merge({loading: true, error: null});

export const requestToRegisterSuccess = (state: any) => state.merge({loading: false, error: null, success: true});

export const requestToRegisterError = (state: any, {error}: any) => state.merge({
  loading: false,
  error: error,
  success: false
});

export const requestToGetProfessionalInfo = (state: any) => {
  return state.merge({requestInfoLoading: true, requestInfoSuccess: null, requestInfoError: null});
};

export const requestToGetProfessionalInfoSuccess = (state: any, {professional}: any) => state.merge({
  requestInfoLoading: false,
  requestInfoSuccess: true,
  professional: professional,
  requestInfoError: null
});

export const requestToGetProfessionalInfoError = (state: any, {error}: any) => state.merge({
  requestInfoLoading: false,
  requestInfoSuccess: null,
  requestInfoError: error,
  professional: null
});

export const requestToUpdateProfessional = (state: any) => state.merge({
  requestUpdateLoading: true,
  requestUpdateSuccess: null,
  requestUpdateError: null
});

export const requestToUpdateProfessionalSuccess = (state: any) => state.merge({
  requestUpdateLoading: false,
  requestUpdateSuccess: true,
  requestUpdateError: null
});

export const requestToUpdateProfessionalError = (state: any, {error}: any) => state.merge({
  requestUpdateLoading: false,
  requestUpdateSuccess: null,
  requestUpdateError: error
});

export const requestToResetState = (state: any) => INITIAL_STATE;


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_PROFESSIONAL_REQUEST]: requestToRegister,
  [Types.REGISTER_PROFESSIONAL_REQUEST_SUCCESS]: requestToRegisterSuccess,
  [Types.REGISTER_PROFESSIONAL_REQUEST_ERROR]: requestToRegisterError,
  [Types.GET_MY_INFO_REQUEST]: requestToGetProfessionalInfo,
  [Types.GET_MY_INFO_REQUEST_SUCCESS]: requestToGetProfessionalInfoSuccess,
  [Types.GET_MY_INFO_REQUEST_ERROR]: requestToGetProfessionalInfoError,
  [Types.UPDATE_PROFESSIONAL_REQUEST]: requestToUpdateProfessional,
  [Types.UPDATE_PROFESSIONAL_REQUEST_SUCCESS]: requestToUpdateProfessionalSuccess,
  [Types.UPDATE_PROFESSIONAL_REQUEST_ERROR]: requestToUpdateProfessionalError,
  [Types.REQUEST_TO_RESET_STATE]: requestToResetState,
});
