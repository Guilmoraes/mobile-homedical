import {all, call, put} from 'redux-saga/effects'
import DocumentActions from '../../Redux/document/DocumentRedux'
import LocalActions from '../../Redux/localredux/LocalRedux'
import moment from "moment"

export function* uploadDocuments(documentApi: any, {documents}: any) {
  let response = yield call(documentApi.uploadDocs, documents);

  if(response.ok){
    yield put(DocumentActions.uploadDocumentsSuccess())
  } else {
    yield put(DocumentActions.uploadDocumentsError())
  }
}

export function* startCheckDocumentProcess(documentApi: any) {

  let response = yield call(documentApi.getProfessionalDocuments);

  if (!response.ok) {
    yield put(DocumentActions.checkDocumentProcessError());
    let lastCheckSuccess = {date: moment(), success: false};
    yield put(LocalActions.persistLocalLastCheckDocuments(lastCheckSuccess));
    return;
  }

  let pendingDocsResponseResponse = yield* checkPendingDocuments(documentApi);

  if (!pendingDocsResponseResponse.ok) {
    yield put(DocumentActions.checkDocumentProcessError());
    let lastCheckSuccess = {date: moment(), success: false};
    yield put(LocalActions.persistLocalLastCheckDocuments(lastCheckSuccess));
    return;
  }

  let pendingDocsResponse = pendingDocsResponseResponse.data;

  if (response.data.length === 0) {
    yield put(DocumentActions.showDocumentFirstAccess(pendingDocsResponse));
    return;
  }

  if (pendingDocsResponse.length > 0) {
    yield put(DocumentActions.showDocumentPendingScreen(pendingDocsResponse));
    return;
  }

  let isWaitingApprovementResponse = yield* checkIfIsWaitingApprovement(documentApi);

  if (!isWaitingApprovementResponse.ok) {
    yield put(DocumentActions.checkDocumentProcessError());

    let lastCheckSuccess = {date: moment(), success: false};
    yield put(LocalActions.persistLocalLastCheckDocuments(lastCheckSuccess));
    return;
  }

  if (isWaitingApprovementResponse.data) {
    yield put(DocumentActions.showWaitingDocsApprovement());
    return;
  }

  let lastCheckSuccess = {date: moment(), success: true};
  yield put(LocalActions.persistLocalLastCheckDocuments(lastCheckSuccess));
  yield put(DocumentActions.checkDocumentProcessSuccess());
}

export function* checkPendingDocuments(documentApi: any) {
  return yield call(documentApi.getProfessionalPendingDocuments);
}

export function* checkIfIsWaitingApprovement(documentApi: any) {
  return yield call(documentApi.isWaitingApprovement);
}

export function* documentSetAuthToken(documentApi: any, {token}: any) {
  yield call(documentApi.setAuthToken, token)
}
