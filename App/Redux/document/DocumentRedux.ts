import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  startCheckDocumentProcess: [],
  setAuthToken: ['token'],
  showDocumentFirstAccess: ['pendingDocuments'],
  showDocumentPendingScreen: ['pendingDocuments'],
  showWaitingDocsApprovement: [],
  checkDocumentProcessSuccess: [],
  checkDocumentProcessError: [],
  uploadDocuments: ['documents'],
  uploadDocumentsSuccess: [],
  uploadDocumentsError: [],
  clearState: []
});

export const DocumentTypes = Types;
export default Creators

export const INITIAL_STATE = Immutable({
  loadingCheckDocumentProcess: false,
  requestToShowDocumentFirstAccess: false,
  requestToShowDocumentPending: false,
  requestToShowWaitingDocsApprovement: false,
  requestCheckDocumentProcessError: false,
  pendingDocuments: null,
  requestToUploadDocsLoading: false,
  requestToUploadDocsSuccess: false,
  requestToUploadDocsError: false,
});

/* ------------- Reducers ------------- */

export const requestToStartCheckDocumentProcess = (state: any) => state.merge({loadingCheckDocumentProcess: true});

export const requestToShowDocumentFirstAccess = (state: any, {pendingDocuments}: any) => state.merge({
  requestToShowDocumentFirstAccess: true,
  requestToShowDocumentPending: false,
  pendingDocuments: pendingDocuments,
  requestToShowWaitingDocsApprovement: false,
  loadingCheckDocumentProcess: false
});

export const requestToShowPendingDocumentScreen = (state: any, {pendingDocuments}: any) => state.merge({
  requestToShowDocumentPending: true,
  requestToShowDocumentFirstAccess: false,
  pendingDocuments: pendingDocuments,
  requestToShowWaitingDocsApprovement: false,
  loadingCheckDocumentProcess: false
});

export const requestToShowWaitingDocsApprovementScreen = (state: any) => state.merge({
  requestToShowDocumentPending: false,
  requestToShowDocumentFirstAccess: false,
  requestToShowWaitingDocsApprovement: true,
  loadingCheckDocumentProcess: false
});

export const requestCheckDocumentProcessSuccess = (state: any) => INITIAL_STATE;

export const requestCheckDocumentProcessError = (state: any) => state.merge({
  requestToShowDocumentPending: false,
  requestToShowDocumentFirstAccess: false,
  requestToShowWaitingDocsApprovement: false,
  requestCheckDocumentProcessError: true,
  loadingCheckDocumentProcess: false
});

export const requestToUploadDocs = (state: any) => state.merge({
  requestToUploadDocsLoading: true,
  requestToUploadDocsSuccess: false,
  requestToUploadDocsError: false,
});

export const requestToUploadDocsSuccess = (state: any) => state.merge({
  requestToUploadDocsLoading: false,
  requestToUploadDocsSuccess: true,
  requestToUploadDocsError: false,
});

export const requestToUploadDocsError= (state: any) => state.merge({
  requestToUploadDocsLoading: false,
  requestToUploadDocsSuccess: false,
  requestToUploadDocsError: true,
});

export const requestToClearState = (state: any) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_CHECK_DOCUMENT_PROCESS]: requestToStartCheckDocumentProcess,
  [Types.SHOW_DOCUMENT_FIRST_ACCESS]: requestToShowDocumentFirstAccess,
  [Types.SHOW_DOCUMENT_PENDING_SCREEN]: requestToShowPendingDocumentScreen,
  [Types.SHOW_WAITING_DOCS_APPROVEMENT]: requestToShowWaitingDocsApprovementScreen,
  [Types.CHECK_DOCUMENT_PROCESS_SUCCESS]: requestCheckDocumentProcessSuccess,
  [Types.CHECK_DOCUMENT_PROCESS_ERROR]: requestCheckDocumentProcessError,
  [Types.UPLOAD_DOCUMENTS]: requestToUploadDocs,
  [Types.UPLOAD_DOCUMENTS_SUCCESS]: requestToUploadDocsSuccess,
  [Types.UPLOAD_DOCUMENTS_ERROR]: requestToUploadDocsError,
  [Types.CLEAR_STATE]: requestToClearState
});
