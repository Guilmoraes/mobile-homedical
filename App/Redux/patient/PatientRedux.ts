import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  localPatientRequest: [],
  localPatientRequestSuccess: ['page'],
});

export const PatientTypes = Types;
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: false,
  page: null,
  error: null
});

/* ------------- Reducers ------------- */

export const request = (state: any) => state.merge({fetching: true, error: null});

export const requestSuccess = (state: any, {page}: any) => state.merge({fetching: false, error: null, page});



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCAL_PATIENT_REQUEST]: request,
  [Types.LOCAL_PATIENT_REQUEST_SUCCESS]: requestSuccess
});
