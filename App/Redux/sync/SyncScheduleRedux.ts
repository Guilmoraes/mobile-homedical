import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setAuthToken: ['token'],
  clearScheduleRequest: [],
  syncScheduleRequest: ['schedule'],
  syncScheduleRequestSuccess: [],
  syncScheduleRequestError: [],
  refreshState: []
});

export const SyncScheduleTypes = Types;
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  success: false,
  error: false
});

/* ------------- Reducers ------------- */

export const request = (state: any) => state.merge({loading: true, success: false, error: false});

export const clearScheduleRequest = (state: any) => state.merge({loading: false, success: false, error: false});

export const requestSuccess = (state: any) => state.merge({loading: false, success: true, error: false});

export const requestError = (state: any) => state.merge({loading: false, success: false, error: true});

export const requestToRefreshState = (state: any) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLEAR_SCHEDULE_REQUEST]: clearScheduleRequest,
  [Types.SYNC_SCHEDULE_REQUEST]: request,
  [Types.SYNC_SCHEDULE_REQUEST_SUCCESS]: requestSuccess,
  [Types.SYNC_SCHEDULE_REQUEST_ERROR]: requestError,
  [Types.REFRESH_STATE]: requestToRefreshState
});
