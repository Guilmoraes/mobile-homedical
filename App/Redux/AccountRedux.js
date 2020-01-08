import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountRequest: [],
  accountUpdateRequest: ['account'],
  accountSuccess: ['account'],
  accountUpdateSuccess: [],
  accountFailure: ['error'],
  startProcessOfCheckIfUserHadAcceptedTerm: [],
  startProcessOfAcceptTerm: [],
  requestToAcceptTerms: [],
  processOfAcceptTermSuccess: [],
  processOfAcceptTermError: []
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  account: null,
  error: null,
  fetching: false,
  updating: false,
  fetchingIfUserHadAccepted: false,
  userHaveToAcceptTerm: false,
  acceptTermLoading: false,
  acceptTermSuccess: false,
  acceptTermError: false
})

/* ------------- Reducers ------------- */

// we're attempting to account
export const request = (state) => state.merge({ fetching: true })

// we're attempting to updating account settings
export const updateRequest = (state) => state.merge({ updating: true })

// we've successfully logged in
export const success = (state, data) => {
  const { account } = data
  return state.merge({ fetching: false, error: null, account })
}
// we've successfully updated the account
export const updateSuccess = (state) => state.merge({ error: null, updating: false })

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, updating: false, account: null, error })

export const requestToCheckIfUserHadAcceptTerm = (state) => state.merge({ fetchingIfUserHadAccepted: true })

export const requestToStartProcessOfAcceptTerm = (state) => state.merge({ userHaveToAcceptTerm: true, fetchingIfUserHadAccepted: false })

export const requestToAcceptTerms = (state) => state.merge({
  acceptTermLoading: true, 
  acceptTermSuccess: false,
  acceptTermError: false
})

export const requestToAcceptTermsSuccess = (state) => state.merge({
  acceptTermLoading: false,
  acceptTermSuccess: true,
  acceptTermError: false,
  userHaveToAcceptTerm: false
})

export const requestToAcceptTermsError = (state) => state.merge({
  acceptTermLoading: false,
  acceptTermSuccess: false,
  acceptTermError: true,
  userHaveToAcceptTerm: false
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_UPDATE_REQUEST]: updateRequest,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_UPDATE_SUCCESS]: updateSuccess,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.START_PROCESS_OF_CHECK_IF_USER_HAD_ACCEPTED_TERM]: requestToCheckIfUserHadAcceptTerm,
  [Types.START_PROCESS_OF_ACCEPT_TERM]: requestToStartProcessOfAcceptTerm,
  [Types.REQUEST_TO_ACCEPT_TERMS]: requestToAcceptTerms,
  [Types.PROCESS_OF_ACCEPT_TERM_SUCCESS]: requestToAcceptTermsSuccess,
  [Types.PROCESS_OF_ACCEPT_TERM_ERROR]: requestToAcceptTermsError
})

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = accountState => accountState.account !== null

export const getLogin = accountState => accountState.account !== null ? accountState.account.login : 'anonymousUser'
