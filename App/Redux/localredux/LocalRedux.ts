import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  persistLocalProfessional: ['professional'],
  persistLocalLastCheckDocuments: ['lastCheckDocuments'],
  persistLocalAcceptedTerm: ['acceptedTerms']
});

export const LocalTypes = Types;
export default Creators

export const INITIAL_STATE = Immutable({
  professional: null,
  lastCheckDocuments: null,
  acceptedTerms: null
});

/* ------------- Reducers ------------- */

export const requestToPersistLocalProfessional = (state: any, { professional }: any) => {
  return state.merge({ professional: professional });
};

export const requestToPersistLocalLastCheckDocuments = (state: any, { lastCheckDocuments }: any) => {
  return state.merge({ lastCheckDocuments: lastCheckDocuments });
};

export const requestToPersistLocalAcceptedTerm = (state: any, { acceptedTerms }: any) => {
  return state.merge({ acceptedTerms: acceptedTerms })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PERSIST_LOCAL_PROFESSIONAL]: requestToPersistLocalProfessional,
  [Types.PERSIST_LOCAL_LAST_CHECK_DOCUMENTS]: requestToPersistLocalLastCheckDocuments,
  [Types.PERSIST_LOCAL_ACCEPTED_TERM]: requestToPersistLocalAcceptedTerm
});
