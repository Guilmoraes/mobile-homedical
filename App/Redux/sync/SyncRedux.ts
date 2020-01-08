import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  syncRequest: [],
  syncRequestSuccess: [],
  syncRequestError: []
});

export const SyncTypes = Types;
export default Creators

export const INITIAL_STATE = Immutable({
  loading: false,
  success: false,
  error: false
});

/* ------------- Reducers ------------- */

export const request = (state: any) => state.merge({loading: true, success: false, error: false});

export const requestSuccess = (state: any) => state.merge({loading: false, success: true, error: false});

export const requestError = (state: any) => state.merge({loading: false, success: false, error: true});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SYNC_REQUEST]: request,
  [Types.SYNC_REQUEST_SUCCESS]: requestSuccess,
  [Types.SYNC_REQUEST_ERROR]: requestError

});
