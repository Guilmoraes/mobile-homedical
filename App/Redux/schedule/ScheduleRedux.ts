import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  createScheduleRequest: ['schedule'],
  updateScheduleRequest: ['schedule'],
  clearCreateRequest: [],
  updateScheduleRequestSuccess: [],
  updateScheduleRequestError: [],
  createScheduleRequestSuccess: [],
  createScheduleRequestError: [],
  getProfessionalSchedulesRequest: ['initialDate', 'finishDate'],
  getProfessionalSchedulesRequestSuccess: ['schedules'],
  getProfessionalSchedulesRequestError: [],
  refreshScheduleScreen: [],
  refreshState: []
});

export const ScheduleTypes = Types;
export default Creators

export const INITIAL_STATE = Immutable({
  createScheduleLoading: false,
  createScheduleSuccess: false,
  createScheduleError: false,
  getProfessionalSchedulesLoading: false,
  getProfessionalSchedulesError: false,
  getProfessionalSchedulesSuccess: null,
  updateScheduleLoading: false,
  updateScheduleError: false,
  updateScheduleSuccess: false,
  refreshSchedules: false
});

/* ------------- Reducers ------------- */

export const createRequest = (state: any) => state.merge({
  createScheduleLoading: true,
  createScheduleSuccess: false,
  createScheduleError: false
});

export const clearCreateRequest = (state: any) => state.merge({
  createScheduleLoading: false,
  createScheduleSuccess: false,
  createScheduleError: false
});

export const createRequestSuccess = (state: any) => state.merge({
  createScheduleLoading: false,
  createScheduleSuccess: true,
  createScheduleError: false
});

export const createRequestError = (state: any) => state.merge({
  createScheduleLoading: false,
  createScheduleSuccess: false,
  createScheduleError: true
});

export const updateScheduleRequest = (state: any) => state.merge({
  updateScheduleLoading: true,
  updateScheduleSuccess: false,
  updateScheduleError: false
});

export const updateScheduleRequestSuccess = (state: any) => state.merge({
  updateScheduleLoading: false,
  updateScheduleSuccess: true,
  updateScheduleError: false
});

export const updateScheduleRequestError = (state: any) => state.merge({
  updateScheduleLoading: false,
  updateScheduleSuccess: false,
  updateScheduleError: true
});

export const schedulesRequest = (state: any) => state.merge({
  getProfessionalSchedulesLoading: true,
  getProfessionalSchedulesError: false,
  getProfessionalSchedulesSuccess: null,
  refreshSchedules: false
});

export const schedulesRequestSuccess = (state: any, {schedules}: any) => state.merge({
  getProfessionalSchedulesLoading: false,
  getProfessionalSchedulesError: false,
  getProfessionalSchedulesSuccess: schedules,
  refreshSchedules: false
});

export const refreshScheduleScreenRequest = (state: any) => state.merge({
  refreshSchedules: true
});

export const requestToRefreshState = (state: any) => INITIAL_STATE


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_SCHEDULE_REQUEST]: createRequest,
  [Types.UPDATE_SCHEDULE_REQUEST]: updateScheduleRequest,
  [Types.UPDATE_SCHEDULE_REQUEST_SUCCESS]: updateScheduleRequestSuccess,
  [Types.CLEAR_CREATE_REQUEST]: clearCreateRequest,
  [Types.UPDATE_SCHEDULE_REQUEST_ERROR]: updateScheduleRequestError,
  [Types.CREATE_SCHEDULE_REQUEST_SUCCESS]: createRequestSuccess,
  [Types.CREATE_SCHEDULE_REQUEST_ERROR]: createRequestError,
  [Types.GET_PROFESSIONAL_SCHEDULES_REQUEST]: schedulesRequest,
  [Types.GET_PROFESSIONAL_SCHEDULES_REQUEST_SUCCESS]: schedulesRequestSuccess,
  [Types.REFRESH_SCHEDULE_SCREEN]: refreshScheduleScreenRequest,
  [Types.REFRESH_STATE]: requestToRefreshState

});
