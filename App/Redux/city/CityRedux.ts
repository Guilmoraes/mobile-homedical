import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  cityRequest: ['param'],
  cityRequestSuccess: ['page'],
  cityRequestError: [],
});

export const CityTypes = Types;
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: false,
  page: null,
  error: null
});

/* ------------- Reducers ------------- */

export const request = (state: any) => state.merge({fetching: true, error: null});

export const requestSuccess = (state: any, {page}: any) => state.merge({fetching: false, error: null, page});

export const requestError = (state: any) => state.merge({fetching: false, error: ''});


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CITY_REQUEST]: request,
  [Types.CITY_REQUEST_SUCCESS]: requestSuccess,
  [Types.CITY_REQUEST_ERROR]: requestError
});
