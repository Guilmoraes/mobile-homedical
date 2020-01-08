import { all, call, fork, put, select } from 'redux-saga/effects'
import ProfessionalActions from '../../Redux/professional/ProfessionalRedux'
import LoginActions from '../../Redux/LoginRedux'
import I18n from '../../i18n/i18n'
import PatientQueries from '../../Data/queries/PatientQueries'
import DutyQueries from '../../Data/queries/DutyQueries'
import LocalActions from '../../Redux/localredux/LocalRedux'
import { Patient } from '../../Models/Patient'
import { Duty } from '../../Models/Duty';

const _: any = require('lodash')

export function* registerProfessional(professionalApi: any, request: any) {
  const response = yield call(professionalApi.registerProfessional, request.professional);

  if (response.ok) {
    yield put(ProfessionalActions.registerProfessionalRequestSuccess())
  } else {

    if (response.status === 400) {
      yield put(ProfessionalActions.registerProfessionalRequestError({ description: I18n.t(['error', response.data.message.replace(/\./g, '')]) }))
    } else {
      yield put(ProfessionalActions.registerProfessionalRequestError({ description: I18n.t(['error', 'unknown']) }))
    }
  }

  yield put(ProfessionalActions.requestToResetState());

}

export function* getProfessionalInfo(professionalApi: any) {
  const response = yield call(professionalApi.getProfessionalInfo);

  if (response.ok) {
    yield put(ProfessionalActions.getMyInfoRequestSuccess(response.data));
    yield put(LocalActions.persistLocalProfessional(response.data));
    return response.data;
  } else {
    yield put(ProfessionalActions.getMyInfoRequestError({ description: I18n.t(['error', 'unknown']) }));
  }

  yield put(ProfessionalActions.requestToResetState());
}

export function* updateProfessional(professionalApi: any, { professional }: any) {

  const response = yield call(professionalApi.updateProfessional, professional);

  if (response.ok) {
    yield call(professionalApi.setAuthToken, response.headers['x-new-token']);
    yield put(LoginActions.updateAuthToken(response.headers['x-new-token']));
    yield put(ProfessionalActions.updateProfessionalRequestSuccess());
  } else {
    if (response.status === 400) {
      yield put(ProfessionalActions.updateProfessionalRequestError(response.data));
    } else {
      yield put(ProfessionalActions.updateProfessionalRequestError({ description: I18n.t(['error', 'unknown']) }));
    }
  }

  yield put(ProfessionalActions.requestToResetState());
}

export function* professionalSetAuthToken(professionalApi: any, { token }: any) {
  yield call(professionalApi.setAuthToken, token);
}

export function* syncProfessionalPatients(professionalApi: any, professionalId: string) {

  const response = yield call(professionalApi.getProfessionalPatient, professionalId);

  if (response.ok) {
    yield fork(savePatients, response.data)
  } else {
    throw { message: "Error in sync Professional Patients", error: "Error in sync Professional Patients" }
  }
}

export function* syncProfessionalDuties(professionalApi: any, professionalId: string) {

  const response = yield call(professionalApi.getProfessionalDuties, professionalId);

  if (response.ok) {
    yield fork(saveDuties, response.data)
  } else {
    throw { message: "Error in sync Professional Duties", error: "Error in sync Professional Duties" }
  }

}

function* saveDuties(duties: any) {
  let responses = yield all(duties.map((duty: any) => {
    return call(DutyQueries.saveDuty, duty, true, !_.isEmpty(DutyQueries.findById(duty.id)))
  }));


  let professionalDuties = DutyQueries.findByIsProfessionalDuty();
  let dutiesToUpdate: Duty[] = [];

  _.each(professionalDuties, function (duty: Duty) {
    let filteredDuties = _.filter(duties, function (responseDuty: Duty) {
      return responseDuty.id === duty.id;
    });

    if (_.isEmpty(filteredDuties)) {
      dutiesToUpdate.push(duty);
    }
  });

  DutyQueries.updateFieldIsProfessionalDuty(dutiesToUpdate, false);

  responses.map((response: any) => {
    if (response.isError) {
      throw response;
    }
  })
}

function* savePatients(patients: any) {
  let responses = yield all(patients.map((patient: any) => {
    return call(PatientQueries.savePatient, patient, true, !_.isEmpty(PatientQueries.findById(patient.id)))
  }));

  let professionalPatients = PatientQueries.findByIsProfessionalPatient();
  let patientsToUpdate: Patient[] = [];

  _.each(professionalPatients, function (patient: Patient) {
    let filteredPatients = _.filter(patients, function (responsePatient: Patient) {
      return responsePatient.id === patient.id;
    });

    if (_.isEmpty(filteredPatients)) {
      patientsToUpdate.push(patient);
    }
  });


  PatientQueries.updateFieldIsProfessionalPatients(patientsToUpdate, false);

  responses.map((response: any) => {
    if (response.isError) {
      throw response;
    }
  });

}


